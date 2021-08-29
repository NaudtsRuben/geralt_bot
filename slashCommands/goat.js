const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goat')
		.setDescription("Sends an insulting gif to the mentioned user's dm's. Followed by your ID.")
        .addMentionableOption(option => option
            .setName('mentionable')
            .setDescription('Mention someone')
            .setRequired(true)
        ),
        async execute(interaction) {
            const mentionable = interaction.options.getMentionable('mentionable');
			if (mentionable.user) {

				await mentionable.user.send("https://tenor.com/beIX0.gif").then(sentMessage => {
					sentMessage.reply(`Courtesy of <@${interaction.user.id}>`);
				});

				await interaction.reply({ content: "Goat has been sent...", ephemeral: true });
			} else {
				await interaction.reply({ content: "You have to mention a user.", ephemeral: true });
			}
        },
};