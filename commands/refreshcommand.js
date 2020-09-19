const { Command } = require('commander-core');
const reg = require("./reg/reg.json");

module.exports = new Command({
	pattern: /^refresh/i,
	name: 'refresh',
	description: 'Обновление беседы',
	params: {
		commandType: 'refresh'
	},
	handler(ctx, bot) {
		let cI = Number(ctx.chatId)
		if(!reg.conf[cI]){
			reg.conf[cI] = {
				cId: cI,
			};
			ctx.send(`Данные обновлены!`);
			}
		}
})