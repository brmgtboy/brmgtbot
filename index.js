console.clear()
require("events").setMaxListeners(10000);

const Discord = require('discord.js'), client = new Discord.Client({ intents: 3276799, partials: ["GUILD_SCHEDULED_EVENT", "REACTION", "MESSAGE", "GUILD_MEMBER", "USER", "CHANNEL"] }), database = require('mongoose')
database.set('strictQuery', true)

client.login('')
database.connect("")
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

client.messageCommands = new Discord.Collection()
client.slashCommands = new Discord.Collection()

let handler = ["events", "slash", "message"]
handler.forEach(file => {
  require(`./handler/${file}`)(client);
})