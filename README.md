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

1. Clone the repo: `git clone https://github.com/RTK99/tuxbot.git`

2. Create a config.json and have it look like this: 
```json
{
 "token": "youre token here"
}
```
3. Optional: edit the prefix in `tuxbot.js`.

4. Start the bot with `npm start` or `pm2 start tuxbot.js` if you're using PM2.

5. Start using tuxbot!

