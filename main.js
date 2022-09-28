var http = require('http');
var fs = require('fs');
var url = require('url');

function requestHandler (req, res){
    let urlDetails = url.parse(req.url,true);
    if(urlDetails.pathname == "/index"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("pages/index.html",function(error,data){
            console.log(error);
            res.end(data);
        })
       
    }
    else if (urlDetails.pathname == "/about"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("pages/about.html",function(error,data){
            console.log(error);
            res.end(data);
        })
    }
    else if (urlDetails.pathname == "/register"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("pages/register.html",function(error,data){
            console.log(error);
            res.end(data);

        })
        }
    else if (urlDetails.pathname == "/register" && req.method=="POST"){
        let mesg = "";
        req.on('data',(data)=>{
           let body = url.parse("?" +data.tostring(), true).query;
           console.log(body);
           if (body.password.length < 8 ){
            mesg="password is less than 8 char ";
           }
           else if (body.password.length >= 8){
            mesg = " Done";
           }
           console.log(mesg);
        });
       req.on("end",()=>{
        res.end(mesg);
        console.log(mesg);
       })
    }
    
    }
    http.createServer(requestHandler).listen(8080);
        
