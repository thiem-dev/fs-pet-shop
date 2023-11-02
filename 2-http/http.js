import http from 'http'
import url from 'url'
import fs from 'fs'
let res;
const dbPath = './pets.json';
// import routes from './routes.js'
let petData 

var handleRequest = function (req, res) {
    if(req.url !== undefined) {
        const urlArray = formatURL(req);
        const petIndex = Number(urlArray[2]); 
        let fileData = fs.readFileSync(dbPath, 'utf8')
        petData = JSON.parse(fileData)
        if(urlArray[1] === "pets" && urlArray.length < 3){
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(petData))
        } else if( urlArray[1] === "pets" && petIndex !== undefined ){
            if(urlArray[1] === "pets" && petIndex < 0) {
                res.writeHead(404, {'content-type': 'text/plain'})
                res.end("Not Found");
            } else if(urlArray[1] === "pets" && petIndex > petData.length){
                res.writeHead(404, {'content-type': 'text/plain'})
                res.end("Not Found");
            } 
        } else {
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(petData[petIndex]))
        }
        res.end(JSON.stringify(petData[petIndex]))
    } else {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end("Not Found");
    }
};

var server = http.createServer(handleRequest, res);
server.listen(8000, function() {
    console.log("Listening... on localhost:8000")
})


function formatURL(req){
    const parsedUrl = url.parse(req.url, true)  
    return parsedUrl.pathname.split('/')
}
