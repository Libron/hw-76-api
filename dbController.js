const fs = require('fs');

const filename = './db.json';
const maxMsg = 30;

let data = [];

module.exports = {
    init() {
        try {
            const fileContents = fs.readFileSync(filename);
            data = JSON.parse(fileContents);

        } catch (e) {
            data = [];
        }
    },
    getItems() {
        if (data.length > maxMsg) {
            return data.slice(data.length - maxMsg, data.length);
        } else {
            return data;
        }
    },
    addItem(item) {
        data.push(item);
        this.save();
    },
    save() {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    }
};