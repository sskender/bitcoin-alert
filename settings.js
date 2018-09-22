/**
 * 
 * price        :   current BTC price got from API
 * volume       :   trading volume
 * API          :   API url (heavy-lifting inherits this setting)
 * tolerance    :   +/- difference in target price from actual price (in USD)
 * alarm        :   file name for alarm
 * silent       :   if true alarm does not ring (duuh)
 * time         :   time when data got updated
 * 
 */

var Settings = {
    "API": "https://api.cryptonator.com/api/full/btc-usd",
    "price": 0,
    "volume": 0,
    "time": {},
    "tolerance": 20,
    "alarm": "alarm.mp3",
    "silent": false
};

module.exports = Settings;
