const Event = require("./Event.js");
const { Client } = require("tmi.js");

module.exports = class HostedEvent extends Event {
    /**
     * @param {Client} bot 
     * @param {String} channel 
     * @param {String} username 
     * @param {Number} viewers 
     * @param {Boolean} autohost 
     * @returns 
     */
    async run(bot, channel, username, viewers, autohost) {
        const config = this.getConfig();
        if (!config.triggerOnAutohost && autohost)
            return;
        this.getSocket().emit("alert", { 
            image: config.image, 
            text: config.alertText.replace("{username}", username).replace("{viewers}", viewers), 
            audio: config.audio 
        });
        await bot.say(channel, config.chatText.replace("{username}", username).replace("{viewers}", viewers));
    }
}