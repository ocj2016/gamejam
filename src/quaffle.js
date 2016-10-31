function quaffle(game, worldX, worldY){
    this.startX = worldX/2;
    this.startY = worldY/2;
    this.s = game.add.sprite(this.startX, this.startY, 'quaffle');
    this.s.scale.set(0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(1);
    this.s.body.drag.set(32);
}

quaffle.prototype = {
    update(game, cursors){
        
    },
    resetPosition() {
        this.s.position.x = this.startX;
        this.s.position.y = this.startY;
        this.s.body.velocity.x = 0;
        this.s.body.velocity.y = 0;
    }
};

export default quaffle;