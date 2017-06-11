/*jshint browser: true*/

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

// Setup Board
canvas.id = 'board';
canvas.style.backgroundColor = '#999';
document.body.appendChild(canvas);

//draw canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Construct Ellipse
var ellipse;

function Ellipse(x, y) {
    this.x = x;
    this.y = y;
    this.radX = 20;
    this.radY = this.radX;
    this.fill = '#fff';
    this.sW = 0;
    this.sC = '#000';

    this.vX = 300;
    this.vY = this.vX;

    this.rotate = 0;
    this.stAng = 0;
    this.endAng = 360;

    //pie(Math.PI) divided by 180 converts Radians to Degrees
    this.setDeg = function(angle) {
        return angle * (Math.PI / 180);
    };
    this.draw = function() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radX, this.radY, this.setDeg(this.rotate), this.setDeg(this.stAng), this.setDeg(this.endAng));

        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fill();
        }

        if (this.sW) {
            ctx.lineWidth = this.sW;
            ctx.strokeStyle = this.sC;
            ctx.stroke();
        }
    };
}


ellipse = new Ellipse(canvas.width / 2, canvas.height / 2);

function change() {
    ellipse.sC = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';

    ellipse.fill = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.random() + ')';

    ellipse.radX = ((Math.random() * 24) + 20);
    ellipse.radY = ((Math.random() * 24) + 20);
}

ellipse.vX = (Math.random() * 400) + 340 * (Math.random() > 0.5 ? 1 : -1);
ellipse.vY = (Math.random() * 400) + 340 * (Math.random() > 0.5 ? 1 : -1);
var i = 0;
// Use time as argument to connect with update(time) – this is so you can pause/play animation
function ellipses(time) {
    //ellipse.x += ellipse.vX * time;
    //ellipse.y += ellipse.vY * time;

    ellipse.sW = 4;


    ellipse.x = (Math.random() * canvas.width) + ellipse.radX;
    ellipse.y = (Math.random() * canvas.height) + ellipse.radY;

    var elps = [];

    if (ellipse.x > (ellipse.radX + ellipse.sW) && ellipse.y > (ellipse.radY + ellipse.sW) && ellipse.x < canvas.width - (ellipse.radX + ellipse.sW) && ellipse.y < canvas.height - (ellipse.radY + ellipse.sW)) {

        if (i < 200) {
            ellipse.draw();
            change();
            i++;
        }
    }

    /*if (ellipse.x < (ellipse.radX + (ellipse.sW * 2)) || ellipse.x > canvas.width - (ellipse.radX + (ellipse.sW * 2))) {
            ellipse.vX *= -1;
            ellipse.sW += i++;
            change();
        }

        if (ellipse.y < (ellipse.radY + (ellipse.sW * 2)) || ellipse.y > canvas.height - (ellipse.radY + (ellipse.sW * 2))) {
            ellipse.vY *= -1;
            ellipse.sW += i++;
            change();
        }*/
}


// Udate Animating

function update(time) {
    //ctx.fillStyle = '#666';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    ellipses(time);

}

// Timing
var progress, start, step, animate;

function play(timing) {
    var progress = 0,
        step = 1 / 60;

    //if start variable has value
    if (start) {
        //add timing to progresss
        progress += (timing - start) / 1000;
        while (progress > step) {
            update(step);
            progress -= step;
        }
    }

    start = timing;
    animate = window.requestAnimationFrame(play);
}

window.onfocus = function() {
    start = 0;
    window.requestAnimationFrame(play);
};
window.onblur = function() {
    window.cancelAnimationFrame(animate);
};








/***
    // Responsive Board
    function elResize() {
        canvas.width = window.innerWidth / 1.4;
        canvas.height = window.innerHeight / 1.4;
    }

    function winResize() {
        document.body.onresize = function () {
            elResize();
        };
        elResize();
    }

    winResize();
***/
