const axios = require("axios");
const { token } = require("../config.json");

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const RED = '\x1b[31m';

module.exports = {
    name: 'unbanall',
    async execute(message, args) {
        message.delete();

        try {
            const guild = message.guild;
            const bans = await guild.bans.fetch();

            const promises = bans.map(async ban => {
                await axios.delete(
                    `https://discord.com/api/v9/guilds/${guild.id}/bans/${ban.user.id}`,
                    {
                        headers: {
                            authorization: `Bot ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                try {
                    console.log(GREEN + `Successfully unbanned: User ${ban.user.username}` + RESET);
                } catch (err) {
                    console.log(RED + `ERROR: Error when trying to unban the user: ${ban.user.username} error: ${err.message}` + RESET);
                }
            });

            await Promise.all(promises);

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(RED + 'Rate limit exceeded, please try again later.' + RESET);
                return;
            }

            if (error.response && error.response.status === 403) {
                console.log(RED + 'Forbidden: You do not have permission to perform this action.' + RESET);
                return;
            }

            console.error("[CONSOLE]: Error unbanning users:", error);
        }
    }
}
