module.exports = class Event {
    constructor() {

    }
    getConfig() {
        return require("../config.json")[__filename.split(".")[0]]
    }
    getSocket() {
        return require("../index.js").Socket;
    }
}