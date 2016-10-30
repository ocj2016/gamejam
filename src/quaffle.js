function quaffle(game){
    this.s = game.add.sprite(384, 284, 'quaffle');
    this.s.scale.set(0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(1);
    this.s.body.drag.set(32);
    this.s.body.maxVelocity.set(100);
}

quaffle.prototype = {
    update(game, cursors){
        
    },
    resetPosition() {
        this.s.position.x = 384;
        this.s.position.y = 284;
        this.s.body.velocity.x = 0;
        this.s.body.velocity.y = 0;
    }
};

export default quaffle;