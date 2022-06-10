require("dotenv").config({ path: `${__dirname}/.env` });
const express = require("express");
const { writeFileSync } = require("fs");
const { Client } = require("tmi.js");
const { Server } = require("socket.io");
//const axios = require("axios").default;

const app = express();
const io = new Server(8889, {
    path: "/",
    serveClient: true,
    connectTimeout: 30000,
    transports: ["websocket"]
});
let config = require("./config.json");
const bot = Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.username,
        password: process.env.TWITCH_TOKEN
    },
    channels: [config.username]
});

bot.connect().catch(() => { console.error("Bot failed to connect to Twitch"); });
app.listen(8888, "localhost", () => {
    console.log(`[RUNNING] Express server listening at http://localhost:8888`);
});
app.use("/public", express.static("public"));

io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} has connected from ${socket.handshake.address.replace("::ffff:", "")}`);
    socket.on("disconnect", (reason) => {
        console.log(`Socket ${socket.id} has been disconnected: ${reason}`);
    });
    socket.on("request-config", () => {
        console.log(`Socket ${socket.id} requested config file`);
        socket.emit("retrieve-config", config);
    });
    socket.on("request-set-config", (conf) => {
        console.log(`Socket ${socket.id} requested to update config file`);
        writeFileSync(`${__dirname}/config.json`, JSON.stringify(conf, null, 4));
        socket.emit("set-config", require("./config.json") == config);
    });
});
exports.Socket = io;

bot.on("connected", async(address, port) => {
    console.log(`[RUNNING] Connected to ${address}:${port}`);
});
bot.on("disconnected", async(reason) => {
    console.log(`[STOPPED] Disconnected from Twitch: ${reason}`);
});
for (const [key, conf] of Object.entries(config.events)) {
    try {
        if (conf.enabled) {
            const event = new (require(`${__dirname}/events/${key}.js`))();
            bot.on(key, async(...args) => await event.run(bot, ...args));
        }
    } catch {}
}

app.get("/config", async(req, res) => {
    res.status(200).sendFile(`${__dirname}/pages/config.html`);
});
app.get("/alerts", async(req, res) => {
    res.status(200).sendFile(`${__dirname}/pages/alerts.html`);
});
