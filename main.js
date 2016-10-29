import 'file?name=[name].[ext]!phaser/build/phaser.min';
import 'file?name=[name].[ext]!./src/controller.html';
import 'file?name=[name].[ext]!./src/screen.html';
import 'file?name=index.html!./src/screen.html';

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

// creation of an empty array
var deviceIds = [];
// creation of a new AirConsole instance
var airconsole = new AirConsole();
// this is the listener for incoming messages
airconsole.onMessage = function(deviceId, data) {
    // checking if the deviceId is already in deviceIds vector, and if it's not...
    if(deviceIds.indexOf(deviceId) == -1){
         // pushing the device id
         deviceIds.push(deviceId);
         // adding a new h1 to the body
         document.body.innerHTML += '<h1 style = "color:white" id = "dev' + deviceId + '"></h1>'
    }
    // updating the content of the proper h1 tag according to device id and received data
    document.getElementById("dev" + deviceId).innerHTML = "I am receiving " + data + " from  device " + deviceId;   
};