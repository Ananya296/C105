Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
};

console.log("ml5 Version: ",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yQXgABysR/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
};

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        random_number_r = Math.floor(Math.random() * 255) + 1;
      random_number_g = Math.floor(Math.random() * 255) + 1;
      random_number_b = Math.floor(Math.random() * 255) + 1;

      document.getElementById("result_of_objects").innerHTML = ' - ' + results[0].label;
      document.getElementById("result_of_accuracy").innerHTML = ' - ' + (results[0].confidence*100).toFixed(2)+ " %";
      document.getElementById("result_objects").style.color = "rgb(" + random_number_r+", "+ random_number_g+ ", "+ random_number_b+")";
    }
}