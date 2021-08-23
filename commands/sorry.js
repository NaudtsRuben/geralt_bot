const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sorry')
		.setDescription('Sends gif of Geralt saying "sorry"'),
	async execute(message) {
		await message.reply('https://tenor.com/bwKbb.gif');
	},
};