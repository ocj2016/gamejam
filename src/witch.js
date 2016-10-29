const cruisingVelocity = 300;

function witch(game){
    this.quaffle = false;

    this.s = game.add.sprite(64, 64, 'witch');
    this.s.anchor.set(0.5, 0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(0.8);
    this.s.body.allowRotation = true;
    this.s.body.immovable = true;
}

witch.prototype = {
    update(game, cursors){
        this.s.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.s.angle, cruisingVelocity));

        if (cursors.left.isDown) {
            this.s.body.angularVelocity = -200;
        }
        else if (cursors.right.isDown) {
            this.s.body.angularVelocity = 200;
        } else {
            this.s.body.angularVelocity = 0;
        }

        if (cursors.up.isDown) {
            
        }
    }
};

export default witch;