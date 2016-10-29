import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./controller.html';
import 'file?name=[name].[ext]!./screen.html';
import 'file?name=index.html!./screen.html';

let text = '';
const t = [];

const style = {
	fill: '#ffffff'
}

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'quidditch', {
	preload,
	create,
	update
});

function preload(){

}

function create(){

}

function update(){
	
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
