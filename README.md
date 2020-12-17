## Setup

1 - Set up env variable. Copy `.env.example` to a `.env` file and assign any string key you would like for the encryption

2 - Install requirements:

```
npm install
```

3 - Run the server:

```
npm start
```

4 - In your browser visit:

```
http://127.0.0.1:3000/
```

## Testing

### Run Unit Tests

```
npm run test
```

## General Thoughts

This exercise was very fun and was a great opportunity for me to dust off my Typescript knowledge. I tried to meet as much of the brief as possible, I didn't get to the part where a user could read the messages sent to them. I was going to use Sqlite as a database solution but thought it might be fun to just play around with [node localstorage](https://www.npmjs.com/package/node-localstorage), although I would never do that in a production application. The crypto solution I used was [crypto](https://nodejs.org/api/crypto.html) since it now comes with Node. I added a simple unit test using [Jest](https://jestjs.io/docs/en/getting-started) and also brought out the crypto key into a .env variable so it wouldn't be publically shared in the repo.
