const shadowOffset = 3;

function quaffle(game, worldX, worldY){
    this.startX = worldX/2;
    this.startY = worldY/2;
    this.shadow = game.add.sprite(this.startX + shadowOffset, this.startY + shadowOffset, 'quaffle');
    this.s = game.add.sprite(this.startX, this.startY, 'quaffle');

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.setCircle(32);
    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(3);
    this.s.body.worldBounce = new Phaser.Point(1, 1);
    this.s.body.drag.set(256);
    this.s.body.maxVelocity.set(1000);

    this.shadow.tint = 0x000000;
    this.shadow.alpha = 0.6;
}

quaffle.prototype = {
    update(game, cursors){
        this.shadow.x = this.s.x + shadowOffset;
        this.shadow.y = this.s.y + shadowOffset;
    },
    resetPosition() {
        this.s.position.x = this.startX;
        this.s.position.y = this.startY;
        this.s.body.velocity.x = 0;
        this.s.body.velocity.y = 0;
    }
};

export default quaffle;