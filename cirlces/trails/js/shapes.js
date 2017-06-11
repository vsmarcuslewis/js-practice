/*jshint browser: true*/
/*global console, $, jQuery, alert*/

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = '#888';
document.body.appendChild(canvas);

function Ellipse(x, y, r, fill, sW, sC) {
    this.x = x;
    this.y = y;
    this.rX = r;
    this.rY = r;
    this.fill = fill;
    this.sW = sW;
    this.sC = sC;

    this.vX = Math.floor(Math.random() * 800) + 200;
    this.vY = Math.floor(Math.random() * 800) + 200;

    this.rotate = 0;
    this.strtAng = 0;
    this.endAng = 360;
}

Ellipse.prototype.setAng = function(angle) {
    return angle * (Math.PI / 180);
};

Ellipse.prototype.draw = function() {

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rX, this.rY, this.setAng(this.rotate), this.setAng(this.strtAng), this.setAng(this.endAng));
    ctx.fillStyle = this.fill;

    if (this.fill) {
        ctx.fill();
    }
    if (this.sW || this.sC) {
        ctx.lineWidth = this.sW;
        ctx.strokeStyle = this.sC;
        ctx.stroke();
    }
};















