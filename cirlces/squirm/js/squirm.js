/*jshint browser: true*/
/*global console, $, jQuery, alert*/
(function() {
    "use strict";

    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        start,
        e1,
        e2,
        requestAnimate;

    canvas.id = 'board';
    canvas.style.backgroundColor = '#666';
    document.body.appendChild(canvas);


    // ––– Static Shapes
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // create rectangle – simple
    context.fillStyle = '#fff';
    context.fillRect(100, 100, 60, 80);


    // default creating an ellipse – seems daunting – fix it with constructor function!
    context.beginPath();
    // x.pos, y.pos, x.radius, y.radius, angle, rotation start, rotation end, counter-clockwise boolean (default – false)
    context.ellipse(canvas.width - 40, canvas.height - 40, 20, 20, 0, 0, 360);
    // fill color
    context.fillStyle = '#fff';
    context.fill();
    // stroke
    context.strokeStyle = '#fff';
    context.lineWidth = 4;
    context.stroke();



    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ellipse constructor
    function Ellipse(x, y) {
        this.x = x;
        this.y = y;
        this.r = 40;
        this.vX = 0;
        this.vY = 0;

        this.draw = function() {
            context.beginPath();
            context.ellipse(this.x, this.y, this.r, this.r, 0, 0, 360);
            context.fillStyle = this.c;
            context.fill();

            if (this.sW || this.sC) {
                context.strokeStyle = this.sC;
                context.lineWidth = this.sW;
                context.stroke();
            }
        };
    }

    e1 = new Ellipse(canvas.width / 2, canvas.height / 2);
    e2 = new Ellipse(canvas.width / 2, canvas.height / 2);


    e1.sW = 12;
    e1.sC = '#6eeded';
    e1.c = '#db5050';

    e1.r = 100;

    e1.draw();

    e2.sW = 5;
    e2.sC = 'rgba(219, 80, 80, 0.5)';
    e2.c = 'rgba(110, 237, 237, 0.8)';
    e2.r = 2;


    e2.draw();

    // Game Setup
    function update(timing) {
        // redraws canvas each time
        //context.fillStyle = '#666';
        //context.fillRect(0, 0, canvas.width, canvas.height);

        // random velocity between 10-20
        //e2.vX = (Math.random() * 20) + 10;
        //e2.vY = (Math.random() * 20) + 10;

        e2.vX = 20;
        e2.vY = 10;

        e2.x += ((e2.vX * timing + 8) + 1) * (Math.random() > 0.5 ? 1 : -1);
        e2.y += ((e2.vY * timing + 2) + 1) * (Math.random() > 0.5 ? 1 : -1);

        e2.r += 0.075;
        e2.sW += 0.00075;


        if (e2.x > (e2.r + e2.sW) && e2.y > (e2.r + e2.sW) && e2.x < canvas.width - (e2.r + e2.sW) && e2.y < canvas.height - (e2.r + e2.sW)) {
            var i = 0;
            if (i < 600) {
                e2.vX *= -1;
                e2.vY *= -1;
                e2.draw();
                i++;
            }
        }

        //e2.draw();

    }

    // timestamp marks when the animation is initialized
    function animate(timestamp) {

        // assign progress to 0 every frame
        var progress = 0,
            step = 1 / 60;

        // if the start variable is assigned
        if (start) {
            // progress in milli-seconds
            progress += (timestamp - start) / 1000;
            while (progress > step) {
                update(step);
                progress -= step;
            }
        }

        start = timestamp;
        requestAnimate = window.requestAnimationFrame(animate);
    }

    window.onblur = function() {
        console.log('Got blur');
        window.cancelAnimationFrame(requestAnimate);
    };
    window.onfocus = function() {
        console.log('Got focus');
        start = 0;
        window.requestAnimationFrame(animate);
    };




    // Resize Functions – Responsive
    function elResize() {
        // do something

    }

    function winResize() {
        document.body.onresize = function() {
            elResize();
        };
        elResize();
    }

    winResize();

}());
