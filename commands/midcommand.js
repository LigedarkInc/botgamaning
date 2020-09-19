const { Command } = require('commander-core');

module.exports = new Command({
	pattern: /^(?:cid)/i,
	name: 'cid',
	description: 'Узнать ид чата',
	params: {
		commandType: 'cid'
	},
	handler(ctx, bot) {
		ctx.reply(`ID Чата:` + ctx.chatId);
    }
})
