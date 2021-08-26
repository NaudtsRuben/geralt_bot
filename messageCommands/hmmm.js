const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hmmm')
		.setDescription('Sends gif of Geralt saying "hmmm"'),
	async execute(message) {
		await message.reply('https://tenor.com/beVdP.gif');
	},
};