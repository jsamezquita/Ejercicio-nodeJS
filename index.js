const fs = require("fs");
const http = require("http");
const axios = require("axios");
const url = require('url');


const URL = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const URL2 = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

axios.get(URL).then(response=>{
    axios.get(URL2).then(response1=>{
        let readFile = (callback) => {
            fs.readFile("proveedores.html", (err,data) =>{
                let json = response.data;
                let pageContent = data.toString();
                let tabla="";
                json.forEach(actual =>{
                    tabla+="<tr><td>"+actual.idproveedor+"</td><td>"+actual.nombrecompania+"</td><td>"+actual.nombrecontacto+"</td></tr>";
                });
                pageContent = pageContent.replace("{{Replace}}",tabla);
                callback(pageContent);
            });
        };
    
        let readFile2 = (callback) => {
            fs.readFile("clientes.html", (err,data) =>{
                let json1 = response1.data;
                let pageContent = data.toString();
                let tabla="";
                json1.forEach(actual =>{
                    tabla+="<tr><td>"+actual.idCliente+"</td><td>"+actual.NombreCompania+"</td><td>"+actual.NombreContacto+"</td></tr>";
                });
                pageContent = pageContent.replace("{{Replace}}",tabla);
                callback(pageContent);
            });
        };
    ;
        http   
        .createServer((req,res)=>{
            var q = url.parse(req.url,true);
            if(q.pathname ==="/api/proveedores"){
            readFile((data)=>{
                res.writeHead(200, { "Content-Type": "text/html"});
                res.end(data.toString());  
            });
            }
            else if(q.pathname ==="/api/clientes"){
                readFile2((data)=>{
                    res.writeHead(200, { "Content-Type": "text/html"});
                    res.end(data.toString());  
                });
                }
            else{
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
        })
        .listen(8081)
    });
});
