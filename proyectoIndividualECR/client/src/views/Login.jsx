import React,{useState,useEffect} from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import "../styles/Login.scss"
import ImgTwo from '../components/imgTwo';
import ImgLogo from '../components/ImgLogo';
import Swal from 'sweetalert2';


const Login = () => {
    const{register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        name:'',
        email:'',
        password:'',
    });
    const succesAlert = (mensaje) =>{
        Swal.fire({
            icon: 'success',
            title: 'Todo en orden!',
            text: mensaje,
        })
    }
    const handleOnChange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setLogin((values)=>({...values,[name]:value}))
    }
    const onSubmit = (e) =>{
        axios
            .post('http://localhost:8080/api/users/login',login, {withCredentials:true})
                .then(res=>{
                    succesAlert('Bienvenido!')
                    navigate("/")
                })
                .catch(err=>{
                    alert(`Mensaje desde el backEnd:
                    ${err.response.data.msg}:
                    ${err.response.data.error.message}`)
                    console.log('no puedo acceder')
                    console.log(err)
                })
        }
    return (
        <div>
            <div className='bg-login'>
                <nav className='nav'>
                    <div className='logoContainer'>
                        <div className='img3'>
                            <ImgLogo/>
                        </div>
                        <div className='img3'>
                            GestorN
                        </div>
                    </div>
                </nav>
                <div className='tarjetaLogin'>
                    <div className='formContainer'>
                        <div>
                            <h1 className='LoginTitle' style={{color:'white'}}>Iniciar Sesión</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='form'>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Mail: </label>
                                <div className='ErrorMsg'>
                                    <input type="mail" {
                                        ...register(
                                            'email',{
                                                required:true,
                                            }
                                        )
                                    }
                                        id='email'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.email?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Password: </label>
                                <div className='ErrorMsg'>
                                    <input type="password" {
                                        ...register(
                                            'password',{
                                                required:true,
                                            }
                                        )
                                    }
                                        id='password'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.password?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow signRow' style={{color:'white'}}>
                                Olvidaste tu contraseña?
                                <input type="submit" value={"Entrar"} className='inputStyle entryButton'/>   
                            </div>
                        </form>
                        <div className='inputRow'>
                            <span style={{color:'white'}}>Aun no tienes una cuenta?,&nbsp;</span>
                            <Link to="/register" style={{textDecoration:'none'}}>
                                    <p style={{color:'white'}}>Registrate aca!</p>
                            </Link> 
                        </div>
                    </div>
                    <div>
                        <ImgTwo className='SVG'/>
                    </div>
                </div>
                <div className='wave w1'></div>
                <div className='wave w2'></div>
            </div>
        </div>
                    
    );
}

export default Login;
