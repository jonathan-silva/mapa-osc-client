require(['react', 'jsx!components/Util', 'jquery-ui', 'rotas', 'tagsinput'], function(React) {
    //require(["jquery-ui", "rotas", "bootstrap"], function (React) {


    //pegar o token da url
    var valoresURL = window.location.href.split('?')[1] !== undefined ? window.location.href.split('?')[1].split('=') : null;
    var tipoConsulta;
    var token;
    if (valoresURL == null) {
        pagInicial();
        return;
    };
    tipoConsulta = valoresURL[0];
    token = valoresURL[1];
    token = token.replace(/\./g, "");
    token = token.split('#')[0];
    if (!token || tipoConsulta != "token") {
        pagInicial();
        return;
    }


    //monta o formulário
    require(['componenteFormItem'], function(FormItem) {
        function FormItens(id, label, type, obrigatorio) {
            this.id = id;
            this.label = label;
            this.type = type;
            this.obrigatorio = obrigatorio;
            this.fonte = false;
        }
        //formulario 1
        var hd = 'Dados de Identificação.';
        var id = ['senha', 'confirmarSenha'];
        var label = ['Senha', 'Confirmar Senha'];
        var type = ['password', 'password'];
        var obrigatorio = [true, true];
        var formItens = [];

        for (var j = 0; j < id.length; j++) {
            formItens.push(new FormItens(id[j], label[j], type[j], obrigatorio[j]));
        }
        FormItem = React.createFactory(FormItem);
        ReactDOM.render(FormItem({
            header: hd,
            dados: formItens
        }), document.getElementById("form-dados"));
    });


    var $id_osc = '';
    var rotas = new Rotas();
    var limiteAutocomplete = 10;
    var controller = "js/controller.php";
    var $modal = $('#modalMensagem');


    $('#send').on('click', function() {

            var senha = $('#senha').val();
            var confirmarSenha = $('#confirmarSenha').val();
            var error = true;

            if ((senha == "") || (senha != confirmarSenha)) {
                $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Os valores da senha e da confirmação são diferentes!</span></div>');
                return false;
            }

            if (senha.length <= 5) {
                $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Erro: Senha menor que 6 caracteres!</span></div>');
                return false;
            }

            $("#senha").closest('.form-group').removeClass('has-error').addClass('has-success');
            $("#confirmarSenha").closest('.form-group').removeClass('has-error').addClass('has-success');


            var json = {
                "tx_senha_usuario": senha,
                "tx_token": token
            };


            $.ajax({
                 url: controller,
                 type: 'POST',
                 dataType: 'json',
                 data: {flag: 'consultaPost', rota: rotas.AlterarSenha(), parametros: json},
                 error:function(data){
                   if (data.status == 200){
                     jQuery("#modalTitle").text("Sucesso");
                     jQuery("#modalConteudo").text("Alteração realizada com sucesso!");
                     $modal.modal('show');
                     pagInicial();
                   }else{
                     jQuery("#modalTitle").text("Problema na solicitação!");
                     jQuery("#modalConteudo").text(JSON.parse(data.responseText).msg);
                     $modal.modal('show');
                     return false;
                   }
                 },
                 success: function(data){
                   jQuery("#modalTitle").text("Sucesso");
                   jQuery("#modalConteudo").text("Alteração realizada com sucesso!");
                   $modal.modal('show');
                   pagInicial();
                 }
             }); //final envio ajax
        });
    });



function pagInicial() {
    link = "./index.html";
    location.href=link;
};

function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÉÈÊË]/g, "E");
    str = str.replace(/[éèêë]/g, "e");
    str = str.replace(/[ÍÌÎÏ]/g, "I");
    str = str.replace(/[íìîï]/g, "i");
    str = str.replace(/[ÓÒÔÕ]/g, "O");
    str = str.replace(/[óòôõ]/g, "o");
    str = str.replace(/[ÚÙÛÜ]/g, "U");
    str = str.replace(/[úùûü]/g, "u");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");
    return str;
}
