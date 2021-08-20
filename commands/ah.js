const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ah')
		.setDescription('Sends gif of Geralt saying "ah"'),
	async execute(message) {
		await message.reply('https://tenor.com/boItO.gif');
	},
};