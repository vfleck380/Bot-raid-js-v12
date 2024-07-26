module.exports = {
    name: 'delete_emojos',
    async execute(message, args) {
        
        const guild = message.guild;
        const emojis = guild.emojis.cache;

        
        const promises = emojis.map(emoji => emoji.delete());

        
        await Promise.all(promises);
    }
}
