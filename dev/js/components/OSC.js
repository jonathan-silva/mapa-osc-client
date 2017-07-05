var MenuOSC = React.createClass({
  renderListItems: function(){
    var result = [];
    for (var i = 0; i < this.props.menuList.length; i++) {
      var menuItem = "#menu"+i;
      result.push(<li><a href={menuItem}>{this.props.menuList[i]}</a></li>);
    }
    return result;
  },
  render: function () {
    return (
      <div>
        <ul className="nav nav-pills">
          {this.renderListItems()}
          <li>
            <a href="javascript:if(window.print)window.print()">Imprimir</a>
          </li>
        </ul>
      </div>
    );
  }
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

var menuList = ["Dados Gerais", "Titulações e Certificações", "Relações de Trabalho", "Projetos", "Recursos"];
ReactDOM.render(<MenuOSC menuList = {menuList}/>, document.getElementById("menu-osc"));
var situacoes = ["Alugado", "Próprio", "Cedido", "Comodato"];
ReactDOM.render(<Dropdown list={situacoes}/>, document.getElementById("imovel"));
