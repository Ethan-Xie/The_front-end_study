var GuaGame = function() {
    var g = {
        actions: {},
        keydowns:{},
    };
    var canvas = document.querySelector("#id-canvas");
    var context = canvas.getContext('2d');
    g.canvas =canvas;
    g.context = context;
    log("Guamame");
    g.drawImage = function(paddle){
        g.context.drawImage(paddle.image,paddle.x,paddle.y);
    }
    //events
    window.addEventListener('keydown',function(event){
        g.keydowns[event.key] = true;
    });
    window.addEventListener('keyup',function(event){
        g.keydowns[event.key] = false;
    });

    //注册事件函数
    g.addAction = function(key,callback){
        g.actions[key] = callback;
    }

    // timer
     var runloop = function(fps) {
         
     }
    setInterval(function(){
        //events
        var actions = Object.keys(g.actions);
        for(var i = 0; i<actions.length;i++){
            var key = actions[i];
            if(g.keydowns[key]){
                //如果按键被按下，调用注册的action
                g.actions[key]();
            }
        }
        //log(g.update);
        //update
        //g.update();
        context.clearRect(0,0,canvas.width,canvas.height);
        //draw
        g.draw();
        g.update();
    },1000/50);
    log(g.update);
    return g;
}
