function quaffle(game){
    this.s = game.add.sprite(64, 64, 'quaffle');
    this.s.scale.set(0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(0.8);
    this.s.body.allowRotation = true;
}

quaffle.prototype = {
    update(game, cursors){
        
    }
};

export default quaffle;