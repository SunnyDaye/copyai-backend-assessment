const app = require('./app');
const { PORT } = process.env;

const listener = () => {
    console.log(`Listening on port ${PORT}...`);
}

app.listen(PORT,listener);