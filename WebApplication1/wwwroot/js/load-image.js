/* jshint esnext:true, browser:true, devel: true */
/* globals DotNet */
window.onBlazorReady = function() {
  "use strict";
  var input = document.querySelector("input[type=file]");
  if (!input) return;

  input.addEventListener("change", function() {
    var file = input.files[0];
    getBase64FileData(file).then(function(base64FileData) {
      //console.log("JS: Image data loaded, sending to .NET via interop: " + base64FileData);
      DotNet.invokeMethodAsync("WebApplication1", "ProcessImage", base64FileData).then(function(base64Output) {
        console.log("JS: Got data back from .NET via interop: " + base64Output);
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
};