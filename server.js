const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    // lodash 
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });
    greet();
    
    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            //path += 'about.html';
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;    
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //set an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }else {
            //res.write(data);
            
            res.end(data);
        }
    })

    //res.write('<head><link rel ="styleseet" href="#"></head>');
    //res.write('<p>Hello, Kuity</p>');
    //res.write('<p>Hello again, Kuity</p>');
    //res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000')
});