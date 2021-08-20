const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fuck')
		.setDescription('Sends gif of Geralt saying "fuck"'),
	async execute(message) {
		await message.reply('https://tenor.com/beVZc.gif');
	},
};