const http = require("http");
const url = require("url");
const Utils = require("./modules/utils");
const EnglishMessages = require("./lang/en/en");

class Server {
    constructor(port) {
        this.port = port;
    }

    start() {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);

            if (parsedUrl.pathname === "/COMP4537/labs/3/getDate") {
                const name = parsedUrl.query.name;

                if (!name) {
                    res.writeHead(400, { "Content-Type": "text/html" });
                    res.end("<p style='color:red'>Error: name parameter is required</p>");
                    return;
                }

                const date = Utils.getDate();
                const message = EnglishMessages.greeting.replace("%1", name) + date;

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(`<p style="color:blue">${message}</p>`);
            } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<p style='color:red'>404 Not Found</p>");
            }
        });

        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

new Server(8000).start();