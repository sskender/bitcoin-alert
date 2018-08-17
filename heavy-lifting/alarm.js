var player = require('play-sound')();


var Alarm = function () {

    /**
     * Check if current price matches any of the target prices.
     */

    mydata.targets.forEach(element => {
        
        if (Math.abs(mydata.price - element) < mydata.tolerance) {
            
            console.info("[!] Alarm triggered");

            if (!mydata.silent) {
                player.play('./notifications/' + mydata.alarm, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }

    });

}


module.exports = Alarm;
