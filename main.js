noseX = 0;
noseY = 0;

lwx = 0;
rwx = 0;
difference = 0;


function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 500)
    canvas.position(560, 150)

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}


function modelLoaded()
{
    console.log("Posenet has succesfully loaded");
}


function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results)
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " noseY = " + noseY)
        lwx = results[0].pose.leftWrist.x
        rwx = results[0].pose.rightWrist.x
        difference = floor(lwx - rwx);
        console.log("leftwrist = " + lwx + " rightwrist = " + rwx + " difference = " + difference);
    }
}



function draw()
{
    background('#0a3266')
    fill('#c23838')
    stroke('#521814')
    square(noseX, noseY, difference)
    document.getElementById("square_side").innerHTML = "Width and height of the square will be = " + difference + "px"; 
}

