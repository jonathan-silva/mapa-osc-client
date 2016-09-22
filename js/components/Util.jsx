define(['react'], function (React) {

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
        items.push(<option value={val}>{val}</option>);
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


  var arquivosRetornados, arquivosEnviados;
  arquivosRetornados = arquivosEnviados = ["XML", "JSON", "CSV"];
  var periodicidade = ["Dia(s)", "Semana(s)", "Mês(es)"];

  ReactDOM.render(<Dropdown list={arquivosRetornados}/>, document.getElementById("arquivo_retornado_dropdown"));
  ReactDOM.render(<Dropdown list={periodicidade}/>, document.getElementById("periodicidade_dropdown"));
  ReactDOM.render(<Dropdown list={arquivosEnviados}/>, document.getElementById("tipo_arquivo_dropdown"));
