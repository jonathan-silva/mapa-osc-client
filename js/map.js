require(['jquery'], function(){
  //carrega pontos em pedaços
  (function addXhrProgressEvent($) {
      var originalXhr = $.ajaxSettings.xhr;
      $.ajaxSetup({
          progress: function() { console.log("standard progress callback"); },
          xhr: function() {
              var req = originalXhr(), that = this;
              if (req) {
                  if (typeof req.addEventListener == "function") {
                      req.addEventListener("progress", function(evt) {
                          that.progress(evt);
                      },false);
                  }
              }
              return req;
          }
      });
  })(jQuery);

  var last_response_len = false;
  $.ajax({
      url: "js/pegadadosTeste.php",
      data: { limite: '100000' },
      type: "POST",
      dataType: "json",
      complete: function(dados) { //console.log(dados.responseText);
        console.log("FIM");
      },
      progress: function(dados) {
        var this_response, response = dados.currentTarget.response;
        if(last_response_len === false)
        {
            this_response = response;
            last_response_len = response.length;
        }
        else
        {
            this_response = response.substring(last_response_len);
            last_response_len = response.length;
        }
        console.log("-----------------------------------------------------------------------------");
        console.log(this_response);
      }

  });

});
