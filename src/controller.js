navigator.vibrate = (navigator.vibrate ||
                     navigator.webkitVibrate ||
                     navigator.mozVibrate ||
                     navigator.msVibrate);
var airconsole;
/**
 * Sets up the communication to the screen.
 */
window.onload = () => {
    airconsole = new AirConsole({"orientation": "landscape"});
    /*
    * Checks if this device is part of the active game.
    */
    airconsole.onActivePlayersChange = function(player) {
        var div = document.getElementById("player_id");
        if (player !== undefined) {
            div.innerHTML =  (["Left Player", "Right Player"][player]);
        } else {
            div.innerHTML = "It's a 2 player game!";
        }
    };
    /*
    * Makes the device vibrate if the screen says so.
    */
    airconsole.onMessage = function(from, data) {
        if (from == AirConsole.SCREEN && data.vibrate) {
            navigator.vibrate(data.vibrate);
            console.log("Vibrating: " + data.vibrate);
        }
    };

    function move(amount) {
        var toMove = amount;
        return function(){
            console.log("moving: ", toMove);
            airconsole.message(AirConsole.SCREEN, {move: toMove})
        }        
    }    

    function dash() {
        airconsole.message(AirConsole.SCREEN, {dash: 200});
    }

    document.getElementById("div-right").addEventListener("touchstart", move(50), false);
    document.getElementById("div-right").addEventListener("touchend", move(0), false);
    document.getElementById("div-right").addEventListener("mousedown", move(50), false);
    document.getElementById("div-right").addEventListener("mouseup", move(0), false);

    document.getElementById("div-left").addEventListener("touchstart", move(-50), false);
    document.getElementById("div-left").addEventListener("touchend", move(0), false);
    document.getElementById("div-left").addEventListener("mousedown", move(-50), false);
    document.getElementById("div-left").addEventListener("mouseup", move(0), false);

    document.getElementById("div-dash").addEventListener("touchstart", dash, false);
    document.getElementById("div-dash").addEventListener("mousedown", dash, false);
}
