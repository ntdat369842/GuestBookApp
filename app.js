const http = require('http');
const path = require('path');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT;

app.set('views', path.resolve(__dirname, 'views') );
app.set('view engine', 'ejs');

let entries = [];
app.locals.entries = entries;

app.use( logger('dev') );

app.use( bodyParser.urlencoded({
    extended: false
}) );

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

app.post('/new-entry', (req, res) => {
    
    if (!req.body.title || !req.body.body) {
        res.status(400).send('Entries must have a title and a body!!!');
        return;
    }

    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });

    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(port || 3000, () => {
    console.log('Guestbook app started on port 3k!!!');
})