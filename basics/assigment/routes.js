const requestHandler = (req, res) => {
    const path = req.url;
    const method = req.method;

    if (path === "/create-user" && method === "POST") {
        let userNameBuffer = [];
        req.on("data", (chunk) => {
            userNameBuffer.push(chunk);
        })
        req.on("end", () => {
            const parsedUserName = Buffer.concat(userNameBuffer).toString();
            const [_, userName] = parsedUserName.split("=");
            console.log(userName)
        })
        res.statusCode = 302;
        res.setHeader('Location', "/created");
        return res.end();
    }
    if (path === "/created" && method === "GET") {
        res.setHeader('Content-Type', "text/html");
        res.write('<html>')
        res.write('<head><title>This is project</title></head>')
        res.write('<body><h1>Created</h1><a href="./">To main page</a></body>')
        res.write('</html>')
        return res.end();
    }
    if (path === "/users") {
        res.setHeader('Content-Type', "text/html");
        res.write('<html>')
        res.write('<head><title>This is project</title></head>')
        res.write('<body><ul><li>user 1</li><li>user 2</li><li>user 3</li></ul></body>')
        res.write('</html>')
        return res.end();
    }
    res.setHeader('Content-Type', "text/html");
    res.write('<html>')
    res.write('<head><title>This is project</title></head>')
    res.write('<body><h1>hello from Node.js Leo12</h1><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">submit</button></form></body>')
    res.write('</html>')
    return res.end();
}

module.exports = requestHandler;