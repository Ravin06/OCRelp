const Discord = require('discord.js');
require("discord-reply"); // Initializing Discord-Reply
const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




const Tesseract = require("tesseract.js"); // Initializing Tesseract, this module is essential for OCR


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.attachments.size > 0) {
    msg.attachments.forEach((attachment) => {
      // Getting the Image URL
      var ImageURL = attachment.proxyURL;

      
      Tesseract.recognize(
        ImageURL,
        "eng",
        { logger: (m) => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        msg.reply(text);
      });
    });
  }
});

bot.login(process.env.TOKEN);

const keep_alive = require('./keep_alive.js')
