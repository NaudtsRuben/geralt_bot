const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goat')
		.setDescription("Sends an insulting gif to the mentioned user's dm's. Followed by your ID.")
        .addMentionableOption(option => option
            .setName('mentionable')
            .setDescription('Mention someone')
            .setRequired(true)
        )
};