/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('i#record');
var recordText = document.querySelector('span#record-text');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;

// window.isSecureContext could be used for Chrome
var isSecureOrigin = location.protocol === 'https:' ||
location.hostname === 'localhost';
if (!isSecureOrigin) {
  alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
    '\n\nChanging protocol to HTTPS');
  location.protocol = 'HTTPS';
}

var constraints = {
  audio: true,
  video: false
};

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    gumVideo.src = window.URL.createObjectURL(stream);
  } else {
    gumVideo.src = stream;
  }
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

recordedVideo.addEventListener('error', function(ev) {
  console.error('MediaRecording.recordedMedia.error()');
  alert('Your browser can not play\n\n' + recordedVideo.src
    + '\n\n media clip. event: ' + JSON.stringify(ev));
}, true);

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  console.log(recordText.textContent);
  if (recordText.textContent === 'Click to start:') {
    startRecording();
  } else {
    stopRecording();
    recordText.textContent = 'Click to start:';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
}

function startRecording() {
  recordedBlobs = [];
  var options = {mimeType: 'audio/webm;codecs=opus'};
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: ''};
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    alert('Exception while creating MediaRecorder: '
      + e + '. mimeType: ' + options.mimeType);
    return;
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordText.textContent = 'Click to stop:';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  recordedVideo.controls = true;
}

function play() {
  var superBuffer = new Blob(recordedBlobs, {'type' : 'audio/ogg; codecs=opus'});
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
}

function download() {
  var blob = new Blob(recordedBlobs, {type: 'audio/webm'});
  getBase64(blob);
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'audio.raw';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);

}//end of download

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCzzvxmhc8TkqHA5lg-wPbNxedKbwes7-U",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "31e8d765-e43d-7c96-abdf-6bb1c99dc453"
  },
  "processData": false,
  "data": "{\r\n  \"config\": {\r\n      \"encoding\":\"webm\",\r\n      \"languageCode\": \"en-US\",\r\n      \"enableWordTimeOffsets\": false\r\n  },\r\n  \"audio\": reader.result\r\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

