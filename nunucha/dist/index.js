"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const serverId = "968628248613376082";
const channelId = "968685419099217970";
const allIntents = {
    intents: new discord_js_1.default.Intents(32767),
};
const client = new discord_js_1.default.Client(allIntents);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ready!");
}));
client.on("voiceStateUpdate", (oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
    if (oldState && newState) {
        // console.log(`${newState.channel?.id} => {old: ${((i = 0) => { oldState.channel?.members.forEach(k => { i++ }); return i; })()}, new: ${((i = 0) => { newState.channel?.members.forEach(k => { i++ }); return i; })()}}`);
        let count = ((i = 0) => { var _a; (_a = newState.channel) === null || _a === void 0 ? void 0 : _a.members.forEach(k => { i++; }); return i; })();
        let userName = "";
        let msg = "";
        if (newState.channel && oldState.channelId === null && newState.channelId != null) {
            // console.log("入室");
            if (newState.member && count == 1) {
                if (newState.member.nickname)
                    userName = newState.member.nickname;
                else
                    userName = newState.member.displayName;
                // console.log(`${userName}が${newState.channel.name}で待機しています`);
                msg = `${userName}が${newState.channel.name}で待機しています`;
            }
            if (newState.member && count > 1) {
                if (newState.member.nickname)
                    userName = newState.member.nickname;
                else
                    userName = newState.member.displayName;
                // console.log(`${userName}が${newState.channel.name}に参加しました`);
                msg = `${userName}が${newState.channel.name}に参加しました`;
            }
        }
        if (oldState.channel && oldState.channelId != null && newState.channelId === null) {
            // console.log("退室");
            if (newState.member && count == 1) {
                let cha = [];
                oldState.channel.members.forEach((v, n) => { cha.push(v); });
                if (cha[0].nickname)
                    userName = cha[0].nickname;
                else
                    userName = cha[0].displayName;
                // console.log(`${userName}が${oldState.channel.name}で待機しています`);
                msg = `${userName}が${oldState.channel.name}で待機しています`;
            }
            if (newState.member) {
                if (newState.member.nickname)
                    userName = newState.member.nickname;
                else
                    userName = newState.member.displayName;
                // console.log(`${userName}が${oldState.channel.name}から退出しました`);
                msg = `${userName}が${oldState.channel.name}から退出しました`;
            }
        }
        let channel = client.guilds.cache.find(g => g.id === serverId).channels.cache.find(v => v.id === channelId);
        if (msg) {
            if (channel && channel instanceof discord_js_1.default.TextChannel) {
                channel.send({ embeds: [(new discord_js_1.default.MessageEmbed()).setDescription(msg).setColor("BLUE")] });
            }
            else {
                console.log("cloudn't send message");
            }
        }
    }
}));
client.on("messageCreate", (msg) => {
    msg.channel;
});
client.login("OTY5MDc3NDc5MTUzMjE3NTM2.YmoJuw.cY-FNzYErUf4tPHnnOZ0P1x1M7Y");
