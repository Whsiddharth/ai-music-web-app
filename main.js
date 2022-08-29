song1="";
song2="";
song1_status="";
song2_status="";

scoreleftWrist=0;
scorerightWrist=0;

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload(){
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");

}

function setup(){
    canvas=createCanvas(600,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet model is initialized.");
} 

function draw(){
    image(video, 0, 0, 600,350);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("magenta");
    stroke("magenta");
    
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("current_song").innerHTML="Current Track: song 1";
        }
    }
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("current_song").innerHTML="Current Track: song 2";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristX+" and left wrist y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rightWristX+" and right wrist y= "+rightWristY);

        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+scoreleftWrist);

        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score= "+scorerightWrist);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}