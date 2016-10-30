const cruisingVelocity = 300;

const sprites = ['witch', 'wizard', 'witch2', 'wizard2'];
let currentSprite = 0;

const startPositions = [
    {x: 50, y:50},
    {x: 350, y:50},
    {x: 50, y:450},    
    {x: 350, y:450},
]

function witch(game, deviceId, startingPosition){
    this.deviceId = deviceId;
    this.quaffle = false;
    this.team = currentSprite % 2 === 0 ? "witch" : "wizard"; 
    this.s = game.add.sprite(64, 64, sprites[currentSprite++ % 4]);
    this.s.anchor.set(0.5, 0.5);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);

    this.s.body.collideWorldBounds = true;
    this.s.body.bounce.set(0.5);
    this.s.body.allowRotation = true;
    this.s.body.immovable = true;
}

witch.prototype = {
    update(game, input){
        this.s.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.s.angle, cruisingVelocity));

        this.s.body.angularVelocity = input !== undefined ? input : 0;
    },
    resetPosition(index) {
        this.s.position.x = startPositions[index].x;
        this.s.position.y = startPositions[index].y;
    }
};

export default witch;
