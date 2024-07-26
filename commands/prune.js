module.exports = {
    name: 'prune',
    description: 'sex',
    async execute(message, args) {
        if (!message.guild) return message.reply('Este comand solo se usa en svs');

        try {
            const days = 1;
            const pruned = await message.guild.members.prune({ days, dry: false });
            message.reply(`Prune totalmente hecho.`);
        } catch (error) {
            console.error(`No se pudo realizar el prune: ${error}`);
            message.reply('Hubo un error al intentar prunear los miembros.');
        }
    }
};
