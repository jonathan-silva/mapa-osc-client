require(["jquery-ui"], function (React) {

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
});

require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type){
      this.id = id;
      this.label = label;
      this.type = type;
    }
    //formulario 1
    var hd = 'Verifique se a organização já está cadastrada no Mapa, informando o nome ou CNPJ.';
    var id = ['nomeEntidade'];
    var label = ['Nome ou CNPJ da Entidade'];
    var type = ['text'];
    var formItens = [];

    for (var i=0; i<id.length; i++){
      formItens.push(new FormItens(id[i], label[i],type[i]));
    }

    //formulario 2
    var hd2 = 'Informe seus dados de identificação.';
    var id2 = ['nome','email','cpf','senha','confirmarSenha'];
    var label2 = ['Nome','Email','CPF','Senha','Confirmar Senha'];
    var type2 = ['text','email','text','password','password'];
    var formItens2 = [];

    for (var j=0; j<id2.length; j++){
      formItens2.push(new FormItens(id2[j], label2[j],type2[j]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-org"));
    ReactDOM.render(FormItem({header:hd2, dados:formItens2}), document.getElementById("form-dados"));
   });



 //carregar dependendias e outras funcoes definidas
   require(['jquery-ui'], function (React) {
      $(".captcha input").checkboxradio();

      //autocomplete organizacao
      $("#nomeEntidade.form-control").autocomplete({
        minLength: 3,
        source: function (request, response) {
           console.log('teste');
           $.ajax({
               url: "http://mapaosc-desenv.ipea.gov.br:8383/api/search/osc/"+request.term,
               type: 'GET',
               dataType: "json",
               success: function (data) {

                 response($.map( data, function( item ) {
                    return {
                        label: item.tx_nome_osc,
                        value: item.tx_nome_osc,
                        id: item.id_osc
                    };
                }));
               },
               error: function () {
                   response([]);
               }
           });
       },
       select: function(event, ui){
         //$('.response').val(ui.item.tx_nome_osc);
         //console.log(ui);
       }
      });



    //Validacao dos campos
    $("#nome.form-control").blur(function (event, ui) {
      var nome = this.value;
      if(validaNome(nome)){
        var id_attr = "#" + $("#nome.form-control").attr("id") + "1";
        $("#nome.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
        $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
      }else{
        var id_attr = "#" + $("#nome.form-control").attr("id") + "1";
        $("#nome.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
        $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
      }
    });

    $("#email.form-control").blur(function (event, ui) {
      var email = this.value;
      if(validaEmail(email)){
          var id_attr = "#" + $("#email.form-control").attr("id") + "1";
          $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
          $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
      }else{
        var id_attr = "#" + $("#email.form-control").attr("id") + "1";
        $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
        $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
      }
    });


  $("#cpf.form-control").blur(function (event, ui) {
    var cpf = this.value;
    if (validaCPF(cpf)){
      var id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
      $("#cpf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
      $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
    }else{
      var id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
      $("#cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
      $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
    }
  });

  $("#confirmarSenha.form-control").blur(function (event, ui) {
    var confirmarSenha = this.value;
    var senha =  $('#senha').val();
    if ( confirmarSenha == senha){
      $("#senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
      $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
    }else{
      $("#senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
      $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
    }
  });

  //inicio btn.btn-success.click
  var div = $(".form-group");
  div.find(".btn.btn-success").on("click", function(){
        var nome =  $('#nome').val();
        var email =  $('#email').val();
        var cpf =  $('#cpf').val();
        var senha =  $('#senha').val();
        var confirmarSenha =  $('#confirmarSenha').val();
        var $modal = $('#modalMensagem');
        var id_attr = '';
        if ($('#termoUso').is(":checked")){ var termoUso = true ; } else {var termoUso = false;}
        if ($('#newsletter').is(":checked")){ var newsletter = true ; } else {var newsletter = false;}




      
        if (!validaNome(nome)){
          console.log("nome errado");
          id_attr = "#" + $("#nome.form-control").attr("id") + "1";
          $("#nome.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
          return false;
        };

        if (!validaEmail(email)){
          console.log("email errado");
          id_attr = "#" + $("#email.form-control").attr("id") + "1";
          $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
          return false;
        };

        if (!validaCPF(cpf)){
          console.log("cpf errado");
          id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
          $("#cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
          return false;
        };

        if ((senha == "")||(senha!=confirmarSenha)){
          console.log("senha errado");
          id_attr = "#" + $("#senha.form-control").attr("id") + "1";
          $("#senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

          id_attr = "#" + $("#confirmarSenha.form-control").attr("id") + "1";
          $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

          jQuery("#modalTitle").text("Problema no cadastro!");
          jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes.");
          $modal.modal('show');
          return false;
        };

        if (!termoUso){
          console.log("termouso errado");
          id_attr = "#" + $("#termoUso.form-control").attr("id") + "1";
          $("#termoUso.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
          $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
          jQuery("#modalTitle").text("Problema no cadastro!");
          jQuery("#modalConteudo").text("É necessário concordar com os termos de uso.");
          $modal.modal('show');
          return false;
        };

        //HB TODO: testar data: JSON.stringify({ "userName": userName, "password" : password })

        var json = '{'+
              '	"tx_email_usuario": "'+email+'", ' +
              '	"tx_senha_usuario": "'+senha+'",' +
              '	"tx_nome_usuario": "'+nome+'",' +
              '	"nr_cpf_usuario": "'+cpf+'",' +
              ' "bo_lista_email": '+newsletter+',' +
              '	"representacao":[ ' +
              '		{"id_osc": 1},' +
              '		{"id_osc": 2}'+
              ' ]}';

        console.log(json);

        $.ajax({
        url: "http://mapaosc-desenv.ipea.gov.br:8383/api/user/",
        type: 'POST',
        dataType: 'json',
        data: json,
        success: function (data, textStatus, jqXHR ) {
          console.log(data);
          console.log(textStatus);
          console.log(jqXHR);
          var $modal = $('#modalMensagem');
          $modal.modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(ajaxOptions);
            console.log(xhr.status);
            console.log(thrownError);
            var $modal = $('#modalMensagem');
            jQuery("#modalTitle").text("Problema no cadastro!");
            jQuery("#modalConteudo").text(thrownError);
            $modal.modal('show');
        }
     });
    });
    //final  btn.btn-success.click
    });
});


//FUNCOES DE VALIDACAO

function validaNome(nome){
  if(nome.length < 5){
    return false;
  }else{
    return true;
  }
}

function validaEmail(email){
  usuario = email.substring(0, email.indexOf("@"));
  dominio = email.substring(email.indexOf("@")+ 1, email.length);

  if ((usuario.length >=1) &&
  (dominio.length >=3) &&
  (usuario.search("@")==-1) &&
  (dominio.search("@")==-1) &&
  (usuario.search(" ")==-1) &&
  (dominio.search(" ")==-1) &&
  (dominio.search(".")!=-1) &&
  (dominio.indexOf(".") >=1)&&
  (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }else{
    return false;
  }
}

function validaCPF(cpf){
  exp = /\.|\-/g
  cpf = cpf.toString().replace( exp, "" );
  var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
  var soma1=0, soma2=0;
  var vlr =11;

  for(i=0;i<9;i++){
          soma1+=eval(cpf.charAt(i)*(vlr-1));
          soma2+=eval(cpf.charAt(i)*vlr);
          vlr--;
  }
  soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
  soma2=(((soma2+(2*soma1))*10)%11);
  var digitoGerado=(soma1*10)+soma2;

  if(digitoGerado!=digitoDigitado){
    return false;
  }else{
    return true;
  }
}
