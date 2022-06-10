# Twitch Chatbot and Alerts
A web panel and bot for having a free and customisable Twitch Channel Alerts system

## Installation and Setup
- Download or Git Clone this repository
    - Git
        - Download and Install [git](https://git-scm.com/downloads) if you have not already
        - Open your terminal or command prompt and run `git clone https://github.com/DeathHound6/twitch-alerts.git`
    - Download
        - Download and Install a file compressor (such as [7-ZIP for Windows](https://www.7-zip.org/)) if you have not already
        - Visit `https://github.com/DeathHound6/twitch-alerts` in your browser
        - Click on the green "Code" button
        - Click "Download ZIP"
        - Extract the files from the downloaded ZIP file
- In your terminal, move into the downloaded folder (`cd twitch-alerts`)
- Install [Node.JS](https://nodejs.org/en/) if you have not already (Version 14 or above is required to run this software)
- Rename the `.env.example` file to `.env` and add the missing value
- Run the command `npm i` or `npm install` in your terminal
- Run the command `node .` or `npm start` in your terminal
- Visit `http://localhost:8888/config` in your browser and alter anything you want (make sure to save)
- In your OBS or streaming software, add a new browser source with one of the following links you want to use
    - `http://localhost:8888/alerts` - Popup alerts on stream

That's it up and running!

### Updating
- Download git, as stated above
- Use the `cd` command in your terminal to move into the software folder
- Run the command `git pull` in your terminal
- Make sure to stop running any previous node commands (close it's terminal or use `ctrl + C` on your keyboard)
- Run `npm i` and `node .` again

### Notes
- Due to the way the Twitch API is, follow events cannot be received by this software.