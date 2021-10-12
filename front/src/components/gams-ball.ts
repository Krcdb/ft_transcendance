/* make the back dark */

document.body.style.backgroundColor = 'black';

/* make a white ball bounce on the border */

var ball = document.createElement('div');
ball.style.width = '50px';
ball.style.height = '50px';
ball.style.borderRadius = '50%';
ball.style.backgroundColor = 'white';
ball.style.position = 'absolute';
ball.style.left = '50%';
ball.style.top = '50%';
ball.style.marginLeft = '-25px';
ball.style.marginTop = '-25px';
document.body.appendChild(ball);
var x = 0;
var y = 0;
var dx = 1;
var dy = 1;
var interval = setInterval(function() {
  x += dx;
  y += dy;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
  if (x < 0 || x > document.body.clientWidth - 50) {
    dx = -dx;
  }
  if (y < 0 || y > document.body.clientHeight - 50) {
    dy = -dy;
  }
}, 10);


/* make the ball move 2x the speed */

clearInterval(interval);
interval = setInterval(function() {
  x += 2 * dx;
  y += 2 * dy;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
  if (x < 0 || x > document.body.clientWidth - 50) {
    dx = -dx;
  }
  if (y < 0 || y > document.body.clientHeight - 50) {
    dy = -dy;
  }
}, 10);

/* make a rectangular bar at the bottom of the frame with 200px width and 50px height */

var bar = document.createElement('div');
bar.style.width = '200px';
bar.style.height = '50px';
bar.style.backgroundColor = 'red';
bar.style.position = 'absolute';
bar.style.left = '50%';
bar.style.bottom = '0';
bar.style.marginLeft = '-100px';
document.body.appendChild(bar);


/* the bar has to move horizontally following the mouse */

document.body.onmousemove = function(e) {
  bar.style.left = e.pageX + 'px';
};


/* the ball also need to bounce if it enter in collision with the bar */

document.body.onmouseenter = function(e) {
  if (e.pageX > x && e.pageX < x + 50) {
    dx = -dx;
  }
  if (e.pageY > y && e.pageY < y + 50) {
    dy = -dy;
  }
};


/* if the ball touch the bottom frame pause all movement and display "you loose" at the center */

document.body.onmouseleave = function(e) {
  var message = document.createElement('div');
  message.innerHTML = 'You loose';
  message.style.color = "white"
  message.style.position = 'absolute';
  message.style.left = '50%';
  message.style.top = '50%';
  message.style.marginLeft = '-50px';
  message.style.marginTop = '-50px';
  document.body.appendChild(message);
};