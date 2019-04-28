var Base64 = {
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  //public method for encoding
  encode : function (input) {
      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;
      //input = Base64._utf8_encode(input); //comment out to encode binary file(like image)

      while (i < input.length) {

          chr1 = input[i++];
          chr2 = input[i++];
          chr3 = input[i++];

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output = output +
                   Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                   Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
      }
      return output;
  }
}

function getBase64(doll){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL(`src/img/${doll}_1x.png`), true);
  xhr.responseType = 'arraybuffer';//watch out this line!
  xhr.onload = function(){
    let blob_x1 = new Uint8Array(this.response);
    ////////////////
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL(`src/img/${doll}_2x.png`), true);
    xhr.responseType = 'arraybuffer';//watch out this line!
    xhr.onload = function(){
      let clipboard = document.getElementById("board");
      let blob_x2 = new Uint8Array(this.response);
      let uri_1 = "data:image/jpeg;base64," + Base64.encode(blob_x1);     
      let uri_2 = "data:image/jpeg;base64," + Base64.encode(blob_x2);     
      clipboard.value = `document.getElementById('offline-resources-1x').src = '${uri_1}';` + `document.getElementById('offline-resources-2x').src = '${uri_2}';`;
    };
    xhr.send();
  };
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function(dcle) {
  let clipboard = document.getElementById("board");
  let boardbutton = document.getElementById("boardbutton");
  let icon1 = document.getElementById("icon1");
  let icon2 = document.getElementById("icon2");
  let icon3 = document.getElementById("icon3");
  let icon4 = document.getElementById("icon4");
  let icon5 = document.getElementById("icon5");

  boardbutton.addEventListener('click', function(e) {
    clipboard.select();
    document.execCommand('Copy');
  });
  clipboard.addEventListener('click', function(e) {
    this.select();
    document.execCommand('Copy');
  });
  icon1.addEventListener('click', function(e) {
    getBase64("mario")
  });
  icon2.addEventListener('click', function(e) {
    getBase64("sonic")
  });
  icon3.addEventListener('click', function(e) {
    getBase64("megaman")
  });
  icon4.addEventListener('click', function(e) {
    getBase64("dino")
  });
  icon5.addEventListener('click', function(e) {
    clipboard.value = "var event = new Event('keydown');var inc = -30;event.keyCode = 32;event.which = event.keyCode;event.altKey = false;event.ctrlKey = true;event.shiftKey = false;event.metaKey = false;var ctx = document.getElementsByClassName('runner-canvas')[0].getContext('2d');var sec = setInterval(function () {if (Math.max(...ctx.getImageData(120, 125, 50 + inc, 1).data) == 255) document.dispatchEvent(event);if (Math.max(...ctx.getImageData(120, 95, 30 + inc, 1).data) == 255) document.dispatchEvent(event);if (Runner.instance_.crashed) { inc = -30; Runner.instance_.restart() };if (Runner.instance_.paused) Runner.instance_.play();}, 2);var sec = setInterval(function () {if (inc < 100) inc = (inc + 0.1)}, 300);"
  });
});