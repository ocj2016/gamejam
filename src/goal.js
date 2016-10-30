function goal(game, pos, name){
	const bitmapData = game.add.bitmapData(10,196);

    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0,0,10,196);
    bitmapData.ctx.fillStyle = '#7a5230';
    bitmapData.ctx.fill();

    const bitmapDataFront = game.add.bitmapData(2,196);

    bitmapDataFront.ctx.beginPath();
    bitmapDataFront.ctx.rect(0,0,2,196);
    bitmapDataFront.ctx.fillStyle = '#ffffff';
    bitmapDataFront.ctx.fill();

    this.s = game.add.sprite(pos.x, pos.y, bitmapData);
    if(name === 'witch') {
        game.add.sprite(pos.x+8, pos.y, bitmapDataFront);
    } else {
        game.add.sprite(pos.x-2, pos.y, bitmapDataFront);
    }
    
    game.physics.enable(this.s, Phaser.Physics.ARCADE);
    this.s.name = name;
    this.s.body.immovable = true;
}

goal.prototype = {
    update(game, cursors){
        
    }
};

export function createGoals(game, worldX, worldY){
	return [
		new goal(game, { x: 50, y: 0.4 * worldY }, "witch"),
		new goal(game, { x: worldX-50, y: 0.4 * worldY }, "wizard"),
	];
}

export default goal;
