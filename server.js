// This is moved in a separate file so we can run supertest. Supertest won't work if the server is running.
const app = require('./app');

app.listen(3000, () => {
    console.log('Sever starting on port 3000');
});