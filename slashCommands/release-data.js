const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('release-data')
		.setDescription("Shows release dates of most 'the witcher' related stuff.")
};