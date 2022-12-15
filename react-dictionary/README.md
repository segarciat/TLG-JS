# React Dictionary

Learn definitions of words you type in!

## Setting up the frontend

Assuming you've installed NodeJS, start by installing dependencies for the client:

```
cd client
npm install
```

Then, create a file `.env.local` with your backend API's URL in it:

```
touch .env.local
echo REACT_APP_WORD_API_URL=/api/words > .env.local
```

Here my URL is simply `api/words`. A file called `.env.local.example` exists with an example; if you want, just rename that to `.env.local` and put your API's URL there.

Next, start the application in development mode:

```
npm start
```

## Setting up the backend

Assuming you're still in the `client` folder:

```
cd ../server
npm install
```

Create an `.env` file with your API key in it. I used Merrian-Webster's API, and you can get an API key at [Merrian-Webster's Development Center](https://dictionaryapi.com/):

```
touch .env
# assuming you are using the same API as I did.
echo WORDS_API_URL=https://www.dictionaryapi.com/api/v3/references/sd4/json > .env
echo WORDS_API_KEY=YOUR_API_KEY >> .env
```

Feel free to use the `.env.local.example` for reference, or just rename it to `.env.local` and fill in the values.

Finally, start your application:

```
# Development mode
npm run dev
```
