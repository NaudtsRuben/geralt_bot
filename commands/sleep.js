const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleep')
		.setDescription('Sends gif of Geralt saying "I CANT FUCKING SLEEP"'),
	async execute(message) {
		await message.reply('https://tenor.com/beTwe.gif');
	},
};