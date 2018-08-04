var imageFromPath = function(path){
    var img = new Image();
    img.src= path;
    return img;
}

//交集函数
var rectIntersects = function(o,ball) {
        if(ball.y > o.y && ball.y <o.y+o.image.width){
            if(ball.x > o.x && ball.x <o.x+o.image.width){
                return true;
            }
        }
        return false;
    }

