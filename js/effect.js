document.getElementById("clicker").addEventListener("click", () => {
    document.getElementById("hidden").style.display = "block";
    
});

document.getElementById("close").addEventListener("click", () => {
    document.getElementById("hidden").style.display = "none";
    if (video.paused) {
        
    } else {
        document.getElementById("heading").textContent = "PLAY!";
        video.pause();
    }
    document.getElementById("experience").style.backgroundColor = "#7399C6";

});

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let video = document.getElementById('video');


// set canvas sizwe 
video.addEventListener('loadedmetadata', function () {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.display = "block";
});

video.addEventListener('play', function () {
    video.style.display = 'none';
    let videoElement = this;
    (function loop() {
        if (!videoElement.paused && !videoElement.ended) {
            context.drawImage(videoElement, 0, 0);
            setTimeout(loop, 1000 / 30); // 30fps
        }
    })();
}, 0);

//changed to let
let getElementPosition = (obj) => {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

//changed to let
let getEventLocation = (element, event) => {
    let pos = getElementPosition(element);
    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
}

//changed to let
let rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color ";
    return ((r << 16) | (g << 8) | b).toString(16);
}

canvas.addEventListener("mousemove", function (e) {
    let eventLocation = getEventLocation(this, e);
    let coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;
    // Get the data of the pixel
    let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
    if ((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)) {
        coord += " ()";
    }
    let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    // Draw the color and coordinates.
    document.getElementById("experience").style.backgroundColor = hex;
}, false);

let heading = document.getElementById("heading");
heading.addEventListener("click", (e) => {
    if (video.paused) {
        document.getElementById("heading").textContent = "PAUSE";
        video.play();
    } else {
        document.getElementById("heading").textContent = "PLAY!";
        video.pause();
    }
});