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
import { createGoals } from './goal';

const w = [];
let q;
let goals = [];
let teams = {
	witch: {
		score: 0,
		displayName: "Witches",
		displayScore: "Witches: 0"
	},
	wizard: {
		score: 0,
		displayName: "Wizards",		
		displayScore: "Wizards: 0"
	}	
};

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

	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    teams["witch"].displayScore = game.add.text(0, 0, "Witches: 0", style);
	teams["wizard"].displayScore = game.add.text(620, 0, "Wizards: 0", style);

	goals = createGoals(game);

	cursors = game.input.keyboard.createCursorKeys();

	q.s.body.onCollide = new Phaser.Signal();
	// q.s.body.onCollide.add((sprite1, sprite2) => {
	// 	console.log(sprite1, sprite2);
	// });
}

function update(){
	if(w.length == 0 && (cursors.left.isDown || cursors.right.isDown)){
		w.push(new Witch(game));
	}
	w.forEach(w => {
		w.update(game, acInputs[w.deviceId] || keyboardDirection());
	});

	w.forEach(w => {
		game.physics.arcade.collide(w.s, q.s);
	});
	goals.forEach(g => {
		game.physics.arcade.collide(g.s, q.s, goalCollisionHandler);
	});
	
}

function goalCollisionHandler(obj1, obj2) {
	if(obj1.name === "witch" && obj1.body.touching.right) {
		goalScored("wizard");
	} else if(obj1.name === "wizard" && obj1.body.touching.left) {
		goalScored("witch");
	}
}
function goalScored(t) {
	var team = teams[t];
	team.score++;
	team.displayScore.text = team.displayName + ": " + team.score;
	w.forEach(w => {
		airconsole.message(w.deviceId, {vibrate: 1000});
	});
	
}

function keyboardDirection(){
	return cursors.left.isDown ?
		-200 :
		cursors.right.isDown ?
			200 :
			0;
}

const airconsole = new AirConsole();

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
