const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');
const fs = require('fs');

const choices = [];
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const commandName = file.slice(0, -3);
	if (commandName != "command-permissions") {
		choices.push([commandName, commandName]);
	}
}



module.exports = {
	data: new SlashCommandBuilder()
		.setName('command-permissions')
		.setDescription("Edits permissions of other commands.")
		.addStringOption(option => option
			.setName('command')
			.setDescription("name of the command")
			.addChoices(
				choices
			)
			.setRequired(true)
		)
		.addMentionableOption(option => option
			.setName('role-or-user')
			.setDescription('Mention a role or user')
			.setRequired(true)
		)
	,
	async execute(interaction) {
		/*
		const commandString = interaction.options.getString("command");
		const command = interaction.client.commands.get(commandString);
		const commandId = interaction.client.application.commands.resolveId(command);
		//const command = interaction.client.commands.get(commandString);

		console.log(interaction.client.application.commands);

		if (!command) {
			interaction.reply("The chosen command was not found.");
			return;
		}


		const mentionable = interaction.options.getMentionable("role-or-user");

		

		if (mentionable.user) {

			const formBody = {
				fullPermissions: [
					{
						id: commandId,
						permissions: [
							{
								id: mentionable.user.id,
								type: "USER",
								permission: false,
							}],
					},
				]
			}
	
			console.log(formBody);

			interaction.guild.commands.permissions.set(formBody)
				.then(console.log)
				.catch(console.error);

		}
		*/
		interaction.reply("euhhh, test?");
	},
};