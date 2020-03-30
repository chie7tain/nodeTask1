// all thanks to Alchemist for pointing me in the right direction after hours of search and trys and errors
//https:itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
const {parse} = require("querystring");
const http = require('http');
const fs = require("fs");
const server = http.createServer((req, res) => {
    if(req.method === "POST"){
        collectRequestData(req,result =>{
            console.log(result);
            fs.writeFile("message.txt",result.message,(err)=>{
                if(err) throw err;
            });
            res.end(`${result.message}`);
        });
    }else{
     res.end(`
        <!doctype html>
        <html>
        <body>
        <h1>Please enter a message here:
            <form action="/message" method="post">
                <input type="text" name="message" placeholder="type message here" /><br />
                
                <button>Submit</button>
            </form>
        </body>
        </html>
    `);   
    }
    
});
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
server.listen(3000);