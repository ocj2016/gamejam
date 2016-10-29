import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./src/controller.html';
import 'file?name=[name].[ext]!./src/screen.html';

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'quidditch', {
	preload,
	create
});

function preload(){

}

function create(){
	const text = 'Hello gamejam';
	const style = {
		fill: '#ffffff'
	}
	
	const t = game.add.text(game.world.centerX-300, 0, text, style);
}
