const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

//Initialize help message
const helpEmbed = new MessageEmbed()
	.setTitle("Geralt-bot help")
	.setDescription("All functionalities of the Geralt-bot. More information can be found here: https://git.io/JEiRH")
	.setThumbnail("https://upload.wikimedia.org/wikipedia/en/c/c9/Geralt_of_Rivia_Witcher.png")
	.setImage("https://assets1.ignimgs.com/2018/03/08/geralt-thumbs-up-1024x576-1520522063241.jpg")
	.addFields(
		{ name: "\u200B", value: "\u200B" },
		{ name: "Message trigger words", value: "Geralt-bot will listen to following words in a conversation and react with a corresponding gif: ah, angry, fuck, hmm, hmmm, sleep, sorry" },
		{ name: "\u200B", value: "\u200B" },
		{ name: "/goat @user", value: "This command will send an insulting gif to the mentioned user's dm's with your regards." },
		{ name: "/release-data", value: "Show an overview of all future release data of witcher related content" },
		{ name: "/help", value: "Sends this message to your dm's." }
	)
	.setFooter("Last updated on 2021/08/29.");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Shows an overview of the bot's funcionalities"),
	async execute(interaction) {
		interaction.user.send({ embeds: [helpEmbed] });
		interaction.reply({ content: "check your dm's", ephemeral: true });
	}
};