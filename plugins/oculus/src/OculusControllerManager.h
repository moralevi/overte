//
//  Created by Bradley Austin Davis on 2016/03/04
//  Copyright 2013-2016 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi__OculusControllerManager
#define hifi__OculusControllerManager

#include <QObject>
#include <unordered_set>
#include <map>

#include <GLMHelpers.h>

#include <SettingHandle.h>
#include <controllers/InputDevice.h>
#include <plugins/InputPlugin.h>

#include <OVR_CAPI.h>

class OculusControllerManager : public InputPlugin {
    Q_OBJECT
public:
    // Plugin functions
    bool isSupported() const override;
    const QString getName() const override { return NAME; }
    bool isHandController() const override { return _touch != nullptr; }
    bool isHeadController() const override { return true; }
    bool configurable() override { return true; }
    QString configurationLayout() override;
    QStringList getSubdeviceNames() override;
    void setConfigurationSettings(const QJsonObject configurationSetting) override;
    QJsonObject configurationSettings() override;

    bool activate() override;
    void deactivate() override;

    void pluginFocusOutEvent() override;
    void pluginUpdate(float deltaTime, const controller::InputCalibrationData& inputCalibrationData) override;

private slots:
    void stopHapticPulse(bool leftHand);

private:
    class OculusInputDevice : public controller::InputDevice {
    public:
        OculusInputDevice(OculusControllerManager& parent, const QString& name) : controller::InputDevice(name), _parent(parent) {}

        OculusControllerManager& _parent;
        friend class OculusControllerManager;
    };

    class RemoteDevice : public OculusInputDevice {
    public:
        using Pointer = std::shared_ptr<RemoteDevice>;
        RemoteDevice(OculusControllerManager& parent) : OculusInputDevice(parent, "OculusRemote") {}

        controller::Input::NamedVector getAvailableInputs() const override;
        QString getDefaultMappingConfig() const override;
        void update(float deltaTime, const controller::InputCalibrationData& inputCalibrationData) override;
        void focusOutEvent() override;

        friend class OculusControllerManager;
    };

    class TouchDevice : public OculusInputDevice {
    public:
        using Pointer = std::shared_ptr<TouchDevice>;
        TouchDevice(OculusControllerManager& parent) : OculusInputDevice(parent, "OculusTouch") {}

        controller::Input::NamedVector getAvailableInputs() const override;
        QString getDefaultMappingConfig() const override;
        void update(float deltaTime, const controller::InputCalibrationData& inputCalibrationData) override;
        void focusOutEvent() override;

        bool triggerHapticPulse(float strength, float duration, uint16_t index) override;

    private:
        void stopHapticPulse(bool leftHand);
        void handlePose(float deltaTime, const controller::InputCalibrationData& inputCalibrationData,
                        ovrHandType hand, const ovrPoseStatef& handPose);
        void handleRotationForUntrackedHand(const controller::InputCalibrationData& inputCalibrationData,
                                            ovrHandType hand, const ovrPoseStatef& handPose);
        void handleHeadPose(float deltaTime, const controller::InputCalibrationData& inputCalibrationData,
                            const ovrPoseStatef& headPose);

        int _trackedControllers { 0 };

        // perform an action when the TouchDevice mutex is acquired.
        using Locker = std::unique_lock<std::recursive_mutex>;
        template <typename F>
        void withLock(F&& f) { Locker locker(_lock); f(); }

        float _leftHapticDuration { 0.0f };
        float _leftHapticStrength { 0.0f };
        float _rightHapticDuration { 0.0f };
        float _rightHapticStrength { 0.0f };
        mutable std::recursive_mutex _lock;
        std::map<int, bool> _lostTracking;
        std::map<int, quint64> _regainTrackingDeadline;
        std::map<int, ovrPoseStatef> _lastControllerPose;

        friend class OculusControllerManager;
    };

    void checkForConnectedDevices();

    Setting::Handle<bool> _trackControllersInOculusHome { "trackControllersInOculusHome", false };
    ovrInputState _remoteInputState {};
    ovrInputState _touchInputState {};
    RemoteDevice::Pointer _remote;
    TouchDevice::Pointer _touch;
    static const char* NAME;
};

#endif // hifi__OculusControllerManager
