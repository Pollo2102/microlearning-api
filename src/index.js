const express = require('express');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3120);

app.use(express.json());
app.use(cors());

app.use(require('./routes/users'));

app.get('/', (req, res) => {
    res.send('Microlearning API');
});

app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}`);
})