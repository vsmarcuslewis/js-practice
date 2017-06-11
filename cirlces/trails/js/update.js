/*jshint browser: true*/
/*global console, $, jQuery, alert, Ellipse, canvas, ctx, i, bubbles, colorBubbles: true, bubbleColors, lineBubbles*/

var start,
    steps = 1/ 80,
    activate;

function update(timing) {

    ctx.fillStyle = 'rgba(136, 136, 136, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    lineBubbles(true);
    bubbleColors(true, steps);
}


function animate(time) {
    var progress = 0;

    if (start) {
        progress += (time - start) / 1000;
        while (progress > steps) {
            update(steps);
            progress -= steps;
        }
    }

    start = time;
    activate = window.requestAnimationFrame(animate);
}

// Start / Pause animations
window.onfocus = function(e) {
    start = 0;
    window.requestAnimationFrame(animate);
};
window.onblur = function() {
    window.cancelAnimationFrame(activate);
};
