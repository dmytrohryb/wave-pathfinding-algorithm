(function() {
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff(canvas);
    }
    resizeCanvas();

    function drawStuff() {
        //context.fillRect(0, 0, canvas.width, canvas.height)

        let y = 0

        while (y < canvas.height){
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.stroke();
            y = y + 20
        }

        let x = 0

        while (x < canvas.width){
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.stroke();
            x = x + 20
        }


        // do your drawing stuff here
    }

})();

