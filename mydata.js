/**
 * Here is data stored.
 * 
 * 
 * NOTE:
 *  Database should be used for long-term storage!
 *  For now, this will do the job.
 * 
 * 
 * price        :   here is real price from the API stored
 * targets      :   price targets defined by user, if any of those is met - alarm will be triggered
 * API          :   API url (heavy-lifting should be updated in case of API change)
 * tolerance    :   +/- difference in target price from actual price (in USD)
 * alarm        :   file name for alarm
 * silent       :   if true alarm does not ring (duuh)
 * 
 */

var mydata = {
    "API": "https://api.cryptonator.com/api/full/btc-usd",
    "targets": [],
    "price": 0,
    "tolerance": 50,
    "alarm": "alarm.mp3",
    "silent": false
};

module.exports = mydata;
