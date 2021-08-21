const fs = require('fs');
//const { token } = require('./config.json');
const token = process.env.token;
const { Client, Intents, Collection } = require('discord.js');
const fetch = require('node-fetch');


const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({ intents: myIntents });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


let re = new RegExp('(F|f)uck');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {

    const words = message.content.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "").split(" ");
    words.forEach(word => {
        const command = client.commands.get(word);

        if (!command) return;

        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
});

client.login(token);
