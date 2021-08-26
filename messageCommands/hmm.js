const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hmm')
		.setDescription('Sends gif of Geralt saying "hmm"'),
	async execute(message) {
		await message.reply('https://tenor.com/bfLrw.gif');
	},
};