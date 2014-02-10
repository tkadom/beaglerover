var b = require('bonescript');
var state = 0;

b.pinMode('P9_14', b.OUTPUT);
b.pinMode('P9_16', b.OUTPUT);

timer = setInterval(toggle, 2000);

function toggle(x) {
	state = state ? 0 : 1 ;
        b.analogWrite('P9_14', 0, 2000.0);
        b.analogWrite('P9_16', 0, 2000.0);
}
