[![Build Status](https://travis-ci.org/RTK99/tuxbot.svg?branch=master)](https://travis-ci.org/RTK99/tuxbot)

# tuxbot + Moonix
A Komada-based bot coded in node.js

Tuxbot, originally on the Linux Discord server, is now officially released!

**Features**

`kick`- kick a user from the guild

`ban`- bans a user from the guild.

`eval`- Evaluates arbitrary javascript code, reserved for the bot owner.

`say`- Talk as your bot!

`fortune`- Tells you a random fortune.

`warn`- warns a user, with a given amount of points.

`warnpoints`- Allows a user to check their warnpoints

`userinfo`- Shows some info about the user.


And many more!

**Installation**

**IMPORTANT: This bot will not work with node versions lower than 8.1.2. Please make sure your node version is up-to-date.**

1. Create a new bot application at http://discordapp.com/developers/applications/me, and get the token. If you don't know how to do this, follow this guide:https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
Name it whatever you want. If you want Tux's logo, look in the master directory for `Tux.png`.

2. Find the client ID on the page, and generate an invite link with this website: https://discordapi.com/permissions.html.
Make sure you select `Administrator`. Then, click the link at the bottom and add it to your server.

3. Clone the repo using by either downloading the zip or running `git clone https://github.com/RTK99/tuxbot.git`

4.Run `npm i` to install all of the required modules.

5. Create a config.json file in the master directory and have it look like this: 
```json
{
 "token": "your token here"
}
```
6. Optional: edit the prefix in `tuxbot.js`.

7. Start the bot with `npm start` or `pm2 start tuxbot.js` if you're using PM2.

8. Start using tuxbot!

**Moonix installation**
1. Follow steps 1-4 above, instead rename the bot to something else.

2. In the `moonix/` folder, create a `tokens.json` file with the following info and save it:
```json
{
    "d_token" : "your token here",
	"adminID" : "your ID",
    "prefix" : "whatever prefix you'd like"
}
```
3. Start Moonix with `node moosik.js` or `pm2 start moosik.js`
4. Enjoy the bot! To see the help options, just run <prefix> help (Make sure the prefix is different that Tuxbot's or they will conflict)

I hope you enjoy the bots!

