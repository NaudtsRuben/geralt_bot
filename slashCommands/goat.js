const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goat')
		.setDescription("Sends a gif of geralt asking whether someone's mother fucked a goat to the mentioned user's dm's")
        .addMentionableOption(option => option
            .setName('mentionable')
            .setDescription('Mention someone')
            .setRequired(true)
        )
};