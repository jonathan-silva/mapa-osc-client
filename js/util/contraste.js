function desativaContraste() {
  createCookie("contraste",false,1);
}

function ativaContraste() {
  createCookie("contraste",true,1);
}

function ativarCSSContraste() {
  $("body" ).css( "background-color", "#000000" );
  $("body" ).css( "color", "#ffffff" );
  $("a").css( "color", "#FFF333" );
  $("hr").css( "border-color", "#ffffff" );
  $("legend" ).css( "color", "#ffffff" );
  $("footer" ).css( "background-color", "#000000" );
  $(".partners").css( "background-color", "#000000" );
  $(".navbar-default").css( "background-color", "#000000" );
  $(".navbar-default").css( "border-bottom", "4px solid #ffffff" );
  $(".capacho").css( "border-left", "1px dotted #ffffff" );
  $(".dropdown-menu").css( "background-color", "#000000");
  $(".dropdown-menu").css( "border", "1px solid #ffffff");
  $(".modal-content").css( "background-color", "#000000");
  $(".modal-content").css( "border", "1px solid #ffffff");
  $(".subTitulo" ).css( "background-color", "#000000" );
  $(".pagination" ).find("a").css( "background-color", "#000000" );
  $(".ui-widget-content").css( "background-color", "#000000" );
  $(".ui-widget-content").css( "color", "#ffffff" );
  $(".btn-link").css( "color", "#FFF333" );
  $("#barra-brasil" ).css( "background-color", "#000000" );
  $("#topo_acessibilidade").css( "background-color", "#000000" );
  $(".tablesaw tr").css( "background-color", "#000000" );
  $(".sorting_1").css( "background-color", "#000000" );
  $(".table-responsive tr").css( "background-color", "#000000" );
  $(".panel-heading").css("background-color", "#333333");
  $(".panel-default").css("border-color","#ffffff");
  $(".panel-body").css("background-color", "#000000");
  $("#buscarPerfil li a").on({
    click:function (){
      $(".nav-pills a").css("background-color", "#000000");
      $(this).css("background-color", "#337cbb");
    }, mouseover: function(){
        $(this).css("background-color", "#333333");
    }, mouseout: function(){
        $(this).css("background-color", "#000000");
        $(".nav-pills .active a").css("background-color", "#337cbb");
  }
  });
  $("#projetos .header").css("background-color", "#4682b4");
  $(".table-striped tr").css("background-color", "#000000");
  $("#selecao li > a").on({
    mouseover: function(){
      $(this).css("background-color", "#333333");
    }, mouseout: function(){
      $(this).css("background-color", "#000000");
    }
  });
  $("#navbar-ex-collapse li > a").on({
    mouseover: function(){
      $(this).css("color", "#337cbb");
    }, mouseout: function(){
      $(this).css("color", "#fff331");
    }
  });
  $(".dropdown-toggle").on({
      click:function (){
      $(this).css("color", "#337cbb");
      $(this).css("background-color", "#000000");
    }, mouseover: function(){
      $(this).css("color", "#337cbb");
    }, mouseout: function(){
      $(this).css("color", "#fff331");
    }
  });

}

function verificarContraste(){
  	if(readCookie("contraste") == "true"){
      ativarCSSContraste();
    }
}

verificarContraste();
