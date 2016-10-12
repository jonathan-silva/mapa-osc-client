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
                    {this.props.dados[i].titulo}</a></h4>
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
         <a href="#header" class="topo">Voltar para o topo</a>
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

define('componenteFormItem', ['react','componenteDropdown'], function (React, Dropdown) {
  var FormItem = React.createClass({
    renderListItems: function(){
      var items=[];
      var HeaderElement = `h${this.props.header.priority}`;
      items.push(<HeaderElement>{this.props.header.text}</HeaderElement>);
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        var ContentElement;
        if(this.props.dados[i].type == 'p'){
          ContentElement = <p className="form-control-static" id={this.props.dados[i].id}>{this.props.dados[i].content}</p>
        } else if(this.props.dados[i].type == 'textarea') {
          ContentElement = <textarea className="form-control" id={this.props.dados[i].id} placeholder={this.props.dados[i].content}></textarea>
        } else if(this.props.dados[i].type == 'select'){
          ContentElement = <Dropdown list={item.options} selected={item.content}></Dropdown>
        } else {
          ContentElement = <input className="form-control" id={this.props.dados[i].id} placeholder={this.props.dados[i].content} type={this.props.dados[i].type}></input>
        }
        items.push(
          <div className="form-group">
            <label className="control-label" for={this.props.dados[i].id}>{this.props.dados[i].label}:</label>
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
