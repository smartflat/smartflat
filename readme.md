# SmartFlat

> Modular real-time home automation server.

Devices are extensions. SmartFlat can potentially support anything.

[![Slack](https://slack.smartfl.at/badge.svg)](https://slack.smartfl.at)
[![Docker](https://img.shields.io/docker/pulls/smartflat/smartflat.svg)](https://hub.docker.com/r/smartflat/smartflat)

<img src="https://raw.githubusercontent.com/smartflat/smartflat/master/source/images/logo.png" alt="SmartFlat Logo" height="128" width="128">

## Features

- Highly Compatible:
	- [HomeKit](https://github.com/smartflat/smartflat-homekit)
	- [WebHooks](https://github.com/smartflat/smartflat-webhooks)
	- [RaspberryPi GPIO](https://github.com/smartflat/raspberry-pi)
	- [Arduino I²C & Serial](https://github.com/smartflat/smartflat-arduino)
- Modular
	- Everything is a module
	- Easy to extend
	- Flexible
- Real-time
- Scriptable
- Secure:
	- SSL for communication
	- PBKDF2 for hashing
	- JWT for tokens
	- [OpenSource](/license.md)
	- Self-hosted
- Customizable
	- Choose whatever database you want
	- Get a third-party WebUI
	- Own a custom device? Write your own module for it

## Extensions

- [WebHook](https://github.com/smartflat/smartflat-webhooks)

## For Developers

Requires: git, [yarn](https://yarnpkg.com) and [node.js](https://nodejs.org).

```sh
git clone https://github.com/smartflat/smartflat
yarn install
yarn run build
```

## License

SmartFlat is [MIT-licensed](/license.md).
