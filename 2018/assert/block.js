 //砖块
 var Block = function() {
    var image = imageFromPath("../lib/block.png");
    var o = {
        image : image,
        x : 100,
        y : 100,
        w : 100,
        h : 300,
        alive : true,
    }
    o.kill = function (){
        o.alive = false
    }
    o.collide = function(ball){
        if(rectIntersects(o,ball) || rectIntersects(ball,o)){
            return true;
        }
        return false;
    }
    return o;
}
