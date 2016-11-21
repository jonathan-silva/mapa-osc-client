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

}

function verificarContraste(){
  	if(readCookie("contraste") == "true"){
      ativarCSSContraste();
    }
}

verificarContraste();
