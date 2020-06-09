import React, { Component } from 'react'
import Header from './Header'
import Formulario from './Formulario'
import Error from './Error'
import Clima from './Clima'

export default class App extends Component {

  state = {
    error: '',
    consulta: {}, 
    resultado: {}
  }

  componentDidMount(){
    this.setState({
      error: ''
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.consulta !== this.state.consulta){
      this.consultarApi()
    }
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta
    if(!ciudad || !pais) return null

    const appId = 'Your API KEY'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appId=${appId}`
    
    console.log(url)
    fetch(url)
      .then(respuesta => {
        console.log(respuesta)
        if (respuesta.status >= 200 && respuesta.status <= 299) {
          return respuesta.json();
        } else if(respuesta.status === 404 || respuesta.cod === 404) {
          this.setState({
            error: 'ciudad',
            resultado: null
          })
        }
      })
      .then(datos =>{
        this.setState({
          resultado: datos
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  datosConsulta = respuesta =>{
    if(respuesta.ciudad === '' || respuesta.pais === ''){
      this.setState({
        error: 'campos'
      })
    }
    else{
      this.setState({
        error: '',
        consulta: respuesta
      })
    }
  }
  render() {
    const error = this.state.error

    let resultado
    if(error === 'campos'){
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    }
    else if(error === 'ciudad'){
      resultado = <Error mensaje="La Ciudad no existe" />
    }
    else{
      resultado = <Clima resultado={this.state.resultado}/>
    }
    return (
      <div className="app">
        <Header title="Clima React"/>
        <Formulario datosConsulta={this.datosConsulta}/>
        {resultado}
      </div>
    )
  }
}
