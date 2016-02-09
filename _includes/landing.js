var container = document.getElementsByClassName('container')[0],
    secs = 6,
    bgImageArray = [
      {% for bg in site.static_files %}{% if bg.path contains 'landing/background' %}'{{ bg.path }}?{{bg.modified_time | date: "%Y-%m-%d-%H-%M-%S"}}',{% endif %}{% endfor %}
    ];

bgImageArray.forEach(function(img){new Image().src = img;});

(function backgroundSequence() {
  window.clearTimeout();
  var k = 0;
  for (var i = 0; i < bgImageArray.length; i++) {
    setTimeout(function(){
      container.style.background = "url(" + bgImageArray[k] + ") 50% 50% / cover no-repeat fixed";
      container.style.backgroundSize ="cover";
      container.style.backgroundcolor = 'rgba(0,0,0,0.4)';

      if ((k + 1) === bgImageArray.length) {
        setTimeout(function() {backgroundSequence() }, (secs * 1000))
      } else {
        k++;
      }

    }, (secs * 1000) * i)
  }
})()
