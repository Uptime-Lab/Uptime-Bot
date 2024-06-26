import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ChannelType,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    TextChannel
} from 'discord.js';
import { Config } from '../../../../Modal/Config.js';
import { messageLinkRow, newTicketRow } from '../../buttons.js';
import { sendEmbed } from '../../embeds.js';

/**
 * Send Support message to channel 
 * @param interaction sorce command interaction
 * @param targetChannel target channel for the message to be sent
 */
export async function send(interaction: ChatInputCommandInteraction, targetChannel?: TextChannel): Promise<void> {
    if (!interaction.inGuild()) return;
    const { channel, guildId } = interaction;
    const neededPerms = PermissionFlagsBits.ManageThreads | PermissionFlagsBits.SendMessages | PermissionFlagsBits.SendMessagesInThreads;
    const guildConfig = await Config.findOne({ guildId });
    
    if(!guildConfig?.support.roleId){
        await interaction.reply({
            content: `Please set Role using </config support role:${interaction.client.application.commands.cache.find((ac) => ac.type == ApplicationCommandType.ChatInput && ac.name == 'config')?.id}>`,
            ephemeral: true
        });
        return; 
    }
    
    if (!targetChannel && channel?.type == ChannelType.GuildText) 
        targetChannel = channel;
    
    else if (channel?.type != ChannelType.GuildText){
        await interaction.reply({
            content: `${channel} Is not a Text Channel. Plesse us Command in a Text Channel`,
            ephemeral: true
        });
        return; 
    }

    if (!targetChannel)
        throw new Error('Channel undefined');
    
    if (!targetChannel.permissionsFor(targetChannel.guild.members.me!).has(neededPerms, true)) {
        await interaction.reply({
            content: `${interaction.client.user} is missing one or more of the following premisions in this channel: \`SendMessages\`, \`SendMessagesInThreads\`, \`ManageThreads\``,
            ephemeral: true
        });
        return;
    }
    
    const message = await targetChannel.send({
        embeds: [sendEmbed(guildConfig)],
        components: [newTicketRow(guildConfig.support.emoji)]
    });

    let row: ActionRowBuilder<ButtonBuilder>[] = [];
    if (targetChannel != interaction.channel)
        row = [messageLinkRow(message)];

    await interaction.reply({
        content: 'Support message successfully sent',
        components: row,
        ephemeral: true
    });
}
