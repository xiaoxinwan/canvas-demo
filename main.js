var canvas = document.getElementById("lxx");
var context = canvas.getContext("2d");

autoSetCanvasSize(canvas); //获取宽高

listenToUser(canvas); //监听鼠标

var eraserEnabled = false;
eraser.onclick = function() {
  //控制橡皮擦是否开启
  eraserEnabled = true;
  actions.className = "actions press";
};

brush.onclick = function() {
  //画笔的状态切换
  eraserEnabled = false;
  actions.className = "actions";
};

/*自设定的函数*/
function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function() {
    setCanvasSize();
  };
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function drawCircle(x, y, radius) {
  //画圆点
  context.beginPath();
  context.fillStyle = "black";
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}
function drawLine(x1, y1, x2, y2) {
  //圆点之间画线
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(x1, y1); //起点
  context.lineWidth = 5;
  context.lineTo(x2, y2); //终点
  context.closePath();
  context.stroke();
}

function listenToUser(canvas) {
  //鼠标的三个动作
  var using = false;
  var lastPoint = { x: undefined, y: undefined };

  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function(a) {
      console.log("开始");
      console.log(a);
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10);
      } else {
        lastPoint = { x: x, y: y };
      }
    };
    canvas.ontouchmove = function(a) {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        //判断是否使用橡皮擦
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = { x: x, y: y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function() {
      console.log("结束");
      using = false;
    };
  } else {
    //非触屏设备
    canvas.onmousedown = function(a) {
      //按下鼠标
      var x = a.clientX;
      var y = a.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10);
      } else {
        lastPoint = { x: x, y: y };
      }
    };

    canvas.onmousemove = function(a) {
      //移动鼠标
      var x = a.clientX;
      var y = a.clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        //判断是否使用橡皮擦
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = { x: x, y: y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function(b) {
      //松开鼠标
      using = false;
    };
  }
}
