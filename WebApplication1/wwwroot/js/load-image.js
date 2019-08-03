/* jshint esnext:true, browser:true, devel: true */
window.onBlazorReady = function(dotNetObjectRef) {
  "use strict";
  var input = document.querySelector("input[type=file]");
  if (!input) return;

  input.addEventListener("change", function() {
    var file = input.files[0];
    getBase64FileData(file).then(function(base64FileData) {
      //console.log("JS: Image data loaded, sending to .NET via interop: " + base64FileData);
      dotNetObjectRef.invokeMethodAsync("ProcessImage", base64FileData).then(function(base64Output) {
        //console.log("JS: Got data back from .NET via interop: " + base64Output);
        showBeforeAndAfter(base64FileData, base64Output);
      });
    });
  }, false);

  //return a promise to return the base64 content of the given file
  function getBase64FileData(file) {
    var reader = new FileReader();
    return new Promise(function(resolve, reject) {
      reader.addEventListener("load", function() {
        var data = reader.result.split(",")[1];
        resolve(data);
      }, false);
      reader.readAsDataURL(file);
    });
  }

  function showBeforeAndAfter(beforeData, afterData) {
    var beforeImg = document.querySelector("img#before");
    if (beforeImg) {
      beforeImg.style.display = "inline";
      beforeImg.src = "data:image/png;base64, " + beforeData;
    }

    var afterImg = document.querySelector("img#after");
    if (afterImg) {
      afterImg.style.display = "inline";
      afterImg.src = "data:image/png;base64, " + afterData;
    }
  }
};