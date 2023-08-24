var io = require('socket.io')(process.env.PORT || 52300);

//custom classes
var Player = require('./Classes/Player.js');
var bullet = require('./Classes/Bullet.js');
console.log('Server has started');

var players = [];
var sockets = [];
var bullets = [];

//updates
setInterval(()-> {

}),100,0;

io.on('connection', function(socket) {
   console.log('Connection Made!');

   var player = new Player();
   var thisPlayerID = player.id;

   players[thisPlayerID] = player;
   sockets[thisPlayerID] = socket;

   //Tell the client that this is our id for the server
    socket.emit('register', {id: thisPlayerID});
    socket.emit('spawn', player);//tell myself I have spawned
    socket.broadcast.emit('spawn', player)//tell others I have spawned

    //tell myself about everyone else in the game
    for(var playerID in players) {
        if(playerID != thisPlayerID) {
            socket.emit('spawn', players[playerID]);
        }
    }

    //postional data from client
    socket.on('updatePosition' , function(data){
        player.position.x = data.position.x;
        player.position.y = data.position.y;
        socket.broadcast.emit('updatePosition')
    });
    socket.on('updateRotation', function (data) {
        player.barrelRotation = data.barrelRotation;

        socket.broadcast.emit('updateRotation', player);
    });

    socket.on('fireBullet', function(data){
        var bullet = new Bullet();
        bullet.name = 'Bullet';
        bullet.position.x = data.position.x;
        bullet.position.y = data.position.y;
        bullet.direction.x = data.direction.x;
        bullet.direction.y = data.direction.y;

        bullet.push(bullet);
    });
    socket.on('disconnect', function (){
       console.log('A player has disconnected');
       delete players[thisPlayerID];
       delete sockets[thisPlayerID];
       socket.broadcast.emit('disconnected', player);
   });
});

function interval(func, wait,  times) {
    var interv = function(w, t){
        return function(){
          if(typeof t === "undefined" || t -- > 0){
              setTimeout(interv, w);
              try{
                  func.call(null);
              }catch(e){
                  t = 0;
                  throw e.toString();
              }
          }
        };
    }(wait, times);

    setTimeout(interv, wait);
}