const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disable-channel')
		.setDescription('Disables the bot for the current channel')
};