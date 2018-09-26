# Bitcoin Alert

Bitcoin price alert written in Express JS.

## About

[Inspired by Gilfoyle (Silicon Valley).](https://www.youtube.com/watch?v=gz7IPTf1uts)

Define price level and when Bitcoin reaches it, alarm will let you know. Even though you may not have a mining rig at home that you need to remotely toggle, you would rather watch the paint dry than monitor exchanges all the time. If you want something simple, customizable, *LOUD* and efficient (fond of Gilfoyle also) you are in the right place. Otherwise, keep looking. Or just code your own notificator. I did.

### Installing

Install dependencies:

```
npm install
```

Run:

```
npm start
```

Run development:

```
npm run dev
```

Open browser:

```
localhost:3000
```

### Prerequisites

Application settings are stored in [.env](.env) and [config.js](config/config.js) files. User data is saved in database.

Place your alarm sound in [notifications](notifications) folder. Make sure it's named "alarm.mp3". This is not required if alarm is silenced (see below how to do that). But what's the point then, right?

### Usage

Add alert:

```
/add/<coin>/<target price>
```

Remove alert:

```
/remove/<coin>/<target price>
```

Change tolerance range:

```
/tolerance/<coin>/<price range>
```

Examples:

```
/add/btc/5670
/add/btc/5100
/add/eth/250
```

```
/remove/btc/5670
/remove/eth/250
```

```
/tolerance/btc/25
/tolerance/eth/10
```

Clear all price targets for coin:

```
/clear/btc
/clear/eth
```

Show target prices:

```
/target
/target/<coin>
/targetid/<mongodb-id>
```

Show coin data like current price, volume, tolerance setting:

```
/coin
/coin/<coin>
/coin/btc
```

Turn alarm off:

```
/off
```

Turn alarm back on:

```
/on
```

Every API call will return status code and JSON object.

## MongoDB interaction

Start shell:

```
mongo
```

Select database:

```
show dbs
use bitcoin-alert
````

Show collections and data:

```
show collections
db.pricetargets.find().pretty()
db.coins.find().pretty()

db.coins.deleteMany({coin: 'BTC'})
```

## Built With

* [Express](https://expressjs.com/) - Node.js web application framework
* [Cryptonator API](https://www.cryptonator.com/) - Cryptocurrencies exchange rates API
* [MongoDB](https://www.mongodb.com/) - free and open-source cross-platform document-oriented database

## License

This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details.
