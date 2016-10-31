const cruisingVelocity = 300;
const dashVelocity = 1000;
const boostDrag = 25;

const shadowOffset = 10;

const sprites = ['witch', 'wizard', 'witch2', 'wizard2'];
let currentSprite = 0;

const startPositions = [
    {x: 50, y:50},
    {x: 950, y:50},
    {x: 50, y:650},    
    {x: 950, y:650},
]

function witch(game, deviceId, startingPosition){
    const sprite = sprites[currentSprite++ % 4];
    this.deviceId = deviceId;
    this.quaffle = false;
    this.team = currentSprite % 2 === 0 ? "witch" : "wizard";
    this.shadow = game.add.sprite(64 + shadowOffset, 64 + shadowOffset, sprite);
    this.s = game.add.sprite(64, 64, sprite);
    this.s.anchor.set(0.5, 0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);
    
    this.s.body.setCircle(30);
    this.s.body.collideWorldBounds = true;
    this.s.body.allowRotation = true;
    this.s.body.immovable = true;

    this.shadow.anchor.set(0.5);
    this.shadow.tint = 0x000000;
    this.shadow.alpha = 0.6;
}

witch.prototype = {
    update(game, input){
        let velocity = this.s.body.velocity.getMagnitude();
        velocity = velocity > cruisingVelocity ?
            velocity - boostDrag :
            velocity < cruisingVelocity ?
                cruisingVelocity :
                velocity;
        this.s.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.s.angle, velocity));
        this.s.body.angularVelocity = input !== undefined ? input : 0;

        this.shadow.x = this.s.x + shadowOffset;
        this.shadow.y = this.s.y + shadowOffset;
        this.shadow.angle = this.s.angle;
    },
    resetPosition(index) {
        this.s.position.x = startPositions[index].x;
        this.s.position.y = startPositions[index].y;
        this.shadow.position.x = startPositions[index].x + shadowOffset;
        this.shadow.position.y = startPositions[index].y + shadowOffset;
    },
    dash(game){
        game.physics.arcade.accelerationFromRotation(this.s.rotation, dashVelocity, this.s.body.velocity);
    }
};

export default witch;
