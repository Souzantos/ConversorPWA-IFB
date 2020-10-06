import React from 'react';
import './App.css';
import AreaTexto from './AreaTexto.js';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import Botao from './Botao.js';
import api from './api.js';

export default class App extends React.Component{
  
  constructor() {
    super();
    this.state={
      classeDiv:'hide',
      classeDiv2: 'hide',
      classeDiv3: 'hide',
      classeDiv4: 'hide',
      altura: 0,
      massa: 0,
      resultado: 0,
      resultTexto: "Aguardando valores...",
      gasolina: 0,
      etanol: 0,
      resultGas: 0,
      resultGasTxt: "Aguardando valores...",
      real: 0,
      valor: 0,
      convertido: 0,
      moedas: [],
      medidaIN: 0,
      medidaOUT: 0,
      medidaOUTxt:"Aguardando valores..."

    };
     this.calcular = this.calcular.bind(this) 
     this.calcularGas = this.calcularGas.bind(this)
     this.calcularKM = this.calcularKM.bind(this)
     this.calcularKG = this.calcularKG.bind(this)
     this.calcularCelsius = this.calcularCelsius.bind(this)
    }

    async componentDidMount() {
      const response = await api.get('');
      console.log(response.data);

      this.setState({ moedas: response.data });
      }

  alterarEstado(){
    var Estado;
    if(this.state.classeDiv === 'hide'){
      Estado = 'show';
    }else{
      Estado = 'hide';
    }
    this.setState({
        classeDiv: Estado
    })
    }
  alterarEstado2(){
    var Estado;
    if(this.state.classeDiv2 === 'hide'){
      Estado = 'show';
    }else{
      Estado = 'hide';
    }
    this.setState({
        classeDiv2: Estado
    })
    }
    alterarEstado3(){
    var Estado;
    if(this.state.classeDiv3 === 'hide'){
      Estado = 'show';
    }else{
      Estado = 'hide';
    }
    this.setState({
        classeDiv3: Estado
    })
    }
    alterarEstado4(){
    var Estado;
    if(this.state.classeDiv4 === 'hide'){
      Estado = 'show';
    }else{
      Estado = 'hide';
    }
    this.setState({
        classeDiv4: Estado
    })
    }
  calcular(){
    this.state.resultado = (this.state.massa / (this.state.altura * this.state.altura))* 10000
    if(this.state.resultado < 16){
      this.state.resultTexto = 'Muito abaixo do peso!'
    }
    else if (this.state.resultado < 17){
     this.state.resultTexto = 'Moderadamente abaixo do peso!'
    }
    else if (this.state.resultado < 18.5){
     this.state.resultTexto = 'Abaixo do peso!'
    }
    else if (this.state.resultado < 25) {
     this.state.resultTexto = 'Saudável!'
    }
    else if (this.state.resultado < 30) {
     this.state.resultTexto = 'Sobrepeso!'
    }
    else if (this.state.resultado < 35) {
     this.state.resultTexto = 'Obesidade Grau 1°!'
    }
    else if (this.state.resultado < 40) {
      this.state.resultTexto = 'Obesidade Grau 2°!'
    }
    else{
      this.setState.resultTexto = 'Obesidade Grau 3°'
    }
   this.setState(this.state)
  }
calcularGas(){
    this.state.resultGas = this.state.gasolina/this.state.etanol 
    if(this.state.resultado > 0.7){
      this.state.resultGasTxt = 'Abasteça com Gasolina!'
    }else{
      this.state.resultGasTxt = 'Abasteça com Etanol!'
    }
    
   this.setState(this.state)
  }
  calcularKM(){
    this.state.medidaOUT = 1.609/this.state.medidaIN 
    this.state.medidaOUTxt = "Convertido de km para Milhas"
    
   this.setState(this.state)
  }

  calcularKG(){
    this.state.medidaOUT = 2.205*this.state.medidaIN 
   this.state.medidaOUTxt = "Convertido de kg para Pounds"
    
   this.setState(this.state)
  }
  
  calcularCelsius(){
    this.state.medidaOUT = (1.8*this.state.medidaIN)+32
    this.state.medidaOUTxt = "Convertido de Celsius para Fahrenheit"
    
   this.setState(this.state)
  }


render() {
    const { moedas } = this.state;
    this.state.valor = moedas.name
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Conversor</h1>
      </header>
      <div>
      <Botao funcao={this.alterarEstado.bind(this)} valor="IMC"/>
      <AreaTexto classeSecundaria={this.state.classeDiv} texto = 
      {<div>
      <label htmlFor="integeronly"> Insira seu peso (kg): </label><br></br>
        <InputNumber  id="peso" value={this.state.massa} onValueChange={(e) => this.setState({massa: e.value})} /><br></br>
        <label htmlFor="integeronly">Insira sua altura (cm):</label><br></br>
        <InputNumber  id="altura" value={this.state.altura} onValueChange={(e) => this.setState({altura: e.value})} /><br></br>
        <br></br>
        <div>
          <Button label="Calcular" onClick={this.calcular} className="Botao"> </Button>
        </div>
        <div>
          <h1>
            {this.state.resultado}
          </h1>
          <h1>
          {this.state.resultTexto}
        </h1>
        </div>
        </div>}/>
     </div>
     <br></br>
     <div>
     <Botao funcao={this.alterarEstado2.bind(this)} valor="COMBUSTIVEL"/>
     <AreaTexto classeSecundaria={this.state.classeDiv2} texto = {
       <div>
      <label htmlFor="integeronly"> Insira o preço da gasolina: </label><br></br>
        <InputNumber value={this.state.gasolina} onValueChange={(e) => this.setState({gasolina: e.value})} mode="decimal" minFractionDigits={2} /><br></br>
        <label htmlFor="integeronly">Insira o preço do Etanol:</label><br></br>
        <InputNumber  value={this.state.etanol} onValueChange={(e) => this.setState({etanol: e.value})} mode="decimal" minFractionDigits={2} /><br></br>
        <br></br>
        <div>
          <Button label="Calcular" onClick={this.calcularGas} className="Botao"> </Button>
        </div>
        <div>
          <h1>
            {this.state.resultGas}
          </h1>
          <h1>
          {this.state.resultGasTxt}
        </h1>
        </div>
        </div>}/>
     </div>
    
      <br></br>
      <div>
      <Botao funcao={this.alterarEstado3.bind(this)} valor="MOEDA"/>
      <AreaTexto classeSecundaria={this.state.classeDiv3} texto = {
       <div>
      <label htmlFor="integeronly"> Insira o valor em Dolar: </label><br></br>
        <InputNumber value={this.state.real} onValueChange={(e) => this.setState({real: e.value})} mode="currency" currency="USD" locale="en-US" minFractionDigits={2} /><br></br>
        <br></br>
        <div>
          <Button label="Calcular" onClick={this.state.convertido = 5.57*this.state.real} className="Botao"> </Button>
        </div>
        <div>
        <h1> 
        R${this.state.convertido}
        </h1>
        </div>
        </div>}/>
      </div>
      <br></br>
      <div><Botao funcao={this.alterarEstado4.bind(this)} valor="MEDIDAS"/>
      <AreaTexto classeSecundaria={this.state.classeDiv4} texto = {
       <div>
      <label htmlFor="integeronly"> Insira o valor a ser convertido: </label><br></br>
        <InputNumber value={this.state.medidaIN} onValueChange={(e) => this.setState({medidaIN: e.value})} minFractionDigits={2} /><br></br>
        <br></br>
        <div>
          <table className="TabelaB">
            <tr>
            <td>
            <Button label="Km -> Milhas" onClick={this.calcularKM} className="Botao"> </Button>
            </td>
            <td>
            <Button label="Kg -> Pounds" onClick={this.calcularKG} className="Botao"> </Button>
            </td>
            <td>
            <Button label="Cº -> Fº" onClick={this.calcularCelsius} className="Botao"> </Button>
            </td>
            </tr>
          </table>
        </div>
        <div>
        <h1> 
        {this.state.medidaOUT}
        </h1>
        <h1> 
        {this.state.medidaOUTxt}
        </h1>
        </div>
        </div>} /></div>
      <br></br>
   </div>
  );
  }

}
