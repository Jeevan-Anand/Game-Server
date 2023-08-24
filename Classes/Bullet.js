var ServerObject = require('./ServerObjects');
var Vector2 = require('./Vector2');

module.exports = class Bullet extends ServerObject{
    constructor() {
        super();
        this.direction = new Vector2();
        this.speed = 1;
    }

    onUpdate()
    {
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;

        return false;
    }
}