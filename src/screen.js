import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./controller.html';
import 'file?name=[name].[ext]!./screen.html';
import 'file?name=index.html!./screen.html';
import 'file?name=assets/[name].[ext]!../assets/witch.png';
import 'file?name=assets/[name].[ext]!../assets/witch2.png';
import 'file?name=assets/[name].[ext]!../assets/wizard.png';
import 'file?name=assets/[name].[ext]!../assets/wizard2.png';
import 'file?name=assets/[name].[ext]!../assets/ball.png';

import Witch from './witch';
import Quaffle from './quaffle';

const w = [];
let q;

let cursors;
const acInputs = {};

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'quidditch', {
	preload,
	create,
	update
});

function preload(){
	game.load.image('witch', 'assets/witch.png');
	game.load.image('witch2', 'assets/witch2.png');
	game.load.image('wizard', 'assets/wizard.png');
	game.load.image('wizard2', 'assets/wizard2.png');
	game.load.image('quaffle', 'assets/ball.png');
}

function create(){
	game.stage.backgroundColor = '#78AB46';
	game.stage.disableVisibilityChange = true;
	game.physics.startSystem(Phaser.Physics.ARCADE);

	q = new Quaffle(game);

	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	if(w.length == 0 && (cursors.left.isDown || cursors.right.isDown)){
		w.push(new Witch(game));
	}
	w.forEach(w => {
		w.update(game, acInputs[w.deviceId] || keyboardDirection());
	});
}

function keyboardDirection(){
	return cursors.left.isDown ?
		-200 :
		cursors.right.isDown ?
			200 :
			0;
}

var airconsole = new AirConsole();

airconsole.onConnect = deviceId => {
	w.push(new Witch(game, deviceId));
};

airconsole.onMessage = (deviceId, data) => {
	if(data.dash !== undefined) {
		
	}
	if(data.move !== undefined) {
		acInputs[deviceId] = data.move;
	}
};
