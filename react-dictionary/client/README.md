# React Dictionary

Learn definitions of words you type in!

## Running the Application

Assuming you have NodeJS installed, install the application like so:

```
npm install
```

Then, create a file `.env.local` with your API key in it:

```
touch .env.local
echo REACT_APP_API_KEY=YOUR_API_KEY > .env.local
```

A file called `.env.local.example` exists with an example; just rename that to `.env.local` and put
your key there instead, if you wish.

You can get an API key at [Merrian-Webster's Development Center](https://dictionaryapi.com/).

Next, start the application in development mode

```
npm start
```
