import Discord from "discord.js";
const serverId = "hoge";
const channelId = "hoge";
const allIntents: Discord.ClientOptions = {
    intents: new Discord.Intents(),
};
const client = new Discord.Client(allIntents);
client.on("ready", async () => {
    console.log("ready!");
});
client.on("voiceStateUpdate", async (oldState: Discord.VoiceState, newState: Discord.VoiceState) => {
    if (oldState && newState) {
        // console.log(`${newState.channel?.id} => {old: ${((i = 0) => { oldState.channel?.members.forEach(k => { i++ }); return i; })()}, new: ${((i = 0) => { newState.channel?.members.forEach(k => { i++ }); return i; })()}}`);
        let count = ((i = 0) => { newState.channel?.members.forEach(k => { i++ }); return i; })();
        let userName = "";
        let msg = "";
        if (newState.channel && oldState.channelId === null && newState.channelId != null) {
            // console.log("入室");
            if (newState.member && count == 1) {
                if (newState.member.nickname) userName = newState.member.nickname; else userName = newState.member.displayName;
                // console.log(`${userName}が${newState.channel.name}で待機しています`);
                msg = `${userName}が${newState.channel.name}で待機しています`;

            }
            if (newState.member && count > 1) {
                if (newState.member.nickname) userName = newState.member.nickname; else userName = newState.member.displayName;
                // console.log(`${userName}が${newState.channel.name}に参加しました`);
                msg = `${userName}が${newState.channel.name}に参加しました`;
            }
        }
        if (oldState.channel && oldState.channelId != null && newState.channelId === null) {
            // console.log("退室");
            if (newState.member && count == 1) {
                let cha: Discord.GuildMember[] = []
                oldState.channel.members.forEach((v, n) => { cha.push(v) })
                if (cha[0].nickname) userName = cha[0].nickname; else userName = cha[0].displayName;
                // console.log(`${userName}が${oldState.channel.name}で待機しています`);
                msg = `${userName}が${oldState.channel.name}で待機しています`;
            }
            if (newState.member) {
                if (newState.member.nickname) userName = newState.member.nickname; else userName = newState.member.displayName;
                // console.log(`${userName}が${oldState.channel.name}から退出しました`);
                msg = `${userName}が${oldState.channel.name}から退出しました`;
            }
        }
        let channel = client.guilds.cache.find(g => g.id === serverId)!.channels.cache.find(v => v.id === channelId);
        if (msg) {
            if (channel && channel instanceof Discord.TextChannel) {
                channel.send({ embeds: [(new Discord.MessageEmbed()).setDescription(msg).setColor("BLUE")] });
            } else {
                console.log("cloudn't send message");
            }
        }
    }
});
client.on("messageCreate", (msg) => {
    msg.channel
});
//ログインのトークンは省略;
