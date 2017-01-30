define('componenteBlocoDeTexto', ['react'], function (React) {
  var BlocoTexto = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <div className="bloco">
            <h5>{this.props.dados[i].titulo}</h5>
            <div className="texto">{this.props.dados[i].formato}</div>
          </div>
        );
      }
      return items;
    },
    render: function() {
      return (<div>{this.renderListItems()}</div>);
    }
  });

  return BlocoTexto;
});

define('componenteCabecalho', ['react'], function (React) {
  var Cabecalho = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <div className="cabeca">
          <h2>Nome: {this.props.dados[i].Nome}</h2>
          <h3>CNPJ: {this.props.dados[i].cd_nur}</h3>
          <h3>Natureza Jurídica: {this.props.dados[i].NatJur}</h3>
          </div>
        );
      }
      return items;
    },
    render: function() {
      return (<div>{this.renderListItems()}</div>);
    }
  });

  return Cabecalho;
});

define('componenteResultadoDaConsulta', ['react'], function (React) {
  var ResultadoConsulta = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <tr>
            <th scope="row">
              <a href="#" className="pull-left"><img className="img-circle media-object" src={this.props.dados[i].imagem} height="64" width="64"></img></a>
            </th>
            <td className="title">{this.props.dados[i].nome}</td>
            <td>{this.props.dados[i].cnpj}</td>
            <td>{this.props.dados[i].natjur}</td>
            <td>{this.props.dados[i].end}</td>
            <td>
              <button type="button" className="btn btn-info" href="perguntas-frequentes.html" >Detalhar
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            </td>
          </tr>
        );
      }
      return items;
    },
    render: function() {
      return (

        <table className="tablesaw table-hover" data-tablesaw-sortable data-tablesaw-sortable-switch>
          <thead>
            <tr>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="persist"></th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="1" data-tablesaw-sortable-default-col>Nome da OSC</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="4">CNPJ</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Natureza Jurídica</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3">Endereço</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3">Detalhar</th>
            </tr>
          </thead>
          <tbody>
           {this.renderListItems()}
           </tbody>
       </table>

        );
    }
  });

  return ResultadoConsulta;
});

define('componenteLinksUteis', ['react'], function (React) {

  var LinksUteis = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <li className="media">
              <a className="pull-left" href={this.props.dados[i].elo} target="_blank">
               <img className="media-object img-circle" src={this.props.dados[i].imagem} height="64" width="64"></img></a>
              <div className="media-body">
                  <h4 className="media-heading">
                   <a className="btn-link" href={this.props.dados[i].elo} target="_blank">
                    {this.props.dados[i].titulo}</a>
                    <img className="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo."></img>
                    </h4>
                  <p>{this.props.dados[i].desc}</p>
              </div>
          </li>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
         <h4 className="h4-texto">Relação de links úteis</h4>
         <ul className="media-list">{this.renderListItems()}
         </ul>
        </div>
       );
    }
  });

  return LinksUteis;
});

define('componenteGlossario', ['react'], function (React) {

  var Glossario = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <li className="media glossario">
              <div className="media-left">
                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{this.props.dados[i].topico}</h4>
                <p>{this.props.dados[i].desc}</p>
              </div>
          </li>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
          <ul className="media-list">{this.renderListItems()}
         </ul>
        </div>
       );
    }
  });

  return Glossario;
});

define('componenteAccordion', ['react'], function (React) {

  var accordion = React.createClass({

    renderListParagrafo: function(i){
      var paragrafos=[];
      for (var j=0; j<this.props.dados[i].desc.length; j++){
          paragrafos.push(
            <p>{this.props.dados[i].desc[j]}</p>
          );
      }
      return paragrafos;
    },
    renderListItems: function(){
      var items=[];
      var style = {float: 'right'};
      for (var i=0; i<this.props.dados.length; i++){
        var heading = "heading_"+i;
        var idColapse= "collapse_"+i;
        items.push(
          <div className="panel panel-default">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#"+idColapse} aria-expanded="true" aria-controls={"#"+idColapse}>
              <div className="panel-heading" role="tab" id={heading}>
                <h4 className="panel-title"><b>{this.props.dados[i].topico}</b><span className="glyphicon glyphicon-plus" style={style} aria-hidden="true"></span></h4>
              </div>
            </a>
            <div id={idColapse} className="panel-collapse collapse" role="tabpanel" aria-labelledby={heading}>
              <div className="panel-body">{this.renderListParagrafo(i)}</div>
            </div>
          </div>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">{this.renderListItems()}</div>
        </div>
       );
    }
  });

  return accordion;
});


define('componenteDropdown', ['react'], function (React) {
  var Dropdown = React.createClass({
    getInitialState:function(){
        return {selectValue:this.props.list[0]};
    },
    handleChange: function(e){
      this.setState({selectValue: e.target.value});
    },
    renderListItems: function () {
      var items = [];
      items.push(<option value={null} selected>Selecione uma opção...</option>);
      for(var i=0; i<this.props.list.length; i++){
        var val = this.props.list[i];
        if (val == this.props.selected) {
          items.push(<option value={val} selected>{val}</option>);
        } else {
          items.push(<option value={val}>{val}</option>);
        }
      }

      return items;
    },
      render: function() {
          return (
            <div>
             <select id={this.props.id} className="form-control">
                {this.renderListItems()}
              </select>
            </div>
          );
      }
  });

  return Dropdown;
});

define('componenteCheckbox', ['react'], function (React) {
  var Checkbox = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var inputElement;
        var checkboxElement;
        if(item.value == "outros"){
          inputElement = <input id={item.value} placeholder="Por favor, especifique" type="text" size="50"></input>
          checkboxElement =
          <div className="input-box checkbox">
            <label>
              {item.label+": "}
              {inputElement}
            </label>
          </div>
        } else {
          checkboxElement =
          <div className="input-box checkbox">
            <label>
              <input type="checkbox" value={item.value}>
              </input>
              {item.label}
            </label>
          </div>
        }
        itens.push(
          checkboxElement
        );
      }
      return itens;
    },


      render: function() {
          return (
            <div className="checkbox">{this.renderListItems()}</div>
          );
      }
  });

  return Checkbox;
});

define('componenteFormItem', ['react','componenteDropdown','componenteCheckbox'], function (React, Dropdown, Checkbox) {
  var FormItem = React.createClass({
    renderListItems: function(){
      var items=[];
      if(this.props.header){
        var HeaderElement = `h${this.props.header.priority}`;
        items.push(<HeaderElement>{this.props.header.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + this.props.header.text} data={this.props.header.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>);
      }
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        var placeholder = item.placeholder;
        var content = item.content;
        if(((content == null) || (content === "")) && (item.placeholder != undefined)){
          placeholder = item.placeholder;
          content = "";
        }
        if((item.id === undefined) || (item.id === null)){
          item.id = "";
        }
        var titleSpanFonte = "Informação preenchida pela Organização";
        var SpanFonte = <span className="fonte-de-dados dado-organizacao" title={titleSpanFonte}><img className="imgDadoEditavel" src="img/dado_representante.png"></img></span>
        if((item.fonte) && (item.type== 'p')){
          titleSpanFonte = "Informação oficial, Fonte " + item.fonte;
          SpanFonte = <span className="fonte-de-dados dado-oficial" title={titleSpanFonte}><img className="imgDadoOficial" src="img/base_dados.png"></img></span>
        }
        else if (item.fonte == false) {
            SpanFonte = "";
        }

        var custom_class = "";
        if(item.custom_class){
          custom_class = " "+item.custom_class;
        }
        var ContentElement;
        if(item.type == 'p'){
          ContentElement =
          <div className="input-box">
            <p className="form-control-static" id={item.id}>{content}</p>
            {SpanFonte}
          </div>
        } else if(item.type == 'textarea') {
          ContentElement =
          <div className="input-box">
            <textarea className="form-control" id={item.id} placeholder={placeholder} defaultValue={content}></textarea>
            {SpanFonte}
          </div>
        } else if(item.type == 'select'){
          var className = "input-box"+ custom_class;
          ContentElement =
          <div className={className}>
            <Dropdown list={item.options} id={item.id} selected={item.content}></Dropdown>
            {SpanFonte}
          </div>
        } else if(item.id == "tx_endereco_eletronico_sugerido"){
          ContentElement =
          <div className="input-box">
            <input className="form-control with-pretext" id={item.id} placeholder={placeholder} type={item.type} defaultValue={content}></input>
            <span className="pre-text">{item.pretext}</span>
            {SpanFonte}
          </div>
        } else if(item.type == "checkbox"){
          ContentElement = <Checkbox dados={item.options}></Checkbox>
        } else if(item.areas){
          var areas = item.areas;
          var subareas = item.subareas;
          var className = "form-control"+custom_class;
          var itensCheckBox = [];
          for (var j = 0; j < areas.length; j++) {
            var subset = [];
            var cd_area = areas[j].cd_area_atuacao;
            for (var k = 0; k < subareas.length; k++) {
              if(cd_area == subareas[k].cd_area_atuacao){
                subset.push(subareas[k]);
              }
            }
            itensCheckBox.push(<div id = {"subareas-"+cd_area} className="hidden"><Checkbox dados={subset}></Checkbox></div>)
          }

          ContentElement =
          <div className="input-box">
            <input className={className}  id={item.id} placeholder={placeholder} type={item.type}></input>
            {SpanFonte}
            <div className="checkboxList">{itensCheckBox}</div>
          </div>
        } else if (item.type == 'tel'){
         ContentElement =
         <div id={item.id}>
           <input id={item.id} type="tel" className="form-control" placeholder={placeholder} defaultValue={content}></input>
         </div>
       } else {
          if(item.id.toString().substring(0,2) === "dt"){
            if(item.label.substring(0,3) === "Ano"){
              custom_class += " ano";
            } else {
              custom_class += " date";
            }
          }
          var className = "form-control "+custom_class;
          ContentElement =
          <div className="input-box">
            <input className={className}  id={item.id} placeholder={placeholder} type={item.type} defaultValue={content}></input>
            {SpanFonte}
          </div>
        }
        var labelElement;

        function contains( substring, string ) {
          if (typeof string === 'string'){
            return string.indexOf(substring)>=0;
          } else {
            return false;
          }
        }
        if(item.label){
          var obrigatorio;
          if(item.obrigatorio){
            obrigatorio = <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span>;
          }
          labelElement = <label className="control-label" for={item.id}>{item.label}: {obrigatorio}</label>
          /*if(item.id=="tx_endereco_eletronico_sugerido"){
            labelElement = <label className="control-label" for={item.id} title="Defina um nome que vai constar como link para esta página da OSC , que poderá divulgá-lo como endereço oficial do Mapa">{item.label}:</label>
          }*/
          if(item.id=="estadual") {
            labelElement = <label className="control-label" for={item.id} title="As parcerias voluntárias entre a administração pública do nível estadual e as organizações civis.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="federal") {
            labelElement = <label className="control-label" for={item.id} title="As parcerias voluntárias entre a administração pública do nível federal e as organizações civis.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="municipal") {
            labelElement = <label className="control-label" for={item.id} title="As parcerias voluntárias entre a administração pública do nível municipal e as organizações civis.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="empresas_publicas") {
            labelElement = <label className="control-label" for={item.id} title="Empresa pública é pessoa jurídica de direito privado, constituída por capital exclusivamente público e podendo ser constituída em qualquer uma das modalidades empresariais. Sociedade de economia mista é pessoa jurídica de direito privado, constituída por capital público e privado. A parte do capital público deve ser maior, pois a maioria das ações deve estar sob o controle do Poder Público.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          /*
          if(item.id=="recursos_privados-2016"){
            console.log(item.id);
            labelElement = <label className="control-label" for={item.id} title="Indique se houve recursos captados de fontes privadas">{item.label}:</label>
          }*/
          if(item.id=="oscs_brasileiras") {
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias formais ou informais com outras OSCs (fundações privadas ou associações privadas) brasileiras, com a exceção de organizações religiosas.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="oscs_estrangeiras"){
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias formais ou informais com outras OSCs (fundações privadas ou associações privadas) estrangeiras, com a exceção de organizações religiosas.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="religiosas_brasileiras"){
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias formais ou informais com OSCs que sejam organizações religiosas brasileiras.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="religiosas_estrangeiras"){
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias formais ou informais com OSCs que sejam organizações religiosas estrangeiras.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="empresas_brasileiras"){
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias com empresas privadas brasileiras por meio das quais as empresas cedem os recursos necessários (físicos, financeiros e/ou humanos) para a execução de um determinado projeto.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="empresas_estrangeiras"){
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias com empresas privadas estrangeiras por meio das quais as empresas cedem os recursos necessários (físicos, financeiros e/ou humanos) para a execução de um determinado projeto.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
         if(item.header=="Link"){
            labelElement = <label className="control-label" for={item.header} title="Insira um link para a página do projeto, se houver.">{item.label}:</label>
          }
          if(item.id=="estrangeiros"){
            labelElement = <label className="control-label" for={item.header} title="Acordos de cooperação podem ser firmados com governos estrangeiros em diversos campos de atividades, não havendo nenhum tipo de repasse financeiro.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="multilaterais"){
            labelElement = <label className="control-label" for={item.header} title="Acordos de cooperação podem ser firmados com organizações multilaterais em diversos campos de atividades, não havendo nenhum tipo de repasse financeiro. Exemplos de organizações multilaterais são as Nações Unidas, o Banco Mundial e o Banco Interamericano de Desenvolvimento.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="premios"){
            labelElement = <label className="control-label" for={item.header} title="Prêmios recebidos na forma de bens ou valores monetários pela OSC como reconhecimento de quaisquer méritos da organização.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="doacoes_pf"){
            labelElement = <label className="control-label" for={item.header} title="Doações recebidas de indivíduos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="doacoes_pj"){
            labelElement = <label className="control-label" for={item.header} title="Doações recebidas de empresas, associações, órgãos públicos, igrejas ou outros tipos de organizações.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="doacoes_servicos"){
            labelElement = <label className="control-label" for={item.header} title="As doações recebidas pela OSC na forma de produtos ou serviços com nota fiscal podem ser contabilizadas pelo valor da nota fiscal.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="voluntariado"){
            labelElement = <label className="control-label" for={item.header} title="O voluntário é o indivíduo que dedica parte de seu tempo à realização de atividades não remuneradas de diversos tipos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="doacoes_recebidas"){
            labelElement = <label className="control-label" for={item.header} title="Doações recebidas pela OSC na forma de produtos ou serviços sem nota fiscal.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="patrimoniais"){
            labelElement = <label className="control-label" for={item.header} title="Fundos patrimoniais são estruturas que oferecem sustentabilidade financeira a uma organização sem fins lucrativos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="reservas"){
            labelElement = <label className="control-label" for={item.header} title="Os fundos de reserva são frequentemente usados pelas organizações no atendimento emergencial de despesas ordinárias do dia a dia da entidade.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="mensalidades"){
            labelElement = <label className="control-label" for={item.header} title="Contribuição financeira para a sustentabilidade da organização, seja periodicamente (por meio de mensalidades ou anuidades, por exemplo) ou de outro modo.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="venda"){
            labelElement = <label className="control-label" for={item.header} title="Esta é uma das formas de captação mais utilizadas pelas organizações, já que os produtos podem ser confeccionados pela própria instituição.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="servicos"){
            labelElement = <label className="control-label" for={item.header} title="Atividades realizadas por uma organização com o fim de atendimento do beneficiário de ações sociais pode retornar dividendos para a entidade.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="bens"){
            labelElement = <label className="control-label" for={item.header} title="Cessão onerosa da marca associada a uma organização civil para empresas privadas que, em troca, pagam royalties ou direitos autorais.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="isencoes"){
            labelElement = <label className="control-label" for={item.header} title="A isenção fiscal é a dispensa de tributo por meio de lei realizada pelo ente federativo competente para institui-lo.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="imunidades"){
            labelElement = <label className="control-label" for={item.header} title="A imunidade é uma limitação constitucional ao poder de tributar, ou seja, nega ao Estado o poder de tributar pessoas ou organizações definidas como imunes.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          if(item.id=="bens_recebidos"){
            labelElement = <label className="control-label" for={item.header} title="Bens cedidos por um doador a um donatário, de modo que este fica obrigado a manter e cuidar dos bens doados, sem que tenha, no entanto, direito pleno ao bem, mas apenas direito de uso em relação a ele.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
        }
        var className = "form-group";
        if (item.hide){
          className += " hidden";
        }
        items.push(
          <div className={className}>
            {labelElement}
            {ContentElement}
          </div>
        );
      }
    //  item.push(</form>);
      return items;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItem;
});

define('componenteSection', ['react'], function (React) {
  var Section = React.createClass({
    renderListItems: function(){
      var ano = this.props.ano;
      if(ano === undefined){
        ano = "";
      } else {
        ano = "-"+ano;
      }
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var HeaderElement = `h${item.priority}`;

        var ButtonElement;
        var containerClass = "";
        if(item.add_element){
          ButtonElement = <button className="btn-primary btn">Adicionar Projeto</button>
        }
        if(item.container_class){
          containerClass = item.container_class;
        }
        if (item.text == "Fonte de recursos anual da OSC" || item.text =="Espaços de Participação Social" || item.text == "Relações de Trabalho e Governança" || item.text =="Projetos, atividade e programas") {
          itens.push(
            <div>
              <div className={containerClass}>
                <HeaderElement>{item.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + item.text} data={item.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>
                {ButtonElement}
              </div>
              <div id={item.id+ano}></div>
            </div>
          );
        }
        else{
        itens.push(
          <div>
            <div className={containerClass}>
              <HeaderElement>{item.text}</HeaderElement>
              {ButtonElement}
            </div>
            <div id={item.id+ano}></div>
          </div>
        );
      }

      }

      return itens;
    },


      render: function() {
          return (
            <div className="sections">{this.renderListItems()}</div>
          );
      }
  });

  return Section;
});

define('componenteAgrupador', ['react', 'componenteFormItem'], function (React, FormItem) {
  var Agrupador = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="dirigente">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 2 == 0)){
          itens.push(
            <div className="dirigente">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }

      //items.push(<HeaderElement>{this.props.header.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + this.props.header.text} data={this.props.header.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>);

  });

  return Agrupador;
});

define('componenteAgrupadorConferencia', ['react', 'componenteFormItem'], function (React, FormItem) {
  var AgrupadorConferencia = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="conferencia">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 3 == 0)){
          itens.push(
            <div className="conferencia">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return AgrupadorConferencia;
});

define('componenteAgrupadorConselhos', ['react', 'componenteFormItem'], function (React, FormItem) {
  var Agrupador = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="conselho">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 6 == 0)){
          itens.push(
            <div className="conselho">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return Agrupador;
});

define('componenteFormItemButtons', ['react', 'componenteFormItem'], function (React, FormItem) {
  var FormItemButtons = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var ButtonElement;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        if(item.default){
          ButtonElement = <button className="btn-primary btn">Adicionar</button>
        } else {
          ButtonElement = <button className="btn-danger btn">Remover</button>
        }
        itens.push(
          <div>
            <FormItem dados={[item]}></FormItem>
            {ButtonElement}
            <hr/>
          </div>
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItemButtons;
});

define('componenteFormItemProjeto', ['react', 'componenteFormItemButtons'], function (React, FormItemButtons) {
  var FormItemProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;

      var ButtonElement;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var className = item.className;
        var label = item.label;
        var inputType = item.type;
        var value = item.value;
        var buttonValue = item.buttonValue;
        var buttonType = item.buttonType;
        var type = item.type;

        if(buttonType == "add"){
          ButtonElement = <button className="btn-primary btn">Adicionar</button>
        }
        if(buttonType == "remove") {
          ButtonElement = <button className="btn-danger btn">Remover</button>
        }
        itens.push(
          <div>
            <div className="header">{label}</div>
            <div className="form-group">
              <FormItemButtons dados={[item]}></FormItemButtons>
              {ButtonElement}
            </div>
          </div>
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItemProjeto;
});

define('componenteFormButtonProjeto', ['react'], function (React) {
  var FormButtonProjeto = React.createClass({
    getContainerClass: function(){
      if(this.props.inline){
        return "input-group-btn";
      }
      return "";
    },
    renderListItems: function(){
      var dados = this.props.dados;
      var ButtonElement;
      var itens = [];
      if(dados){
        for (var i = 0; i < dados.length; i++) {
          var item = dados[i];
          var type = item.type;
          var value = item.value;

          if(type == "add"){
            if(value === undefined){
              value = "Adicionar";
            }
            ButtonElement = <button className="btn-primary btn">{value}</button>
          }
          if(type == "remove") {
            if(value === undefined){
              value = "Remover";
            }
            ButtonElement = <button className="btn-danger btn">{value}</button>
          }
          itens.push(
            ButtonElement
          )
        }
      }
      return itens;
    },

      render: function() {
          return (
            <span className={this.getContainerClass()}>{this.renderListItems()}</span>
          );
      }
  });

  return FormButtonProjeto;
});

define('componenteFormInputProjeto', ['react', 'componenteFormButtonProjeto', 'componenteDropdown'], function (React, FormButtonProjeto, Dropdown) {
  var FormInputProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var id = item.id;
        var removable = item.removable;
        var content = item.content;
        var buttons = item.buttons;
        var inline = item.buttonsInLine;
        var type = item.type;
        var options = item.options;
        var placeholder = item.placeholder;

        if(content === undefined){
          content = "";
        }

        if(type == 'select'){
          var InputElement =
            <div id={id}>
              <Dropdown list={options} selected={content}></Dropdown>
            </div>
        } else if (type == 'textarea'){
          InputElement =
          <div id={id}>
            <textarea className="form-control" defaultValue={content} placeholder={placeholder}></textarea>
          </div>
        } else {
          var class_string = "form-control ";
          if(id.substring(0,2) === "dt"){
            if(id.substring(3,6) === "Ano"){
              class_string += "ano";
            } else {
              class_string += "date";
            }
          }
          var InputElement =
            <div id={id}>
              <input className={class_string} defaultValue={content} placeholder={placeholder}></input>
            </div>
        }

        if(removable){
          InputElement =
            <div id={id} className="input-group">
              {InputElement}
              <FormButtonProjeto dados={buttons} inline={inline}></FormButtonProjeto>
            </div>
        }
        itens.push(
          InputElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div id={this.props.dados[0] ? this.props.dados[0].id : "-1"} className="form-group">{this.renderListItems()}</div>
          );
      }
  });

  return FormInputProjeto;
});

define('componenteAgrupadorInputProjeto', ['react', 'componenteFormInputProjeto', 'componenteFormButtonProjeto'], function (React, FormInputProjeto, FormButtonProjeto) {
  var AgrupadorInputProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var ButtonElement;
        var header = item.header;
        var inputs = item.inputs;
        var containerClass = dados[i].containerClass;
        var buttons = item.buttons;
        if(buttons !== undefined || null){
          ButtonElement =
            <FormButtonProjeto dados={buttons}></FormButtonProjeto>
        } else {
          ButtonElement = null;
        }
        if(header === undefined){
          header = "";
        }
        var ContainerElement =
          <div className={containerClass}>
            <div className="header">{header}
            <span><img title="informação preenchida pela organização" className="imgDadoEditavel" src="img/dado_representante.png"></img></span></div>
            <FormInputProjeto dados={inputs}></FormInputProjeto>
            {ButtonElement}
          </div>
          if(header === "Valor Total"){
            var title = validateObject(item.inputs[0].title)?item.inputs[0].title:null;
            //console.log(title);
            if (title != null){
            ContainerElement =
              <div className={containerClass}>
                <div className="header">{header+" "}
                <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
          }
        }
          if(header === "Abrangência de atuação"){
            ContainerElement =
              <div className={containerClass}>
                <div className="header" title="Defina a abrangência territorial do projeto.">{header}
                <span><img title="informação preenchida pela organização" className="imgDadoEditavel" src="img/dado_representante.png"></img></span></div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
          }
          if(header === "Data de Início"){
              var title = validateObject(item.inputs[0].title)?item.inputs[0].title:null;
              if (title != null){
              ContainerElement =
                <div className={containerClass}>
                  <div className="header"> {header+" "}
                  <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                  </div>
                  <FormInputProjeto dados={inputs}></FormInputProjeto>
                  {ButtonElement}
                </div>
            }
          }
          if(header === "Data de Fim"){
              var title = validateObject(item.inputs[0].title)?item.inputs[0].title:null;
              if (title != null){
              ContainerElement =
                <div className={containerClass}>
                  <div className="header" title="Indique o(s) município, estado ou região de execução do projeto.">{header+" "}
                  <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                  </div>
                  <FormInputProjeto dados={inputs}></FormInputProjeto>
                  {ButtonElement}
                </div>
            }
          }
          if(header === "Local de execução"){
            ContainerElement =
              <div className={containerClass}>
                <div className="header" title="Indique o(s) município, estado ou região de execução do projeto.">{header}
                <span><img title="informação preenchida pela organização" className="imgDadoEditavel" src="img/dado_representante.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
            if (title){
            ContainerElement =
              <div className={containerClass}>
                <div className="header" title="Indique o(s) município, estado ou região de execução do projeto.">{header}
                <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
            }
          }
          if(header === "Fonte de Recursos"){
            console.log(inputs);
            var title = validateObject(item.inputs[0].title)?item.inputs[0].title:null;
            if (title){
            ContainerElement =
              <div className={containerClass}>
                <div className="header">{header+" "}
                <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
            }
          }
          if(header === "Nome do projeto, atividade ou programa"){
              var title = validateObject(item.inputs[0].title)?item.inputs[0].title:null;
              if (title != null){
              ContainerElement =
                <div className={containerClass}>
                  <div className="header">{header+" "}
                  <span><img title={"informação oficial, fonte: "+title} className="imgDadoOficial" src="img/base_dados.png"></img></span>
                  </div>
                  <FormInputProjeto dados={inputs}></FormInputProjeto>
                  {ButtonElement}
                </div>
            }
          }
          if(header === "Público Beneficiado"){
            ContainerElement =
              <div className={containerClass}>
                <div className="header" title="Especifique, se houver, o publico diretamente beneficiado pelo projeto.">{header}
                <span><img title="informação preenchida pela organização" className="imgDadoEditavel" src="img/dado_representante.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
          }
          if(header === "Financiadores do Projeto"){
            ContainerElement =
              <div className={containerClass}>
                <div className="header" title="Liste os financiadores do projeto.">{header}
                <span><img title="informação preenchida pela organização" className="imgDadoEditavel" src="img/dado_representante.png"></img></span>
                </div>
                <FormInputProjeto dados={inputs}></FormInputProjeto>
                {ButtonElement}
              </div>
          }



        itens.push(
          ContainerElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return AgrupadorInputProjeto;
});

define('componenteColunaProjeto', ['react', 'componenteAgrupadorInputProjeto'], function (React, AgrupadorInputProjeto) {
  var ColunaProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var containerClass = dados[i].containerClass;
        var agrupadores = item.agrupadores;
        var ContainerElement =
          <div className={containerClass}>
            <AgrupadorInputProjeto dados={agrupadores}></AgrupadorInputProjeto>
          </div>

        itens.push(
          ContainerElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return ColunaProjeto;
});

define('componenteLinhaProjeto', ['react', 'componenteColunaProjeto'], function (React, ColunaProjeto) {
  var LinhaProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var colunas = item.colunas;
        var LinhaElement =
            <div className="row no-gutter-bordered">
              <ColunaProjeto dados={colunas}></ColunaProjeto>
            </div>

        itens.push(
          LinhaElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return LinhaProjeto;
});

/*define('componenteLink', ['react'], function (React) {
  var Link = React.createClass({
    var items = [];
    var aObj = this.props.a;
    renderList: function(){
      for(var i=0; i<aObj.length; i++){
        items.push(<a id=aObj.id href=aObj.src>aObj.text</a>);
      }
    },
    render: function(){
      return (<div>{this.renderList()}</div>);
    }
  });
});*/
