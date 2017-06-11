/*jshint browser: true*/
/*global console, $, jQuery, alert, Ellipse, canvas, ctx, timing, steps*/

// Draw Ellipses – Chaser
var bubbles = [];

function lineBubbles(e) {
    for (var i = bubbles.length - 1; i > 0; i--) {
        bubbles[i].draw();
    }
    if (bubbles.length > 50) {
        bubbles.splice(0, 2);
    }
}


// Draw Ellipse – Clicker
var colorBubbles = [];

function bubbleColors(e, timing) {
    for (var i = 0; i < colorBubbles.length; i++) {
        if (colorBubbles[i].y < colorBubbles[i].rY || (colorBubbles[i].y + colorBubbles[i].rY) > canvas.height) {
            // Call velocity in constructer before you can redirect
            colorBubbles[i].vY *= -1;
        }
        colorBubbles[i].y += colorBubbles[i].vY * timing;
        colorBubbles[i].draw();
    }
}


// Event Listeners
canvas.addEventListener('mousemove', function(e) {
    bubbles.push(new Ellipse(e.pageX - 5, e.pageY - 10, 10, 'rgba(77, 227, 221, 0.75)', 0, 0));

    for (var i = bubbles.length - 1; i > 0; i--) {
        bubbles[i].fill = 'rgba(' + ((Math.random() * 256) + 0) + ',' + ((Math.random() * 256) + 0) + ',' + ((Math.random() * 256) + 0) + ',' + (Math.random() * 0.2) + ')';
        bubbles[i].sC = 'rgba(255, 255, 255,' + ((Math.random() * 0.8) + 0) + ')';
    }
    lineBubbles(e);
});

canvas.addEventListener('mousedown', function(e) {
    var pX = e.pageX - 5;
    var pY = e.pageY;

    colorBubbles.push(new Ellipse(pX, pY, 20, 'rgba(' + ((Math.random() * 256) + 0) + ',' + ((Math.random() * 256) + 0) + ',' + ((Math.random() * 256) + 0) + ',' + ((Math.random() * 0.8) + 0.6) + ')', 0, 0));

    bubbleColors(e, steps);

});
