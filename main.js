document.body.addEventListener('touchstart', function(lcc){
  lcc.preventDefault()
})

var canvas = document.getElementById("lxx");
var context = canvas.getContext("2d");
var lineWidth = 5

autoSetCanvasSize(canvas); //获取宽高

listenToUser(canvas); //监听鼠标

//左上角4个按钮
var eraserEnabled = false;
pen.onclick = function() {
  eraserEnabled = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
};
eraser.onclick = function() {
  eraserEnabled = true;
  eraser.classList.add("active");
  pen.classList.remove("active");
};
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function(){
  var img = canvas.toDataURL("image/png")
  //document.write('<img src = "'+img+ '"/>')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = img
  a.download =  'mypic'
  a.click()
  
}

function fillCanvasBackgroundWithColor(canvas){
  context.save();
  context.globalCompositeOperation = 'destination-over';
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}
fillCanvasBackgroundWithColor(canvas, 'white');


//颜色选择按钮
black.onclick = function() {
  black.classList.add("active");
  green.classList.remove("active");
  blue.classList.remove("active");
  red.classList.remove("active");
  context.strokeStyle = "black";
};
red.onclick = function() {
  red.classList.add("active");
  black.classList.remove("active");
  green.classList.remove("active");
  blue.classList.remove("active");
  context.strokeStyle = "red";
};
green.onclick = function() {
  green.classList.add("active");
  black.classList.remove("active");
  red.classList.remove("active");
  blue.classList.remove("active");
  context.strokeStyle = "green";
};
blue.onclick = function() {
  blue.classList.add("active");
  red.classList.remove("active");
  black.classList.remove("active");
  green.classList.remove("active");
  context.strokeStyle = "blue";
};

//线的粗细选择
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}





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
  context.moveTo(x1, y1); //起点
  context.lineWidth = lineWidth;
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
