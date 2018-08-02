var Ball = function (){
    var image = imageFromPath("../lib/ball.png");
    var o = {
        image : image,
        x : 100,
        y : 300,
        speedX : 6,
        speedY : 6,
        fired:false,
    }
    o.fire = function(){
        o.fired = true
    }
    o.move = function() {
        if(o.fired){
           // log("move");
           if(o.x < 0 || o.x >400-15){
               o.speedX = -o.speedX;
           }
           if(o.y < 0 || o.y >600-10){
               o.speedY = -o.speedY;
           }
           log("move")
           o.x += o.speedX;
           o.y += o.speedY;
        }
    }
    return o;
}

