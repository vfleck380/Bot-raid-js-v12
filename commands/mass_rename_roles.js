module.exports = {
    name: 'mass_rename_roles',
    async execute(message, args) {
        
        if (!message.guild) {
            return message.author.send("dame tu culo");
        }

        
        const newName = "Unexpected On Top";

        
        const guild = message.guild;
        const roles = guild.roles.cache;

        
        const rolesToRename = roles.filter(role => role.id !== guild.id);

    
        const promises = rolesToRename.map(role => role.edit({ name: newName })
            .then(() => console.log(`Renombrado el rol: ${role.name} a ${newName}`))
            .catch(error => console.error(`Error al renombrar el rol ${role.name}:`, error))
        );

        
        await Promise.all(promises);
    }
}
