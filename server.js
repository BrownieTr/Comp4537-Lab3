const http = require("http");
const url = require("url");
const Utils = require("./modules/utils");
const EnglishMessages = require("./lang/en/en");
const FileManager = require("./modules/fileManager");

class Server {
    constructor(port) {
        this.port = port;
    }

    start() {
        const server = http.createServer(async (req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;

            // Part B
            if (pathname === "/COMP4537/labs/3/getDate") {
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
                return;
            }

            // Part C.1
            if (pathname === "/COMP4537/labs/3/writeFile") {
                const text = parsedUrl.query.text;

                if (!text) {
                    res.writeHead(400, { "Content-Type": "text/html" });
                    res.end("<p style='color:red'>Error: text parameter is required</p>");
                    return;
                }

                const file = new FileManager("file.txt");

                try {
                    await file.append(text);
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(`<p style="color:green">Successfully wrote: ${text}</p>`);
                } catch (err) {
                    res.writeHead(500, { "Content-Type": "text/html" });
                    res.end("<p style='color:red'>Server error writing to file</p>");
                }
                return;
            }

            // Part C.2
            if (pathname === "/COMP4537/labs/3/readFile/file.txt") {
                const file = new FileManager("file.txt");

                try {
                    const content = await file.read();
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(content);
                } catch (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(`<p style="color:red">404: file.txt not found</p>`);
                }
                return;
            }

            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<p style='color:red'>404 Not Found</p>");
        });

        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

new Server(process.env.PORT || 3000).start();