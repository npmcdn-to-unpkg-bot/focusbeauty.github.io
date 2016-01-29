window._lload("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js", jqueryLoaded)

function jqueryLoaded(){
  window._lload("https://cdn.rawgit.com/desandro/masonry/22e9953eaa0726f9ee019937be448d33d80ff92b/dist/masonry.pkgd.min.js", masonryLoaded)
  $.fn.masonryImagesReveal = function( $items ) {
    var msnry = this.data('masonry');
    var itemSelector = msnry.options.itemSelector;
    // hide by default
    $items.hide();
    // append to container
    this.append( $items );
    $items.imagesLoaded().progress( function( imgLoad, image ) {
      // get item
      // image is imagesLoaded class, not <img>, <img> is image.img
      var $item = $( image.img ).parents( itemSelector );
      // un-hide item
      $item.show();
      // masonry does its thing
      msnry.appended( $item );
    });

    return this;
  };
}

function masonryLoaded(){
  window._lload("https://npmcdn.com/imagesloaded@4.1/imagesloaded.pkgd.min.js", done)
}

function done() {
  $( function() {
    var $container = $('#photo-container').masonry({
      itemSelector: '.item',
      columnWidth: 350,
      gutter: 10
    });
    $container.masonryImagesReveal( getItems(imageArray) );
  });
}

function getItem(path) {
  return '<div class="item"><img src="'+ path + '" /></div>';
}

function getItems(paths) {
  var items = '';
  for (var i = 0; i < paths.length; i++) {
    items += getItem(paths[i]);
  }
  // return jQuery object
  return $( items );
}
