const path = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {

    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}