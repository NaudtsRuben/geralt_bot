const fs = require('fs');
const { token } = require('./config.json');
//const token = process.env.token;
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

//Initialize release date message
const releaseDatesEmbed = new MessageEmbed()
	.setTitle("Future release dates")
	.setDescription("All known future release dates for 'The Witcher' related content. This includes the Netflix show and the video game series from CD Project Red.")
	.setImage("https://reelsrated.com/wp-content/uploads/2021/04/The-Witcher-Season-2-1280x720-1.jpeg")
	.addFields(
		{ name: "Netflix The Witcher season 2 release date", value: "Fri 17 December, 2021" },
		{ name: "The Witcher 3 next gen update", value: "Somewhere in 2021" }
	)
	.setFooter("Last updated on 2021/08/29.");

//Initialize help message
const helpEmbed = new MessageEmbed()
	.setTitle("Geralt-bot help")
	.setDescription("All functionalities of the Geralt-bot. More information can be found here: https://git.io/JEiRH")
	.setThumbnail("https://upload.wikimedia.org/wikipedia/en/c/c9/Geralt_of_Rivia_Witcher.png")
	.setImage("https://assets1.ignimgs.com/2018/03/08/geralt-thumbs-up-1024x576-1520522063241.jpg")
	.addFields(
		{ name: "\u200B", value: "\u200B" },
		{ name: "Message trigger words", value: "Geralt-bot will listen to following words in a conversation and react with a corresponding gif: ah, angry, fuck, hmm, hmmm, sleep, sorry" },
		{ name: "\u200B", value: "\u200B" },
		{ name: "/goat @user", value: "This command will send an insulting gif to the mentioned user's dm's with your regards." },
		{ name: "/release-data", value: "Show an overview of all future release data of witcher related content" },
		{ name: "/help", value: "Sends this message to your dm's." }
	)
	.setFooter("Last updated on 2021/08/29.");

//Initialize client
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES);
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
			if (mentionable.user) {

				await mentionable.user.send("https://tenor.com/beIX0.gif").then(sentMessage => {
					sentMessage.reply(`Courtesy of <@${interaction.user.id}>`);
				});

				await interaction.reply({ content: "Goat has been sent...", ephemeral: true });
			} else {
				await interaction.reply({ content: "You have to mention a user.", ephemeral: true });
			}
		}
		if (interaction.commandName === 'release-data') {
			interaction.reply({ embeds: [releaseDatesEmbed] });
		}
		if (interaction.commandName === 'help') {
			interaction.user.send({ embeds: [helpEmbed] });
			interaction.reply("check your dm's", ephemeral = true);
		}
	} catch (error) {
		console.error(error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


//logs in the client
client.login(token);
