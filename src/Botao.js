import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export default class Botao extends React.Component{

  render(){
    return(
      <div className="DivBotao">
          <Button label={this.props.valor} onClick={this.props.funcao} className="Botao p-button-rounded"/>
      </div>
    );
  }
}