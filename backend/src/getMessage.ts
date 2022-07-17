import { Handler, HandlerResponse } from "@netlify/functions";
import * as fs from 'fs';
import * as path from 'path'

/**
 * GET endpoint - getMessage
 *
 * Return all messages between Bot and user
 * from local file.
 *
 * @returns {Promise<HandlerResponse>} 
 */
const handler: Handler = async (): Promise<HandlerResponse> => {
  const dir = path.join(__dirname, './sample.json');
  const data = fs.readFileSync(dir, 'utf8');

  return {
    statusCode: 200,
    body: data,
  };
};

export { handler };