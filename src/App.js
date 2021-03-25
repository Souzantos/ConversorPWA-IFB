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
  
  constructor(props) {
    super(props);      
    this.state={
      classeDiv:'hide',
      classeDiv2: 'hide',
      classeDiv3: 'hide',
      classeDiv4: 'hide',
      gasolina: 0,
      etanol: 0,
      resultGas: 0,
      resultGasTxt: "Aguardando valores...",
      real: 0,
      convertido: 0,
      moedas: [],
      bid: null,

    };
     
     this.calcularGas = this.calcularGas.bind(this)
     this.calcularMoeda = this.calcularMoeda.bind(this)
    }
    async componentDidMount() {
      const response = await api.get('');
      console.log(response.data);
      this.setState({ moedas: response.data[0]});
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
    
  
calcularGas(){
    this.state.resultGas = this.state.gasolina/this.state.etanol 
    if(this.state.resultado > 0.7){
      this.state.resultGasTxt = 'Abasteça com Gasolina!'
    }else{
      this.state.resultGasTxt = 'Abasteça com Etanol!'
    }
    
   this.setState(this.state)
  }

  calcularMoeda(){
    const {moedas} = this.state;
    this.state.convertido = parseFloat(moedas.bid)*this.state.real
    this.setState(this.state)
   
  }
  
render() {
  const {moedas} = this.state;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Conversor</h1>
      </header>
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
          <Button label="Calcular" onClick={this.calcularMoeda} className="Botao"> </Button>
        </div>
        <div>
        <h1> 
        R${this.state.convertido}<br></br>
        </h1>
        </div>
        </div>}/>
      </div>
      
      <br></br>
   </div>
  );
  }

}
