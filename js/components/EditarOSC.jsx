define('componenteDropdownList', ['react', 'componenteDropdown'], function (React, Dropdown) {
  var DropdownList = React.createClass({
    renderListItems: function(){
      var items=[];
      console.log(Dropdown);
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        items.push(
            <div className="input-group">
              <Dropdown list={this.props.options} selected={item.tx_nome_area_atuacao_declarada}></Dropdown>
                <span className="input-group-btn">
                  <button className="btn-primary btn">Remover</button>
                </span>
            </div>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div class="form-group"><label>Áreas autodeclaradas</label>{this.renderListItems()}</div>
      );
    }
  });

  return DropdownList;
});

define('componenteHeaderAreaDeAtuacao', ['react', 'componenteDropdownList'], function (React, DropdownList) {
  var HeaderAreaDeAtuacao = React.createClass({
    renderListItems: function(){
      console.log("render list items");
      var items=[];
      var HeaderElement = `h${this.props.header.priority}`;
      items.push(<HeaderElement>{this.props.header.text}</HeaderElement>);
      console.log(this.props.dados);
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        console.log(item);
        items.push(
          <div>
            <div class="form-group">
              <label>{item.tx_nome_macro_area_fasfil}</label>
              <div>
                <strong>Área</strong> -&gt; <em>{item.tx_nome_area_fasfil}</em>
              </div>
            </div>
            <DropdownList dados={item.areas_autodeclaradas} options={["autodeclarada 1","autodeclarada 2", "outro"]}></DropdownList>
            <div>
              <a href="#" className="btn btn-primary">Adicionar Área</a>
            </div>
          </div>
        );
      }
      return items;
    },


      render: function() {
          return (
            <div className="col-md-7">{this.renderListItems()}</div>
          );
      }
  });
  return HeaderAreaDeAtuacao;
});
