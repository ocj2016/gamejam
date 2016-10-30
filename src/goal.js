function goal(game, pos){
	const bitmapData = game.add.bitmapData(10,128);

    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0,0,10,128);
    bitmapData.ctx.fillStyle = '#7a5230';
    bitmapData.ctx.fill();

    this.s = game.add.sprite(pos.x, pos.y, bitmapData);

    game.physics.enable(this.s, Phaser.Physics.ARCADE);
}

goal.prototype = {
    update(game, cursors){
        
    }
};

export function createGoals(game){
	return [
		new goal(game, { x: 50, y: 236 }),
		new goal(game, { x: 740, y: 236 }),
	];
}

export default goal;
