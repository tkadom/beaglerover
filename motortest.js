var b = require('bonescript');
var state = 0;
var SERVO = 'P8_13' ;
var duty_min = 0.03 ;
var position = 0;
var increment = 0.1;

b.pinMode('P9_14', b.OUTPUT);
b.pinMode('P9_16', b.OUTPUT);
b.pinMode('P9_21', b.OUTPUT);
b.pinMode('P9_22', b.OUTPUT);
b.pinMode(SERVO, b.OUTPUT);

timer = setInterval(toggle, 2000);

//updateDuty()

function toggle(x) {
	state = state ? 0 : 1 ;
        b.analogWrite('P9_14', 0.0, 2000.0);
        b.analogWrite('P9_14', 0.0, 2000.0);
        b.analogWrite('P9_22', 0.0, 2000.0);
        b.analogWrite('P9_21', 0.0, 2000.0);
	if (state) 
        	b.analogWrite('P8_13', 0.01 , 60);
	else
        	b.analogWrite('P8_13', 0.09 , 60);
}

function updateDuty() {
    // compute and adjust duty_cycle based on
    // desired position in range 0..1
    var duty_cycle = (position*0.115) + duty_min;
    b.analogWrite(SERVO, duty_cycle, 60, scheduleNextUpdate);
    console.log("Duty Cycle: " + 
        parseFloat(duty_cycle*100).toFixed(1) + " %");   
}


function scheduleNextUpdate() {
    // adjust position by increment and 
    // reverse if it exceeds range of 0..1
    position = position + increment;
    if(position < 0) {
        position = 0;
        increment = -increment;
    } else if(position > 1) {
        position = 1;
        increment = -increment;
    }
    
    // call updateDuty after 200ms
    setTimeout(updateDuty, 200);
}
