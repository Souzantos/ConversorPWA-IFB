import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import classnames from 'classnames';

export default class AreaTexto extends React.Component{
  
  render(){
    return(
      <div className={classnames("AreaTexto" ,this.props.classeSecundaria)}> 
        {this.props.texto}
      </div>
       
    );
  }
}