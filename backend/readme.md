# Getting Start

return back to main directory to run this application.

OR 

```bash
cd ../
yarn install
ntl dev -o
```

## Working Use Cases

```js
/**
 * GET endpoint - getMessage
 *
 * Return all messages between Bot and user
 * from local file.
 *
 * @returns {Promise<HandlerResponse>} 
 */
const getMessage = async () => {
   // do something here
}
```

```js
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
const updateMessage = async (event) => {
   // do something here
}
```
