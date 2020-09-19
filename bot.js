const { Handler } = require('commander-core');
const { VK } = require('vk-io');
const { format } = require('fecha')
 
const TOKEN = process.env.TOKEN
const GROUP_ID = process.env.GROUP_ID
const vk = new VK({token: TOKEN})

const reg = require("./commands/reg/reg.json");
 
const params = {
    getDateTime() {
        return format(new Date(), 'D.MM.YY H:mm:ss')
    }
}
 
const developerId = process.env.developerId;
 
const handler = new Handler({
    commandsDirectory: './commands',
    logsDirectory: './logs',
    developerId,
    ...params
});
 
handler.listener.on('command_error', async(context, bot, error) =>{
    context.send(`Произошла непредвиденная ошибка`)
    if(bot.developerId) {
        vk.api.messages.send({
            user_ids: bot.developerId,
            message: `Ошибка в команде ${bot.command.name}:
                ${context.senderId} => ${context.command}
                ${error.stack}`
        })
    }
});
 
handler.listener.on('command_not_found', async(context, bot) =>{
    if(!context.isChat) {
        context.send(
            `❗ Введенной вами команды не существует!
            🎒 Чтобы узнать список команд введите "Помощь"`
        )
    } 
});
 
vk.updates.on('message', async(context, next)=>{
    if(context.isGroup) return;
 
    context.text = context.text.replace(/^\[club(\d+)\|(.*)\]/i, '').trim();
 
    await handler.execute(context);
})

vk.updates.on('chat_invite_user', async(context)=>{
	if(context.eventMemberId === -process.env.GROUP_ID){
		reg.conf[ctx.chatId] = ctx.chatId;
	} 
});

vk.updates.start()
.then(x=>{
    console.log('Старт')
})