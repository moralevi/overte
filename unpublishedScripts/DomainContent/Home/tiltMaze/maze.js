//
//  maze.js
//
//  Script Type: Entity
//
//  Created by James B. Pollack @imgntn on 2/15/2016
//  Copyright 2016 High Fidelity, Inc.
//
//
//  This script resets a ball to its original position when the ball enters it.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
(function() {

    Script.include('../../../../libraries/utils.js');

    var VICTORY_SOUND;
    var BALL_DISTANCE_THRESHOLD = 1;

    var BALL_DETECTOR_THRESHOLD = 0.2;
    var BALL_FORWARD_OFFSET = -0.2;
    var BALL_RIGHT_OFFSET = -0.4;
    var BALL_VERTICAL_OFFSET = 0.02;


    var BALL_FRICTION = 0.7;
    var BALL_RESTITUTION = 0.1;
    var BALL_DAMPING = 0.6;
    var BALL_ANGULAR_DAMPING = 0.2;
    var BALL_DENSITY = 1000;
    var BALL_GRAVITY = {
        x: 0,
        y: -9.8,
        z: 0
    };

    var BALL_DIMENSIONS = {
        x: 0.05,
        y: 0.05,
        z: 0.05
    }

    var BALL_COLOR = {
        red: 255,
        green: 0,
        blue: 0
    }

    var _this;

    function Maze() {
        _this = this;
        return;
    }

    print('jbp test')

    Maze.prototype = {
        ball: null,
        ballLocked: false,
        preload: function(entityID) {
            this.entityID = entityID;
            VICTORY_SOUND = SoundCache.getSound("http://hifi-content.s3.amazonaws.com/DomainContent/Home/tiltMaze/levelUp.wav");
        },
        startNearGrab: function() {
            //check to make sure a ball is in range, otherwise create one
        },
        continueNearGrab: function() {
            print('near grab')
                //  this.testWinDistance();
            this.testBallDistance();
        },
        continueDistantGrab: function() {
            print('distant grab')
            this.testBallDistance();
            this.testWinDistance();
        },
        releaseGrab: function() {
            this.testBallDistance();
            //   this.testWinDistance();
        },
        getBallStartLocation: function() {
            var mazeProps = Entities.getEntityProperties(this.entityID);
            var right = Quat.getRight(mazeProps.rotation);
            var front = Quat.getFront(mazeProps.rotation);
            var vertical = {
                x: 0,
                y: BALL_VERTICAL_OFFSET,
                z: 0
            };

            var finalOffset = Vec3.sum(vertical, Vec3.multiply(right, BALL_RIGHT_OFFSET));
            finalOffset = Vec3.sum(finalOffset, Vec3.multiply(front, BALL_FORWARD_OFFSET));
            var location = Vec3.sum(mazeProps.position, finalOffset);
            print('BALL START LOCATION:: ' + JSON.stringify(location))
            return location;
        },
        createBall: function() {
            if (this.ballLocked === true) {
                return;
            }
            print('making ball')
            var properties = {
                name: 'Hifi Tilt Maze Ball',
                type: 'Sphere',
                position: this.getBallStartLocation(),
                dynamic: true,
                collisionless: false,
                friction: BALL_FRICTION,
                restitution: BALL_RESTITUTION,
                angularDamping: BALL_ANGULAR_DAMPING,
                damping: BALL_DAMPING,
                gravity: BALL_GRAVITY,
                density: BALL_DENSITY,
                color: BALL_COLOR,
                dimensions: BALL_DIMENSIONS

            };

            this.ball = Entities.addEntity(properties);
        },
        destroyBall: function() {
            var res = Entities.findEntities(MyAvatar.position, 10);
            res.forEach(function(r) {
                var props = Entities.getEntityProperties(r, ['name']);
                var isAMazeBall = props.name.indexOf('Maze Ball');
                if (isAMazeBall > -1 && r === _this.ball) {
                    Entities.deleteEntity(r);
                }
            })
        },
        testBallDistance: function() {
            if (this.ballLocked === true) {
                return;
            }
            print('test ball dsitance')
            var userData = Entities.getEntityProperties(this.entityID, 'userData').userData;
            var data = null;
            try {
                data = JSON.parse(userData)
            } catch (e) {
                print('error parsing json in maze userdata')
            }
            if (data === null) {
                print('data is null in userData')
                return;
            }

            var ballPosition;
            if (this.ball === null) {
                this.ball = data.tiltMaze.firstBall;
                ballPosition = Entities.getEntityProperties(data.tiltMaze.firstBall, 'position').position;

            } else {
                ballPosition = Entities.getEntityProperties(this.ball, 'position').position
            }

            var ballSpawnerPosition = Entities.getEntityProperties(data.tiltMaze.ballSpawner, 'position').position;

            var separation = Vec3.distance(ballPosition, ballSpawnerPosition);
            if (separation > BALL_DISTANCE_THRESHOLD) {
                print('BALL TOO FAR MAKE A NEW ONE')
                this.destroyBall();
                this.createBall();
            } else {

            }
        },
        testWinDistance: function() {
            if (this.ballLocked === true) {
                return;
            }
            print('testing win distance')
            var userData = Entities.getEntityProperties(this.entityID, 'userData').userData;
            var data = null;
            try {
                data = JSON.parse(userData)
            } catch (e) {
                print('error parsing json in maze userdata')
            }
            if (data === null) {
                print('data is null in userData')
                return;
            }

            var ballPosition;
            if (this.ball === null) {
                this.ball = data.tiltMaze.firstBall;
                ballPosition = Entities.getEntityProperties(data.tiltMaze.firstBall, 'position').position;

            } else {
                ballPosition = Entities.getEntityProperties(this.ball, 'position').position
            }

            var ballDetectorPosition = Entities.getEntityProperties(data.tiltMaze.detector, 'position').position;

            var separation = Vec3.distance(ballPosition, ballDetectorPosition);
            print('separation from win:' + separation)
            if (separation < BALL_DETECTOR_THRESHOLD) {
                print('BALL IS IN DETECTOR, MAKE A NEW ONE')
                this.ballLocked = true;
                this.destroyBall();
                this.playVictorySound();
                Script.setTimeout(function() {
                    _this.ballLocked = false;
                    _this.createBall()
                }, 1500)
            } else {

            }

        },
        playVictorySound: function() {
            var position = Entities.getEntityProperties(this.entityID, "position").position;

            var audioProperties = {
                volume: 0.25,
                position: position
            };
            Audio.playSound(VICTORY_SOUND, audioProperties);

        },
    };

    return new Maze();
});