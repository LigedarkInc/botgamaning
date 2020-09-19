const { Command } = require('commander-core');
const reg = require("./reg/reg.json");

module.exports = new Command({
	pattern: /^(?:all)\s?([^]+)?/i,
	name: 'all',
	description: 'Рассылка по всем доступным чатам',
	params: {
		commandType: 'all'
	},
	handler(ctx, bot) {
		for(i in reg.conf){
		bot.call('messages.send', {
			chat_id: reg.conf[i],
			random_id: 0,
			message: `📢 ${ctx.$match[1]}`
		});
	}
		ctx.send(`Сообщения отправлены!`);
	}
})