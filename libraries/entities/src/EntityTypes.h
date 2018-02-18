//
//  EntityTypes.h
//  libraries/entities/src
//
//  Created by Brad Hefta-Gaub on 12/4/13.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_EntityTypes_h
#define hifi_EntityTypes_h

#include <stdint.h>

#include <QHash>
#include <QString>

#include "EntitiesLogging.h"

class EntityItem;
using EntityItemPointer = std::shared_ptr<EntityItem>;
using EntityItemWeakPointer = std::weak_ptr<EntityItem>;

inline uint qHash(const EntityItemPointer& a, uint seed) {
    return qHash(a.get(), seed);
}

class EntityItemID;
class EntityItemProperties;
class ReadBitstreamToTreeParams;

typedef EntityItemPointer (*EntityTypeFactory)(const EntityItemID& entityID, const EntityItemProperties& properties);

class EntityTypes {
public:
    /**jsdoc
     * <p>An entity may be one of the following types:</p>
     * <table>
     *   <thead>
     *     <tr><th>Value</th><th>Description</th><th>Properties</th></tr>
     *   </thead>
     *   <tbody>
     *     <tr><td><code>Box</code></td><td>A rectangular prism. This is identical to the <code>Shape</code> EntityType except
     *       that it is always created with an initial <code>shape</code> property value of <code>"Cube"</code>.</td>
     *       <td>{@link Entities.EntityProperties-Box|EntityProperties-Box}</td></tr>
     *     <tr><td><code>Light</code></td><td>A local lighting effect.</td>
     *       <td>{@link Entities.EntityProperties-Light|EntityProperties-Light}</td></tr>
     *     <tr><td><code>Line</code></td><td>A sequence of one or more simple straight lines.</td>
     *       <td>{@link Entities.EntityProperties-Line|EntityProperties-Line}</td></tr>
     *     <tr><td><code>Model</code></td><td>A mesh model from an FBX or OBJ file.</td>
     *       <td>{@link Entities.EntityProperties-Model|EntityProperties-Model}</td></tr>
     *     <tr><td><code>ParticleEffect</code></td><td>A particle system that can be used to simulate things such as fire, 
     *       smoke, snow, magic spells, etc.</td>
     *       <td>{@link Entities.EntityProperties-ParticleEffect|EntityProperties-ParticleEffect}</td></tr>
     *     <tr><td><code>PolyLine</code></td><td>A sequence of one or more textured straight lines.</td>
     *       <td>{@link Entities.EntityProperties-PolyLine|EntityProperties-PolyLine}</td></tr>
     *     <tr><td><code>PolyVox</code></td><td>A set of textured voxels.</td>
     *       <td>{@link Entities.EntityProperties-PolyVox|EntityProperties-PolyVox}</td></tr>
     *     <tr><td><code>Shape</code></td><td>A basic entity such as a cube.
     *       See also, the <code>Box</code> and <code>Sphere</code> entity types.</td>
     *       <td>{@link Entities.EntityProperties-Shape|EntityProperties-Shape}</td></tr>
     *     <tr><td><code>Sphere</code></td><td>A sphere. This is identical to the <code>Shape</code> EntityType except that it is
     *       always created with an initial <code>shape</code> property value of <code>"Sphere"</code>.</td>
     *       <td>{@link Entities.EntityProperties-Sphere|EntityProperties-Sphere}</td></tr>
     *     <tr><td><code>Text</code></td><td>A pane of text oriented in space.</td>
     *       <td>{@link Entities.EntityProperties-Text|EntityProperties-Text}</td></tr>
     *     <tr><td><code>Web</code></td><td>A browsable Web page.</td>
     *       <td>{@link Entities.EntityProperties-Web|EntityProperties-Web}</td></tr>
     *     <tr><td><code>Zone</code></td><td>A volume of lighting effects and avatar permissions.</td>
     *       <td>{@link Entities.EntityProperties-Zone|EntityProperties-Zone}</td></tr>
     *   </tbody>
     * </table>
     * @typedef {string} Entities.EntityType
     */
    typedef enum EntityType_t {
        Unknown,
        Model,
        Box,
        Sphere,
        Light,
        Text,
        ParticleEffect,
        Zone,
        Web,
        Line,
        PolyVox,
        PolyLine,
        Shape,
        LAST = Shape
    } EntityType;

    static const QString& getEntityTypeName(EntityType entityType);
    static EntityTypes::EntityType getEntityTypeFromName(const QString& name);
    static bool registerEntityType(EntityType entityType, const char* name, EntityTypeFactory factoryMethod);
    static EntityItemPointer constructEntityItem(EntityType entityType, const EntityItemID& entityID, const EntityItemProperties& properties);
    static EntityItemPointer constructEntityItem(const unsigned char* data, int bytesToRead, ReadBitstreamToTreeParams& args);

private:
    static QMap<EntityType, QString> _typeToNameMap;
    static QMap<QString, EntityTypes::EntityType> _nameToTypeMap;
    static EntityTypeFactory _factories[LAST + 1];
    static bool _factoriesInitialized;
};


/// Macro for registering entity types. Make sure to add an element to the EntityType enum with your name, and your class should be
/// named NameEntityItem and must of a static method called factory that takes an EnityItemID, and EntityItemProperties and return a newly
/// constructed (heap allocated) instance of your type. e.g. The following prototype:
//        static EntityItemPointer factory(const EntityItemID& entityID, const EntityItemProperties& properties);
#define REGISTER_ENTITY_TYPE(x) bool x##Registration = \
            EntityTypes::registerEntityType(EntityTypes::x, #x, x##EntityItem::factory);


struct EntityRegistrationChecker {
    EntityRegistrationChecker(bool result, const char* debugMessage) {
        if (!result) {
            qCDebug(entities) << debugMessage;
        }
    }
};

/// Macro for registering entity types with an overloaded factory. Like using the REGISTER_ENTITY_TYPE macro: Make sure to add
/// an element to the EntityType enum with your name. But unlike  REGISTER_ENTITY_TYPE, your class can be named anything
/// so long as you provide a static method passed to the macro, that takes an EnityItemID, and EntityItemProperties and 
/// returns a newly constructed (heap allocated) instance of your type. e.g. The following prototype:
//        static EntityItemPointer factory(const EntityItemID& entityID, const EntityItemProperties& properties);
#define REGISTER_ENTITY_TYPE_WITH_FACTORY(x,y) static bool x##Registration = \
            EntityTypes::registerEntityType(EntityTypes::x, #x, y); \
            EntityRegistrationChecker x##RegistrationChecker( \
                x##Registration, \
                "UNEXPECTED: REGISTER_ENTITY_TYPE_WITH_FACTORY(" #x "," #y ") FAILED.!");


#endif // hifi_EntityTypes_h
