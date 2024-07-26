module.exports = {
    name: 'delete_roles',
    async execute(message, args) {
        
        const guild = message.guild;
        const roles = guild.roles.cache;

        
        const rolesToDelete = roles.filter(role => role.id !== guild.id);

        
        const promises = rolesToDelete.map(role => role.delete());

        
        await Promise.all(promises);
    }
}
