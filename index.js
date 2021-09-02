const fs = require('fs');
//const { token } = require('./config.json');
const token = process.env.token;
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');






//Initialize client
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({ intents: myIntents });



//Initialize all commands
client.commands = new Collection();
const messageCommandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));
const messageCommands = [];
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of messageCommandFiles) {
	const command = require(`./messageCommands/${file}`);
	client.commands.set(command.data.name, command);
	messageCommands.push(command.data.name);
}

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	client.commands.set(command.data.name, command);
}



//prints message to console once the client is ready
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('https://git.io/JEiRH');

});


//triggers message commands whenever a new message is created, which contains the command string as a word
client.on('messageCreate', async message => {
	//checks if message was written by a bot
	if (message.author.bot) return;

	//logs message if it was a DM, then replies with "hmmm" gif.
	if (message.channel.type === "DM") {
		console.log(`${message.createdAt}: ${message.author.username}: ${message.content}`);
		message.channel.send('https://tenor.com/bfLrv.gif');
		return;
	}

	const words = message.content.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "").split(" ");
	words.forEach(word => {
		
		const command = client.commands.get(word);

		if (!command || !messageCommands.includes(command.data.name)) return;

		try {
			command.execute(message);
		} catch (error) {
			console.error(error);
			message.reply({ content: 'There was an error while executing this command!'});
		}
	});
});


//triggers whenever a slash command is executed
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	try {
		const command = client.commands.get(interaction.commandName);
		await command.execute(interaction);

	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


//logs in the client
client.login(token);
