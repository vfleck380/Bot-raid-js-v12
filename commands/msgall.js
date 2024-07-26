const config = require("../config.json")

const SpamDm = config.SpamDm

module.exports = {
  name: 'spamdm',
  description: 'Spam all dm',
  execute(message, args) {

    message.delete()

    process.title = `Spam al dm executed | Bot raid created by Mendry`


 try{

    for(let i = 0; i <= 15; i++){

    message.guild.members.cache.forEach(member => member.send(SpamDm).then( () => {
      console.log(`[CONSOLE]: El miembro ${member.user.username} se le mando DM correctamente`)
    }))
    }
 } catch(err){
  console.log(`[ERROR]: No se le pudo mandar mensaje a ${member.user.username}. Error ${err}`)
 }

  }
};