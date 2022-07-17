import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from "uuid";

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "Sorry if my answers are not relevant. :))",
  "Thank you :))",
  "You're welcome :))",
];

/**
 * POST endpoint - updateMessage
 *
 * Get user's message from request, store it 
 * in local file and reply back in random
 * message.
 *
 * @param {HandlerEvent} event - User's message
 * @returns {Promise<HandlerResponse>} BOT's message
 */
const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const { message }: { message: string } = JSON.parse(event.body!);
  const rslt = BOT_MSGS[random(0, BOT_MSGS.length - 1)];

  const dir = path.join(__dirname, './sample.json');
  const data = fs.readFileSync(dir, 'utf8');
  const arr_obj = JSON.parse(data);
  arr_obj.messages.push({
    from: 1,
    content: message,
    key: 'HumanMessage-' + uuidv4()
  })
  arr_obj.messages.push({
    from: 0,
    content: {
      type: 1,
      text: rslt,
    },
    key: 'BotMessage-' + uuidv4()
  })

  const stream = fs.createWriteStream(dir);
  stream.on('error', console.error);
  stream.write(JSON.stringify(arr_obj));
  stream.end();

  return {
    statusCode: 200,
    body: JSON.stringify(rslt),
  };
};

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
}

export { handler };