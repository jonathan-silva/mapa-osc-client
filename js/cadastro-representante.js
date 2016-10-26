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

  $("#cpf.form-control").blur(function (event, ui) {
    console.log(this.value);
  });


  console.log("chegou no final");


    });
});










jQuery.validator.addMethod("cpf", function(value, element) {
   value = jQuery.trim(value);
    value = value.replace('.','');
    value = value.replace('.','');
    cpf = value.replace('-','');
    while(cpf.length < 11) cpf = "0"+ cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return this.optional(element) || retorno;

}, "Informe um CPF válido");


$(document).ready(function(){

   $("#form-dados").validate({
      rules: {
          cpf: {cpf: true, required: true}
      },
      messages: {
         cpf: { cpf: 'CPF inválido'}
      }
      ,submitHandler:function(form) {
         alert('ok');
      }
   });
});
