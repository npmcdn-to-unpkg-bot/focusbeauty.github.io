var bgImageArray = [
      {% for bg in site.static_files %}{% if bg.path contains 'assets/portfolio' %}'{{ bg.path }}?{{bg.modified_time | date: "%Y-%m-%d-%H-%M-%S"}}',{% endif %}{% endfor %}
    ];

$( function() {
  var $container = $('#photo-container').masonry({
    itemSelector: '.item',
    columnWidth: 350,
    gutter: 10
  });
  $container.masonryImagesReveal( getItems(bgImageArray) );
});

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
