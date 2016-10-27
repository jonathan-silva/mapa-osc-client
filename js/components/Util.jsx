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
        itens.push(
          <div>
            <HeaderElement>{item.text}</HeaderElement>
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
      console.log(dados);
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
