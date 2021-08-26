const fs = require('fs');
//const { token } = require('./config.json');
const token = process.env.token;
const { Client, Intents, Collection} = require('discord.js');
const fetch = require('node-fetch');


//Initialize client
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({ intents: myIntents });


//Initialize all message commands
client.commands = new Collection();
const messageCommandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));

for (const file of messageCommandFiles) {
	const command = require(`./messageCommands/${file}`);
	client.commands.set(command.data.name, command);
}



//prints message to console once the client is ready
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


//triggers message commands whenever a new message is created, which contains the command string as a word
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


//triggers whenever a slash command is executed
client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	try {
		if (interaction.commandName === 'goat') {
			const mentionable = interaction.options.getMentionable('mentionable');
			console.log(mentionable);
			if(mentionable.user){
				await mentionable.user.send("https://tenor.com/beIX0.gif");
				await interaction.reply({content: "Goat has been sent...", ephemeral: true});
			}else{
				await interaction.reply({content: "You have to mention a user.", ephemeral: true});
			}
		}
	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


//logs in the client
client.login(token);