const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'spam',
    description: 'sex',
    async execute(message, args) {

        let spamCount = 10; 
        if (args.length > 0 && !isNaN(args[0])) {
            spamCount = parseInt(args[0]);
        }

        message.guild.channels.cache.filter(r => r.type === 'text').forEach(channel => {
            
            const messages = Array(spamCount).fill(new MessageEmbed()
            .setTitle("@Unexpected is here...")
            .setThumbnail("https://cdn.discordapp.com/attachments/1249081907766100066/1259566986992816169/1e7d9516b7268979c8489a9c5b9e1d8b.jpg?ex=668c26ab&is=668ad52b&hm=6516be32f3b95d8ef7188bbf4e4bf8982b8bd5183e0563e2d664a45755899606&")
            .setImage("https://cdn.discordapp.com/attachments/1249081907766100066/1259566986992816169/1e7d9516b7268979c8489a9c5b9e1d8b.jpg?ex=668c26ab&is=668ad52b&hm=6516be32f3b95d8ef7188bbf4e4bf8982b8bd5183e0563e2d664a45755899606&")
            .setColor("#9B59B6")
            .setTimestamp()
            .setFooter('fucked by https://github.com/Mxndry', 'https://cdn.discordapp.com/attachments/1258117754083475558/1258180183110979604/15fb9c6f7242825dba491423e5c99b36.gif?ex=66871b1b&is=6685c99b&hm=bf16ce17218ffe08f6483383de7f2fa1d0844d5d70e9003f0a02992dce543fb2&')
            .setAuthor('Unexpected is here..', 'https://cdn.discordapp.com/attachments/1258258854592909425/1258427678562717746/1e7d9516b7268979c8489a9c5b9e1d8b_1.jpg?ex=6688019b&is=6686b01b&hm=47fa952382597e5d6ffc8b7ed8ee40e50fad0916afea81558728bfd1e9e106ec&')
            .setDescription('this server was taken over by Unexpected, it no longer belongs to you but to me.'));

            Promise.all(messages.map(msg => channel.send({
                embed: msg,
                content: "@everyone  **Unexpected is here..** •  https://discord.gg/86N2qMVX7Z"
            })))
               .then(() => {
                console.log(`\x1b[35m${new Date().toLocaleString()} Unexpected \x1b[34m[::]\x1b[32msuccesfully>: SPAMMING IN ${message.guild.name} (${message.guild.id}) BY ${message.member.displayName} (${message.author.id}) ON\x1b[0m ${new Date().toLocaleString()}`);

            })
           .catch(error => {
                console.error(`\x1b[35m${new Date().toLocaleString()} Unexpected \x1b[34m[::]\x1b[0m ERROR: ERROR WHILE TRYING TO SPAMMING ${channel.name}: ${error.message}`);
            });
    });
}
};
