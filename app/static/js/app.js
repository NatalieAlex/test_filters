$(function() {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();

    /* Fixed Header */
    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if( scrollOffset >= introH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* Smooth scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });

    /* Collapse */
    $("[data-collapse]").on("click", function(event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('collapse');

        $this.toggleClass("active");
    });

});

/* App */
var img = new Image();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fileName = '';
$("#upload-file").on("change", function(){
    var file = document.querySelector('#upload-file').files[0];
    var reader = new FileReader();
    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }
    reader.addEventListener("load", function () {
        img = new Image();
        img.src = reader.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            $("#canvas").removeAttr("data-caman-id");
        }
    }, false);
});

$('#download-btn').on('click', function (e) {
    var fileExtension = fileName.slice(-4);
    if (fileExtension == '.jpg' || fileExtension == '.png') {
        var actualName = fileName.substring(0, fileName.length - 4);
    }
    download(canvas, actualName + '-edited.jpg');
});
function download(canvas, filename) {
    var  e;
    var lnk = document.createElement('a');
    
    lnk.download = filename;
    lnk.href = canvas.toDataURL("image/jpeg", 0.8);
    
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);
    }
    else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}

$(document).ready(function() {
    $("#brightness-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.brightness(10).render();
      });
    });
  
    $("#brightness-dec").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.brightness(-10).render();
      });
    });
  
    $("#contrast-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.contrast(10).render();
      });
    });
  
    $("#contrast-dec").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.contrast(-10).render();
      });
    });
  
    $("#saturation-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.saturation(10).render();
      });
    });
  
    $("#saturation-dec").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.saturation(-10).render();
      });
    });
  
    $("#exposure-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.exposure(10).render();
      });
    });
  
    $("#exposure-dec").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.exposure(-10).render();
      });
    });
  
    $("#noise-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.noise(10).render();
      });
    });
  
    $("#sharpen-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.sharpen(10).render();
      });
    });
  
    $("#sepia-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.sepia(20).render();
      });
    });
  
    $("#blur-inc").on("click", function(e) {
      Caman("#canvas", img, function() {
        this.stackBlur(5).render();
      });
    });

  
    $("#download-btn").on("click", function(e) {
      var fileExtension = fileName.slice(-4);
      if (fileExtension == ".jpg" || fileExtension == ".png") {
        var actualName = fileName.substring(0, fileName.length - 4);
      }
      download(canvas, actualName + "-edited.jpg");
    });
  
    $("#upload-file").on("change", function() {
      var file = document.querySelector("#upload-file").files[0];
      var reader = new FileReader();
  
      if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
      }
  
      reader.addEventListener(
        "load",
        function() {
          img = new Image();
          img.src = reader.result;
          img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            $("#canvas").removeAttr("data-caman-id");
          };
        },
        false
      );
    });
  });
  
  function download(canvas, filename) {
    var e;
    var lnk = document.createElement("a");
  
    lnk.download = filename;
  
    lnk.href = canvas.toDataURL("image/jpeg", 0.8);
  
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }