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

    function criarObjetivosOsc(data, objetivo_metas, objetivo, cd_objetivo, Checkbox){
      function carregaEventoMetasOsc(cd_objetivo, Checkbox){
        function loadMetasOsc(cd_objetivo, cd_metas, Checkbox){
          function returnFunctionMontarMetas(data){
            util.montarMetasOsc(data, cd_objetivo, cd_metas, Checkbox);
          }
          util.ajaxConsulta(urlController, rotas.MetaProjeto(cd_objetivo), returnFunctionMontarMetas)
        }

        $("#objetivosOsc-"+cd_objetivo).find('select').on('change', function(){
          cd_objetivo = $(this).children(":selected").attr("id")
          var contemObjetivo = false;
          $(".objetivosOsc").each(function() {
            if($( this ).hasClass( 'objetivosOsc-'+cd_objetivo )){
              contemObjetivo = true;
            }
          });

          if(contemObjetivo){
            id_cd_objetivo = $(this).parent().attr('for');
            $('#metasOsc-'+id_cd_objetivo).remove();
          }
          else {
            id_cd_objetivo = $(this).parent().attr('for');
            $(this).parent().attr('for', cd_objetivo);
            $('.label-objetivosOsc-'+id_cd_objetivo).removeClass('label-objetivosOsc-'+id_cd_objetivo).addClass('label-objetivosOsc-'+cd_objetivo);
            $('.objetivosOsc-'+id_cd_objetivo).removeClass('objetivosOsc-'+id_cd_objetivo).addClass('objetivosOsc-'+cd_objetivo);
            $('#metasOsc-'+id_cd_objetivo).remove();
            $(this).parent().append('<div id="metasOsc-'+cd_objetivo+'" class="metasOsc"></div>');
            $('#metasOsc-'+cd_objetivo).append('<br><label title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</label><br>');
            $('#metasOsc-'+cd_objetivo).append('<ol id="selectableOsc-'+cd_objetivo +'" class="selectable"></ol><br>');

            if(parseInt(cd_objetivo) !== 0){
              loadMetasOsc(cd_objetivo, [], Checkbox);
            }
          }
          verificarContraste();
        });
      }

      function loadMetasOsc(cd_objetivo, cd_metas, Checkbox){
        function returnFunctionMontarMetas(data){
          util.montarMetasOsc(data, cd_objetivo, cd_metas, Checkbox);
        }
        util.ajaxConsulta(urlController, rotas.MetaProjeto(cd_objetivo), returnFunctionMontarMetas)
      }
      $("#objetivosOsc-metas").append('<label title="Objetivo selecionado da ODS." class="label-objetivosOsc-'+cd_objetivo+'">Objetivo:</label>');
      $("#objetivosOsc-metas").append('<div id="objetivosOsc" class="objetivosOsc objetivosOsc-'+cd_objetivo+'"></div>');
      $(".objetivosOsc-"+cd_objetivo).append('<div class="form-group"><div id="objetivosOsc-'+cd_objetivo+'" for="'+cd_objetivo+'"><select class="form-control"></select></div></div>');
      $("#objetivosOsc-"+cd_objetivo).append('<div id="metasOsc-'+cd_objetivo+'" class="metasOsc"></div>');

      var $divMetasOsc = $("#objetivosOsc-metas").find("#metasOsc-"+cd_objetivo);
      if(cd_objetivo <= -1){
        $divMetasOsc.append('<br><label title="Marque as metas que se enquadram neste projeto" style="display:none">Metas Relacionadas ao ODS definido:</label><br>');
      }
      else{
        $divMetasOsc.append('<br><label title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:</label><br>');
      }
      $divMetasOsc.append('<ol id="selectableOsc-'+cd_objetivo +'" class="selectable"></ol><br>');

      function montarObjetivosOsc(json, cd_objetivo){
        var options = json;
        var $selectObjetivos = $('#objetivosOsc-'+cd_objetivo).find("select");
        if (cd_objetivo == -1 ) {
          $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
        }
        else {
          $selectObjetivos.append('<option value=-1 id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
        }

        for (var i = 0; i < options.length; i++) {
          if(options[i].cd_objetivo_projeto == cd_objetivo){
            $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
          } else {
            $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
          }
        }
      }
      montarObjetivosOsc(data, cd_objetivo);
      $("#objetivosOsc-"+cd_objetivo+" select").selectBoxIt({
         theme: "default",
         //defaultText: "Selecione abaixo...",
         autoWidth: false
       });

      $("#objetivosOsc-"+cd_objetivo+" select").selectBoxIt("refresh");

      var cd_metas = [];
      if(objetivo !== -1){
        for (var i = 0; i < objetivo_metas.length; i++) {
          if(cd_objetivo == objetivo_metas[i].cd_objetivo_osc){
            var cd_meta = objetivo_metas[i].cd_meta_osc;
            cd_metas.push(cd_meta);
          }
        }
        loadMetasOsc(cd_objetivo, cd_metas, Checkbox);
      }
      carregaEventoMetasOsc(cd_objetivo, Checkbox);
    }

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
