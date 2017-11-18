var audio_context;
var recorder;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  
  recorder = new Recorder(input);    
}

function startRecording(button) {
  recorder && recorder.record();
  $("#recording").toggle();   
  button.disabled = true;
  document.getElementById("stop_button").disabled = false;
  document.getElementById("recordingslist").innerHTML = "";
}

function stopRecording(button) {
  recorder && recorder.stop();
  $("#recording").toggle();
  button.disabled = true;
  document.getElementById("record_button").disabled = false;
  
  createDownloadLink();
  
  recorder.clear();
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    
    var au = document.createElement('audio');
    var hf = document.createElement('a');
    var uploadBtn = document.createElement('button');
    var recordingslist = document.getElementById("recordingslist");

    uploadBtn.setAttribute("id", "upload");
    uploadBtn.setAttribute("class", "btn btn-primary");
    uploadBtn.setAttribute("name", "myFile");
    uploadBtn.innerHTML = "Upload";
    uploadBtn.onclick = function(){uploadFunc(blob);};

    
    au.controls = true;
    au.src = url;
    
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    
    recordingslist.setAttribute("class","inline");
    var li = document.createElement('li');
    li.appendChild(au);
    var li2 = document.createElement('li');
    li2.appendChild(uploadBtn);
    recordingslist.appendChild(li);
    recordingslist.appendChild(li2);
    

  });
}

$(document).ajaxStop(function uploadFunc(blob){
  var filename = new Date().toISOString() + '.wav'
  form_data = new FormData();
  form_data.append('myFile', blob, filename);

  document.getElementById('filename').innerHTML=filename;


  $.ajax({
              method : "POST",
              type: "POST",
              url: "https://publisherServer.com/",  // Address of the task publisher
              cache: false,
              contentType: false,
              processData: false,
              data: form_data,                         // Setting the data attribute of ajax with file_data
              error: function (request, error) {
                  console.log(arguments);
              },
              success: function (response) {
                  console.log(response);
                  var recordingslist = document.getElementById("recordingslist");
                  var li = document.createElement('li');
                  var msg = document.createElement('p');
                  msg.innerHTML = "<b>Uploaded successfully</b>";
                  li.appendChild(msg);
                  recordingslist.appendChild(li);

                  document.getElementById('upload').disabled = true;
              }
  })
});


window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    audio_context = new AudioContext;
   } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
   });
};