module.exports = {
    name: 'server_lockdown',
    description: 'Lock down all text channels in the server.',
    async execute(message, args) {
        
        await message.channel.send('Iniciando lockdown en todos los canales...');

        
        const channels = message.guild.channels.cache.filter(channel => channel.type === 'text');

        for (const channel of channels.values()) {
            try {
                
                await channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
                console.log(`lockeado el canal ${channel.name}`);
            } catch (error) {
                console.error(`Error al lockear el canal ${channel.name}: ${error}`);
            }
        }

        
        await message.channel.send('Todos los canales han sido lockeados.');
    }
};
