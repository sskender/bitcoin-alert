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

Place your alarm sound in [notifications](notifications) folder. Make sure it's named "alarm.mp3". This is not required if alarm is silenced (see below how to do that). But what's the point then, right?

### Usage

Add alert:

```
/add/<target price>
```

Remove alert:

```
/remove/<target price>
```

Change tolerance range:

```
/tolerance/<price range>
```

Examples:

```
/add/5670
/add/5100
```

```
/remove/5100
```

```
/tolerance/10
```

Clear all price targets:

```
/clear
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

## Built With

* [Express](https://expressjs.com/) - Node.js web application framework
* [Cryptonator API](https://www.cryptonator.com/) - Cryptocurrencies exchange rates API

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details.
