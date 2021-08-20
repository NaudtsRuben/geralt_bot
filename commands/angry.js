const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('angry')
		.setDescription('Sends gif of Geralt saying "angry hmmm"'),
	async execute(message) {
		await message.reply('https://tenor.com/bfF44.gif');
	},
};