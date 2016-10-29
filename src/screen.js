import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./controller.html';
import 'file?name=[name].[ext]!./screen.html';
import 'file?name=index.html!./screen.html';
import 'file?name=assets/[name].[ext]!../assets/witch.png';
import 'file?name=assets/[name].[ext]!../assets/ball.png';

import Witch from './witch';
import Quaffle from './quaffle';

let w, q;

let cursors

const style = {
	fill: '#ffffff'
}

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'quidditch', {
	preload,
	create,
	update
});

function preload(){
	game.load.image('witch', 'assets/witch.png');
	game.load.image('quaffle', 'assets/ball.png');
}

function create(){
	game.stage.backgroundColor = '#78AB46';
	game.physics.startSystem(Phaser.Physics.ARCADE);

	w = new Witch(game);
	q = new Quaffle(game);

	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	w.update(game, cursors);
}

var airconsole = new AirConsole();

airconsole.onConnect = deviceId => {
	t[deviceId] = game.add.text(game.world.centerX-100, deviceId*100, text, style);
};

airconsole.onMessage = (deviceId, data) => {
	console.log("data: ", data);
	if(data.dash !== undefined) {
		t[deviceId].setText(`DASH ${data.dash} from  device ${deviceId}`);	
	}
	if(data.move !== undefined) {
		t[deviceId].setText(`MOVE ${data.move} from  device ${deviceId}`);
	}
    
};
