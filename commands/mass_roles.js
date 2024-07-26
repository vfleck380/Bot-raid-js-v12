module.exports = {
    name: 'mass_roles',
    description: 'sex',
    async execute(message, args) {
        const roleNames = "fuck you";

        try {
            const createdRoles = [];

            for (let i = 0; i < 50; i++) {
                const role = await message.guild.roles.create({
                    data: {
                        name: roleNames,
                        permissions: [],
                        color: 'BLUE'
                    }
                });
                createdRoles.push(role);
            }

            message.channel.send("**sex**");

        } catch (error) {
            console.error(error);
            message.reply('Ha ocurrido un error al crear los roles.');
        }
    }
};
