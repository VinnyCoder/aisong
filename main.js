technosong = "";
cybersong = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song_status = "";
song_status_right = "";

function preload() {
    technosong = loadSound("technosong.mp3");
    cybersong = loadSound("cybersong.mp3");

}

function gotPoses() {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Posenet is initiallized");
}
function draw() {
    // canvas
    image(video, 0, 0, 600, 500);
    //status of song
    cybersong.isPlaying();
    song_status = true;

    technosong.isPlaying();
    song_status = true;

    fill("FF0000");
    stroke("#FF0000");


    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        cybersong.stop();

        if (song_status == false) {
            technosong.play();
            document.getElementById("songname").innerHTML = "TECHNO";
        }
    }

    technosong.isPlaying();
    song_status_right = true;

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        technosong.stop();

            if(song_status_right == true){
                cybersong.play();
                document.getElementById("songname").innerHTML = "CYBER-WAR"
            }
    }


}