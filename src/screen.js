import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./controller.html';
import 'file?name=[name].[ext]!./screen.html';
import 'file?name=index.html!./screen.html';
import 'file?name=assets/[name].[ext]!../assets/witch.png';
import 'file?name=assets/[name].[ext]!../assets/witch2.png';
import 'file?name=assets/[name].[ext]!../assets/wizard.png';
import 'file?name=assets/[name].[ext]!../assets/wizard2.png';
import 'file?name=assets/[name].[ext]!../assets/ball.png';
import 'file?name=assets/[name].[ext]!../assets/vorpal32.png';
import 'file?name=assets/[name].[ext]!../assets/map.png';
import 'file?name=assets/[name].[ext]!../assets/goalSound.wav';

import Witch from './witch';
import Quaffle from './quaffle';
import { createGoals } from './goal';

const w = [];
let q;
let enoughPlayers = false;
let PLAYERS_NEEDED = 2;
let GOALS_TO_WIN = 3;
let goalSound;
let worldX = 1024;
let worldY = 768;
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
let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
let cursors;
const acInputs = {};

const game = new Phaser.Game(worldX, worldY, Phaser.AUTO, 'quidditch', {
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
	game.load.image('vorpal32', 'assets/vorpal32.png');
	game.load.image('map', 'assets/map.png');

	game.load.audio('goalSound', 'assets/goalSound.wav');
}

function create(){
	//game.stage.backgroundColor = '#78AB46';
	game.stage.disableVisibilityChange = true;
	
	let map = game.add.sprite(0, 0, 'map');
	map.scale.setTo((worldX/32), (worldY/18));
	map.sendToBack();
	
	game.physics.startSystem(Phaser.Physics.ARCADE);

	q = new Quaffle(game, worldX, worldY);

    //  The Text is positioned at 0, 100
    teams["witch"].displayScore = game.add.text(0, 0, "Witches: 0", style);
	teams["wizard"].displayScore = game.add.text(worldX-180, 0, "Wizards: 0", style);
	
	//game.add.sprite(32, 32, 'vorpal32');

	goalSound = game.add.audio('goalSound')
	cursors = game.input.keyboard.createCursorKeys();

	q.s.body.onCollide = new Phaser.Signal();
	// q.s.body.onCollide.add((sprite1, sprite2) => {
	// 	console.log(sprite1, sprite2);
	// });
	game.load.start(); //for audio ?

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
	if(goals) {
		goals.forEach(g => {
			game.physics.arcade.collide(g.s, q.s, goalCollisionHandler);
		});
	}
	
}

function goalCollisionHandler(obj1, obj2) {
	if(obj1.name === "witch" && obj1.body.touching.right) {
		goalScored("wizard");
	} else if(obj1.name === "wizard" && obj1.body.touching.left) {
		goalScored("witch");
	}
}

function gameOver(winningTeam) {

	let youAreWinner = game.add.text(354, 234, winningTeam.displayName + " Win!!!", style);
	setTimeout(() => {
		teams.witch.score = 0;
		teams.witch.displayScore.text = teams.witch.displayName + ": " + teams.witch.score;
		teams.wizard.score = 0;
		teams.wizard.displayScore.text = teams.wizard.displayName + ": " + teams.wizard.score;			
		youAreWinner.destroy();
		resetWitchPositions();
		q.resetPosition();
	}, 2000);
}

function resetWitchPositions() {
	w.forEach((w, index) => {
		w.resetPosition(index % 4);
	});
}

function goalScored(t) {
	var team = teams[t];
	team.score++;
	team.displayScore.text = team.displayName + ": " + team.score;
	w.forEach(w => {
		airconsole.message(w.deviceId, {vibrate: 1000});
	});
	goalSound.play();	

	resetWitchPositions();
	q.resetPosition();

	if(team.score >= GOALS_TO_WIN) {
		gameOver(team);
	}
}

function keyboardDirection(){
	return cursors.left.isDown ?
		-200 :
		cursors.right.isDown ?
			200 :
			0;
}

function maybeStartGame() {
	var active_players = airconsole.getActivePlayerDeviceIds();
	var connected_controllers = airconsole.getControllerDeviceIds();
	
	if(connected_controllers.length >= PLAYERS_NEEDED) {
		airconsole.setActivePlayers(connected_controllers);
		resetWitchPositions();
		q.resetPosition();		
		enoughPlayers = true;
		goals = createGoals(game, worldX, worldY);
	}
}

const airconsole = new AirConsole();

airconsole.onConnect = deviceId => {
	w.push(new Witch(game, deviceId));
	maybeStartGame();
};

airconsole.onMessage = (deviceId, data) => {
	if(data.dash !== undefined) {
		w.some(w => {
			if(w.deviceId === deviceId) {
				game.physics.arcade.accelerationFromRotation(w.s.rotation, 10000, w.s.body.velocity);
				return true
			}
		});
	}
	if(data.move !== undefined) {
		acInputs[deviceId] = data.move;
	}
};
