 //砖块
 var Block = function(position) {
    // position 是 [0,0] 格式 用来遍历生成
    var p = position
    var image = imageFromPath("../lib/block.png");
    console.log(p)
    var o = {
        image : image,
        x : p[0],
        y : p[1],
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
