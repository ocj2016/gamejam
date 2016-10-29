import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./src/controller.html';
import 'file?name=[name].[ext]!./src/screen.html';
import 'file?name=index.html!./src/screen.html';

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
    t[deviceId].setText(`I am receiving ${data} from  device ${deviceId}`);
};
