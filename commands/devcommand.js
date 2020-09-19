const { Command } = require('commander-core');

module.exports = new Command({
	pattern: /^(?:zz|eval|dev|system code)\s([^]+)$/i,
	name: 'zz|eval|dev|system code',
	description: 'Выполнение кода',
	params: {
		commandType: 'zz|eval|dev|system code'
	},
	handler(ctx, bot) {
		try {
		const result = eval(ctx.$match);

		if(typeof(result) === 'string')
		{
			return ctx.send(`string: ${result}`);
		} else if(typeof(result) === 'number')
		{
			return ctx.send(`number: ${result}`);
		} else {
			return ctx.send(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
		}
	} catch (e) {
		console.error(e);
		return ctx.send(`Oшибка:
		${e.toString()}`);
	}
		}
})