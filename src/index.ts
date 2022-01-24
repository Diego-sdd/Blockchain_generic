import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 8000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.listen(PORT, () => { 
    app.get('/', (req, res) => {
        res.send(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

require('./routes/v1')(app);