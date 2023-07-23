import 'dotenv/config'
import express from 'express'
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

app.post('/interactions', async function(req, res) {
    const { type, id, data } = req.body;

    if(type === InteractionType.PING) {
        return res.send({type: InteractionResponseType.PONG});
    }

    if(type === InteractionType.APPLICATION_COMMAND) { 
        const { name } = data;

        if(name === 'test') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'hello world' + getRandomEmoji(),
                },
            });
        }
    }
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});