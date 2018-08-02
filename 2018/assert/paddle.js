var Paddle = function (){
    var image = imageFromPath("../lib/grass.png");
    var o = {
        image : image,
        x : 100,
        y : 400,
        speed : 10,
        leftDown : false,
        rightDown : false,
    }
    o.moveLeft = function(){
        this.x -= this.speed;
        if(this.x<0){
            this.x += this.speed;
        }
    }
    o.moveRight = function(){
        this.x += this.speed;
        if(this.x+ o.image.width> 400){
            this.x -= this.speed;
        }
    }
    o.collide = function(ball){
        if(ball.y+ball.image.height >o.y && ball.y+ball.image.height <o.y+20){
            if(ball.x > o.x && ball.x <o.x+o.image.width){
                return true;
            }
        }
        return false;
    }
    return o;
    /*
    o.collide = function(x1,y1,x2,y2) {
        if( x2<x1 && x1<x2+20 && y2<y1 && y1<y2+120){
            return true;
        }
        return false
    }
    */
}
