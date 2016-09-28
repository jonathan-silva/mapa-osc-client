require(['jquery-ui'], function (React) {

  var icons = {
    header: "ui-icon-circle-arrow-e",
    activeHeader: "ui-icon-circle-arrow-s"
  };
  $("#accordion").accordion({
     collapsible: true,
     heightStyle: "content",
     icons: icons
  });
  $( "#toggle" ).button().on( "click", function() {
    if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
      $( "#accordion" ).accordion( "option", "icons", null );
    } else {
      $( "#accordion" ).accordion( "option", "icons", icons );
    }
  });
});
