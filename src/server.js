const app = require('./app');
const { PORT,ASSESSMENT_API_URL } = process.env;

const listener = () => {
    console.log(`Listening on port ${PORT}...`);
}

app.listen(PORT,listener);