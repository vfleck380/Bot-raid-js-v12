module.exports = {
    name: 'leave',
    async execute(message, args) {
        
        await message.guild.leave();
    }
}
