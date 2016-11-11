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
                    <img src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo."></img>
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
             <select className="form-control">
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
        items.push(<HeaderElement>{this.props.header.text}</HeaderElement>);
      }
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        var placeholder = item.content;
        if((item.content == null) && (item.placeholder != undefined)){
          placeholder = item.placeholder;
        }
        var titleSpanFonte = "Informação preenchida pela Organização";
        var SpanFonte =
          <span className="fonte-de-dados dado-organizacao" title={titleSpanFonte}></span>
        if((item.fonte) && (item.type== 'p')){
          titleSpanFonte = "Informação oficial, Fonte " + item.fonte;
          SpanFonte = <span className="fonte-de-dados dado-oficial" title={titleSpanFonte}></span>
        }
        var custom_class = "";
        if(item.custom_class){
          custom_class = " "+item.custom_class;
        }
        var ContentElement;
        if(item.type == 'p'){
          ContentElement =
          <div className="input-box">
            <p className="form-control-static" id={item.id}>{placeholder}</p>
            {SpanFonte}
          </div>
        } else if(item.type == 'textarea') {
          ContentElement =
          <div className="input-box">
            <textarea className="form-control" id={item.id} placeholder={placeholder}></textarea>
            {SpanFonte}
          </div>
        } else if(item.type == 'select'){
          ContentElement =
          <div className="input-box">
            <Dropdown list={item.options} selected={item.content}></Dropdown>
            {SpanFonte}
          </div>
        } else if(item.id == "tx_endereco_eletronico_sugerido"){
          ContentElement =
          <div className="input-box">
            <input className="form-control with-pretext" id={item.id} placeholder={placeholder} type={item.type}></input>
            <span className="pre-text">{item.pretext}</span>
            {SpanFonte}
          </div>
        } else if(item.type == "checkbox"){
          ContentElement = <Checkbox dados={item.options}></Checkbox>
        } else if(item.suggestions){
          var areas = item.suggestions;
          var subareas = [];
          for (var j = 0; j < areas.length; j++) {
             subareas.push(areas[j].subareas);
          }
          var className = "form-control"+custom_class;
          var itensCheckBox = [];
          for (var k = 0; k < subareas.length; k++) {
            itensCheckBox.push(<div id = {k} className="hidden"><Checkbox dados={subareas[k]}></Checkbox></div>)
          }

          ContentElement =
          <div className="input-box">
            <input className={className}  id={item.id} placeholder={placeholder} type={item.type}></input>
            {SpanFonte}
            <div className="checkboxList">{itensCheckBox}</div>
          </div>
        } else {
          var className = "form-control"+custom_class;
          ContentElement =
          <div className="input-box">
            <input className={className}  id={item.id} placeholder={placeholder} type={item.type}></input>
            {SpanFonte}
          </div>
        }
        var labelElement;
        if(item.label){
          labelElement = <label className="control-label" for={item.id}>{item.label}:</label>
          if(item.id=="tx_endereco_eletronico_sugerido"){
            labelElement = <label className="control-label" for={item.id} title="Defina um nome que vai constar como link para esta página da OSC , que poderá divulgá-lo como endereço oficial do Mapa">{item.label}:</label>
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
            <div className="{this.props.container.className}">{this.renderListItems()}</div>
          );
      }
  });

  return FormItem;
});

define('componenteSection', ['react'], function (React) {
  var Section = React.createClass({
    renderListItems: function(){
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
        itens.push(
          <div>
            <div className={containerClass}>
              <HeaderElement>{item.text}</HeaderElement>
              {ButtonElement}
            </div>
            <div id={item.id}></div>
          </div>
        );
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
            <div>
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 2 == 0)){
          itens.push(
            <div>
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
        console.log(item);
        var id = item.id;
        console.log(id);
        var removable = item.removable;
        var content = item.content;
        var buttons = item.buttons;
        var inline = item.buttonsInLine;
        var type = item.type;
        var options = item.options;

        if(content === undefined){
          content = "";
        }

        if(type == 'select'){
          var InputElement =
            <div id={id}>
              <Dropdown list={options} selected={content}></Dropdown>
            </div>
        } else {
          var InputElement =
            <div id={id}>
              <input className="form-control" value={content}></input>
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
            <div className="form-group">{this.renderListItems()}</div>
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
        console.log(item);
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
            <div className="header">{header}</div>
            <FormInputProjeto dados={inputs}></FormInputProjeto>
            {ButtonElement}
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
