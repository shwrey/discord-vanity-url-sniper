const { token, guild_id, vanity_url } = require('./config');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.on('guildUpdate', async (old_guild, new_guild) => {
    if (old_guild.vanityURLCode === vanity_url && new_guild.vanityURLCode !== vanity_url) {
        try {
            const response = await axios.patch(`https://discord.com/api/v9/guilds/${guild_id}/vanity-url`, {
                code: `${vanity_url}`
            }, {
                headers: {
                    "Authorization": `Bot ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                process.exit();
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        return;
    }
});

bot.login(token).catch(e => console.log(e));
process.on('unhandledRejection', (e) => console.log(e));