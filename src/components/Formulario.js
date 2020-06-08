import React, { Component } from 'react'

export default class Formulario extends Component {

    ciudadRef = React.createRef()
    paisRef = React.createRef()

    datosConsulta = (e) => {
        e.preventDefault()

        const respuesta = {
            ciudad: this.ciudadRef.current.value,
            pais: this.paisRef.current.value
        }

        this.props.datosConsulta(respuesta)

        e.currentTarget.reset()

    }

    render() {
        return (
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.datosConsulta}>
                            <div className="input-field col s12 m8 l4 offset-m2">
                                <input id="ciudad" type="text" ref={this.ciudadRef}/>
                                <label htmlFor="ciudad">Ciudad</label>
                            </div>
                            <div className="input-field col s12 m8 l4 offset-m2">
                                <select id="pais" ref={this.paisRef}>
                                    <option value="" defaultValue>Seleccione</option>
                                    <option value="AR">Argentina</option>
                                    <option value="CO">Colombia</option>
                                    <option value="CR">Costa Rica</option>
                                    <option value="ES">España</option>
                                    <option value="US">Estados Unidos</option>
                                    <option value="MX">México</option>
                                    <option value="PE">Perú</option>
                                </select>
                                <label htmlFor="pais">País</label>
                            </div>
                            <div className="input-field col s12 m8 l4 offset-m2 buscador">
                                <input type="submit" className="waves-effect waves-light btn btn-large yellow accent-4" value="Buscar"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
