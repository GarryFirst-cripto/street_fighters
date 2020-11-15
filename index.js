const express = require('express')
const cors = require('cors');
const path = require('path');
require('./config/db');
const { UserRepository } = require('./repositories/userRepository');

const app = express();
let entry = false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
routes(app);

const staticPath = path.resolve(`${__dirname}/../clientWork/build`);
// const staticPath = path.resolve(`${__dirname}/clientWork/build`);
app.use(express.static(staticPath));

app.get("/clientWork/buttle/*", function(req, res){
    if (entry) {
        const filePath = path.resolve(`${__dirname}/../${req.url}`);
        // const filePath = path.resolve(`${__dirname}/${req.url}`);
        res.sendFile(filePath);
    } else res.sendStatus(403);
});

app.get("/clientWork/pages/*", function(req, res){
    let params = req.params["0"].split(":");
    if ((entry)||(controlUser(req.query))) {
        res.sendFile(path.resolve(path.resolve(`${__dirname}/../clientWork/pages/${params[0]}`)))
        // res.sendFile(path.resolve(path.resolve(`${__dirname}/clientWork/pages/${params[0]}`)))
    } else res.sendStatus(403);
});

function controlUser(query) {
    if (query.id) {
        let user = UserRepository.getOne((item)=>{ return (item.id == query.id) });
        entry = (user);
    }
    return entry;
}

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port} !`);
});

exports.app = app;
