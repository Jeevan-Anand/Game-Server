var shortid = require('shortid');
var Vector2 = require('./Vector2.js');
module.exports = class Player{
    constructor() {
        this.username = '';
        this.id = shortid.generate();
        this.position = new Vector2();
        this.barrelRotation =  new Number(0);
    }
}