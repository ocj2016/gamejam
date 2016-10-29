const cruisingVelocity = 300;

const sprites = ['witch', 'witch2', 'wizard', 'wizard2'];
let currentSprite = 0;

function witch(game, deviceId){
    this.deviceId = deviceId;
    this.quaffle = false;

    this.s = game.add.sprite(64, 64, sprites[currentSprite++ % 4]);
    this.s.anchor.set(0.5, 0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(0.8);
    this.s.body.allowRotation = true;
    this.s.body.immovable = true;
}

witch.prototype = {
    update(game, input){
        this.s.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.s.angle, cruisingVelocity));

        this.s.body.angularVelocity = input !== undefined ? input : 0;
    }
};

export default witch;
