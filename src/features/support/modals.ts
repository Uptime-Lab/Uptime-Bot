import {
    ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle
} from 'discord.js';

// Subject line input
const subject = new TextInputBuilder()
    .setCustomId('subject')
    .setLabel('subject')
    .setPlaceholder('What can we help you with?')
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(256);

// description input
const body = new TextInputBuilder()
    .setCustomId('body')
    .setLabel('body')
    .setPlaceholder('Describe your question')
    .setRequired(true)
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(512);

// Modal builder for ticket creation
export const createTicket = new ModalBuilder()
    .setCustomId('ticket')
    .setTitle('Create a Ticket')
    .setComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(subject), new ActionRowBuilder<TextInputBuilder>().addComponents(body));

/**
 * Create Modal Builder for updating the support embed
 * @param title placeholder vaule
 * @param description placeholder vaule
 * @returns modal builder 
 */
export function getEmbedModal(title: string, description: string) {
    const titleTextInput = new TextInputBuilder()
        .setCustomId('title')
        .setLabel('Embed Title')
        .setPlaceholder('Title for the support embed')
        .setStyle(TextInputStyle.Short)
        .setValue(title)
        .setMaxLength(256);
    const descriptionTextInput = new TextInputBuilder()
        .setCustomId('description')
        .setLabel('Embed Description')
        .setPlaceholder('Description for the support embed')
        .setStyle(TextInputStyle.Paragraph)
        .setValue(description)
        .setMaxLength(2048);
    
    return new ModalBuilder()
        .setCustomId(`embed`)
        .setTitle('Support Embed Message')
        .setComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(titleTextInput),
            new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionTextInput)
        );
}

