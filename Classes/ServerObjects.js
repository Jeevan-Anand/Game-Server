var shortID = require('shortid');
var Vector2 = require('./Vector2');

module.exports = class ServerObjects {
    constructor() {
        this.id = shortID.generate();
        this.name = 'ServerObjects';
        this.position = new Vector2();
    }
}