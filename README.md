Hi Cryniixz!

[![Build Status](https://travis-ci.org/RTK99/tuxbot.svg?branch=master)](https://travis-ci.org/RTK99/tuxbot)

# tuxbot
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

**Music**

`play`- play a song added to the queue.

`add`- add a song to the queue

`queue`- get the current queue.

`musichelp`- get more info on the music commands.

And many more to come!

**Installation**

**IMPORTANT: This bot will not work with node versions lower than 8.1.2. Please make sure your node version is up-to-date.**

1. Create a new bot application at http://discordapp.com/developers/applications/me, and get the token. If you don't know how to do this, follow this guide:https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
Name it whatever you want. If you want Tux's logo, look in the master directory for `Tux.png`.

2. Find the client ID on the page, and generate an invite link with this website: https://discordapi.com/permissions.html.
Make sure you select `Administrator`. Then, click the link at the bottom and add it to your server.

3. Clone the repo using by either downloading the zip or running `git clone https://github.com/RTK99/tuxbot.git`

4. Run `npm i` to install all of the required modules.

5. Create a config.json file in the master directory and have it look like this: 
```json
{
 "token": "your token here"
}
```
6. Open up `start.js` and replace my ID in `ownerID:` with your ID.

7. This is very important: Go to `commands/Moderation` and look for the file `warn.js`. Inside of that, look for these lines: 

```js
  const { cases } = require('../../settings/mysql_case-db.js')
  const { warnpoints } = require('../../settings/mysql_wp-db.js') 
```
Delete `mysql_case-db` and replace it with `sqlite-case`. For `{ warnpoints }` replace that with `sqlite-wp`

8. Repeat Step 7 for `warnpoints.js`, and `case.js`.

9. Navigate to `settings/`(In the root directory) and find these files: `caseList.js` and `warnList.js`. 

10. Open `caseList.js` and change it look like this:
```js
  const { Sequelize, cases } = require('sqlite-case.js')
  ```
  And for `warnList.js`, it should look like this:
  ```js
  const { Sequelize, warnpoints } = require('sqlite-wp.js')
  ```
11. Optional: Change the prefix in`prefix:` to whatever you'd like.

# Leveling

To use the leveling, you must do these steps:
- Open ./commands/Fun/xptop.js and change `mysql` to sqlite on the line `const { levels }`
- Do the same for xpboard.js
- Navigate back to the start folder, and go to ./settings
- Open `levelBoard.js` and change `mysql` to `sqlite` on the first line.

12. Start the bot with `npm start` or `pm2 start start.js` if you're using PM2.

**Configuration**

To properly set up the modRole and adminRole for commands: Do the following: 

In a server, type `./conf set modRole <nameofModRole>` followed by `./conf set adminRole <nameofAdminRole>` to finish setup.







