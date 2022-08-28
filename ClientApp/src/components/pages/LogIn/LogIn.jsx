import axios from "axios";
import md5 from "md5";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import '../../css/LogIn.css';
import ParticlesBg from 'particles-bg'
import { useState } from "react";

const cookies = new Cookies();
const baseUrl = 'api/usuarios/Listado';

export default function(props) {
    const navigation = useNavigate();
    
    return <LogIn {...props} navigation={navigation} />;
  }
export class LogIn extends Component {

    state={
        form:{
            usuUserName:'',
            usuPassword:''
        }
    }
    
    handleChange = async e=>{
       await this.setState({
            form: {
                ...this.state.form, 
                [e.target.name]: e.target.value
            }
        });
    }
    noRefresh = e =>{
        e.preventDefault();
    }

    logIn = async e=> {
        await axios.get(baseUrl,{params: {usuUserName: this.state.form, usuPassword: this.state.form.usuPassword}})
            .then(response=>{
                var data = response.data; 
                const datamap = data.filter(item => {if(item.usuUserName === this.state.form.usuUserName && item.usuPassword === md5(this.state.form.usuPassword)){return item}});     
                //console.log("constraseña: ", md5(this.state.form.usuPassword));  ///Con este consolelog lo que hago es generar el md5
                
                if(datamap.length > 0 )
                { 
                    var rta = response.data[0];
                    cookies.set('id', rta.usuId, {path: "/"});
                    cookies.set('nombre', rta.usuNombre, {path: "/"});
                    cookies.set('apellido', rta.usuApellido, {path: "/"});
                    cookies.set('username', rta.usuUserName, {path: "/"});
                    this.props.navigation('/inicio');
                } 
                else
                {
                    alert("usuario no existe");
                }
            })
            
            .catch(error=>{
                console.log("Error al hacer la peticion de usuarios: ", error);
            })
    }
    componentDidMount(){
        
        if(cookies.get('username')){
          this.props.navigation('/inicio');
        }
    }
    
    
    render(){
      
      const { navigation } = this.props;
      return(
          
          <div className="containerLogin">
                <div className="containerSecundario">
                    <form onSubmit={this.noRefresh}>
                        <div className="form-group">
                            <div className="containerTitulo">
                                <h1>Iniciar Sesion</h1>
                            </div>
                            <hr className="LineaHorizontal" />
                            <label htmlFor='user'>Usuario</label>
                            <input type='text' id='user' name='usuUserName' className='form-control' onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='pass'>Contraseña</label>
                            <input type='password' id='pass' name='usuPassword' className='form-control' onChange={this.handleChange} />
                        </div>
                        <div className="btncontainer">
                            <input className="btnLogIn" type="submit" value='Iniciar sesion' onClick={this.logIn} />
                        </div>
                    </form>

                </div>
              <ParticlesBg color="#fafafa" num={100} type="cobweb" bg={true} />
            </div>
    );
  } 
};
