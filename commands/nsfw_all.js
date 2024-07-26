module.exports = {
    name: 'nsfw_all',
    description: 'sex',
    async execute(message, args) {
        const channels = message.guild.channels.cache.filter(channel => channel.type === 'text');
        
        channels.forEach(async channel => {
            try {
                await channel.edit({ nsfw: true });
                console.log(`NSFW activado en ${channel.name}`);
            } catch (error) {
                console.error(`No se pudo activar NSFW en ${channel.name}: ${error}`);
            }
        });

        message.reply('NSFW ha sido activado en todos los canales de texto.');
    }
};
