var GuaGame = function(loads) {
    //loads 是一个数组 里面是图像的函数
    //程序会在所有图片 载入后执行
    var g = {
        actions: {},
        keydowns:{},
    };
    var canvas = document.querySelector("#id-canvas");
    var context = canvas.getContext('2d');
    g.canvas =canvas;
    g.context = context;
    //log("Guamame");
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

    window.fps = 50;
    // timer
    var runloop = function() {
         //log("runloop")
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

        //next runloop\
        setTimeout(function(){
            runloop()
        },1000/window.fps)
     }

     setTimeout(function(){
        runloop()
    },1000/window.fps)

      /*
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
    */
    log(g.update);
    return g;
}
