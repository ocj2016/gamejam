// creation of a new AirConsole instance
var airconsole = new AirConsole();
// function to be executed every 3 seconds
setInterval(function(){
     // generating a random value
     var value = Math.floor(Math.random() * 100);
     // this is how we send a message to AirConsole main screen
     airconsole.message(AirConsole.SCREEN, value);  
     // updating "value" h1 content to show on the controller the value we are sending
     document.getElementById("value").innerHTML = "I am sending " + value;   
}, 3000);