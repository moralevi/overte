//
//  Text3DOverlay.h
//  interface/src/ui/overlays
//
//  Copyright 2014 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_Text3DOverlay_h
#define hifi_Text3DOverlay_h

#include <QString>

#include "Billboard3DOverlay.h"

class TextRenderer3D;

class Text3DOverlay : public Billboard3DOverlay {
    Q_OBJECT
    
public:
    static QString const TYPE;
    virtual QString getType() const { return TYPE; }

    Text3DOverlay();
    Text3DOverlay(const Text3DOverlay* text3DOverlay);
    ~Text3DOverlay();
    virtual void render(RenderArgs* args);

    virtual void update(float deltatime);

    virtual const render::ShapeKey getShapeKey() override;

    // getters
    const QString& getText() const { return _text; }
    float getLineHeight() const { return _lineHeight; }
    float getLeftMargin() const { return _leftMargin; }
    float getTopMargin() const { return _topMargin; }
    float getRightMargin() const { return _rightMargin; }
    float getBottomMargin() const { return _bottomMargin; }
    xColor getBackgroundColor();
    float getTextAlpha() { return _textAlpha; }
    float getBackgroundAlpha() { return getAlpha(); }

    // setters
    void setText(const QString& text) { _text = text; }
    void setTextAlpha(float alpha) { _textAlpha = alpha; }
    void setLineHeight(float value) { _lineHeight = value; }
    void setLeftMargin(float margin) { _leftMargin = margin; }
    void setTopMargin(float margin) { _topMargin = margin; }
    void setRightMargin(float margin) { _rightMargin = margin; }
    void setBottomMargin(float margin) { _bottomMargin = margin; }

    virtual void setProperties(const QScriptValue& properties);
    virtual QScriptValue getProperty(const QString& property);

    QSizeF textSize(const QString& test) const;  // Meters

    virtual bool findRayIntersection(const glm::vec3& origin, const glm::vec3& direction, float& distance, 
                                        BoxFace& face, glm::vec3& surfaceNormal);

    virtual Text3DOverlay* createClone() const;

private:
    TextRenderer3D* _textRenderer = nullptr;
    
    QString _text;
    xColor _backgroundColor = xColor{ 0, 0, 0 };
    float _textAlpha{ 1.0f };
    float _lineHeight{ 1.0f };
    float _leftMargin{ 0.1f };
    float _topMargin{ 0.1f };
    float _rightMargin{ 0.1f };
    float _bottomMargin{ 0.1f };
};

#endif // hifi_Text3DOverlay_h
