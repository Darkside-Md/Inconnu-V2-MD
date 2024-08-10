const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
    ALIVE_IMG: process.env.ALIVE_IMG ||"https://avatars.githusercontent.com/u/1062511407v=4"
    ALIVE_MSG: process.env.ALIVE_MSG ||"Hello,I am inconnu-V2-MD i am alive now !"
};
