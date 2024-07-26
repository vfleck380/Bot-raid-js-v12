module.exports = {
    name: 'mass_mute',
    description: 'muted',
    async execute(message, args) {
        if (!message.guild) return message.reply('Este comando solo se puede usar en un servidor.');
        
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                    },
                    reason: 'Rol "Muted" creado para mutear a todos los miembros'
                });

                
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.updateOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        CONNECT: false
                    });
                });

                message.channel.send('Rol "Muted" creado y configurado correctamente.');
            } catch (error) {
                console.error(`No se pudo crear el rol "Muted": ${error}`);
                return message.reply('Hubo un error al crear el rol "Muted".');
            }
        }

        
        const members = message.guild.members.cache.filter(member => !member.roles.cache.has(muteRole.id) && !member.user.bot);

        members.forEach(async member => {
            try {
                await member.roles.add(muteRole);
                console.log(`${member.user.tag} ha sido muteado.`);
            } catch (error) {
                console.error(`No se pudo mutear a ${member.user.tag}: ${error}`);
            }
        });

        message.reply('Todos los miembros han sido muteados.');
    }
};
