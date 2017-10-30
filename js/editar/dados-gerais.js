class DadosGerais {
  constructor() {

  }

  montarEnderecoImovel(dadosGerais){
    var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
      dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
      dadosGerais.tx_nome_municipio, dadosGerais.tx_nome_uf, dadosGerais.tx_sigla_uf,
      "CEP: "+dadosGerais.nr_cep];
      var tx_endereco_completo = '';
      for (var i = 0; i < endereco.length-1; i++) {
        if (endereco[i] !== null){
              tx_endereco_completo += endereco[i] === '' ? '' : endereco[i]+', ';
        }
      }
      tx_endereco_completo += endereco[i] === 'CEP: null' ? 'Endereço não registrado.' : endereco[i]+'.';
      return tx_endereco_completo;
    }

  montarDadosGerais(json, util, dadosForm, React, ReactDOM, FormItem){
    var dadosGerais = util.validateObject(json.dados_gerais, "");
    var content = this.montarEnderecoImovel(dadosGerais)
    var dados_form =dadosForm.dadosGerais(dadosGerais, content);
    var items = dados_form.form_items;
    var headerPriority = '2';
    var formItens = [];

    for (var i=0; i<items.length; i++){
      formItens.push(util.FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: 'Dados Gerais'}, dados:formItens}
      ), document.getElementById("dados_gerais")
    );
  }

  metasObjetivosOsc(data, Checkbox, rotas, urlController, util){
    var objetivo_metas = util.validateObject(data.dados_gerais.objetivo_metas, "");
    var objetivos = {};
    for (var i = 0; i < objetivo_metas.length; i++) {
      var cd_objetivo = objetivo_metas[i].cd_objetivo_osc;
      objetivos[cd_objetivo] = objetivo_metas[i].tx_nome_objetivo_osc ;
    }

    var $divDadosGerais = $('#dados_gerais');
    $divDadosGerais.append('<label title="Indique se o PAP se relaciona com alguns dos objetivos do desenvolvimento sustentável, da ONU. Máximo três objetivos.">Objetivos do Desenvolvimento Sustentável - ODS - <a href="http://www.agenda2030.com.br/" target=_blank><img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a> </label>');
    $divDadosGerais.append('<div class="form-group" id="objetivosOsc-metas"</div>');
    $("#objetivosOsc-metas").append('<span class="input-group-btn"><button id="add_objetivo_ods" class="btn-primary btn">Adicionar Objetivo</button></span>');

      function returnFunctionObjetivoMetas(data){
        if(objetivo_metas == ""){
          criarObjetivosOsc(data,"",-1,-1,Checkbox);
          qtdObjODS++;
          numODS++;
        }
        else{
          for(var k in objetivos){
            var objetivo = util.validateObject(objetivos[k], -1);
            criarObjetivosOsc(data, objetivo_metas, objetivo, k,Checkbox);
            qtdObjODS++;
          }
        }
      }
      util.ajaxConsulta(urlController, rotas.Objetivos(), returnFunctionObjetivoMetas)

      $("#add_objetivo_ods").click(function(){
        if(qtdObjODS < limiteObjetivos){
            function returnFunctionObjetivoMetasLimite(data){
              criarObjetivosOsc(data,"",-1,-numODS,Checkbox);
              qtdObjODS++;
              numODS++;
            }
            util.ajaxConsulta(urlController, rotas.Objetivos(), returnFunctionObjetivoMetasLimite)
          }
      });
  }

}
