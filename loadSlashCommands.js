const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { prodToken } = require('./config.json');
const fs = require('fs');

const clientId = '875728074979827824';
const testClientId = '876761713968558120'
const guildId = '755107000882429963';

const commands = [];
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(prodToken);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			//Routes.applicationGuildCommands(testClientId, guildId),
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


//NOTE TO SELF: CHECK TOKEN IF 20012:"YOU ARE NOT AUTHORIZED TO PERFORM THIS ACTION ON THIS APPLICATION"-ERROR