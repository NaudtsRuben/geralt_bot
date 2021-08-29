const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

//Initialize release date message
const releaseDatesEmbed = new MessageEmbed()
	.setTitle("Future release dates")
	.setDescription("All known future release dates for 'The Witcher' related content. This includes the Netflix show and the video game series from CD Project Red.")
	.setImage("https://reelsrated.com/wp-content/uploads/2021/04/The-Witcher-Season-2-1280x720-1.jpeg")
	.addFields(
		{ name: "Netflix The Witcher season 2 release date", value: "Fri 17 December, 2021" },
		{ name: "The Witcher 3 next gen update", value: "Somewhere in 2021" }
	)
	.setFooter("Last updated on 2021/08/29.");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('release-data')
		.setDescription("Shows future release dates of most 'the witcher' related stuff."),
		async execute(interaction){
			interaction.reply({ embeds: [releaseDatesEmbed] });
		}
};