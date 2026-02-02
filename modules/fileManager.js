const fs = require("fs");
const path = require("path");

class FileManager {
    constructor(filename) {
        this.filePath = path.join(__dirname, "..", filename);
    }

    append(text) {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.filePath, text + "\n", (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = FileManager;