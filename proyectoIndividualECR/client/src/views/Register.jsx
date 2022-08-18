import React,{useState,useEffect} from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import "../styles/Login.scss"
import ImgTwo from '../components/imgTwo';
import ImgLogo from '../components/ImgLogo';
import ImgOne from '../components/ImgOne';
import Swal from 'sweetalert2'

const Register = () => {
    const{register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();
    const [registration, setRegistration] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:""
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
        setRegistration((values)=>({...values,[name]:value}))
    }
    const onSubmit = (e) =>{
        setRegistration(registration);
        axios
            .post('http://localhost:8080/api/users/register',registration)
                .then(res=>{
                    succesAlert('Registrado con Exito!')
                    navigate("/login")
                })
                .catch(err=>{
                    console.log(`Mensaje desde el backEnd:
                    ${err.response.data.msg}:
                    ${err.response.data.error.message}`)
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
                            <h1 className='LoginTitle' style={{color:'white'}}>Registro</h1>
                        </div>
                            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                                <div className='inputRow'>
                                    <label style={{color:'white'}}>Nombre: </label>
                                    <div className='ErrorMsg'>
                                        <input type="text" {
                                            ...register(
                                                'name',{
                                                    required:true,
                                                }
                                            )
                                        }
                                                id='name'
                                                onChange={(e)=> handleOnChange(e)}
                                                className='inputStyle'
                                        />
                                        {errors.name?.type === 'required' && <p className='ErrorMsg'>El campo no debe estar vacio</p>}
                                    </div>
                                </div>
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
                                <div className='inputRow'>
                                    <label style={{color:'white'}}>Confirm password: </label>
                                    <div className='ErrorMsg'>
                                        <input type="password" {
                                            ...register(
                                                'confirmPassword',{
                                                    required:true,
                                                }
                                            )
                                        }
                                                id='confirmPassword'
                                                onChange={(e)=> handleOnChange(e)}
                                                className='inputStyle'
                                        />
                                        {errors.password?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                    </div>
                                </div>
                                <div className='registerContainer' style={{position:"relative",zIndex:"4"}}>
                                    <input type="submit" value={"Registrarse!"} className=' btnSubmit2 inputStyle'/>
                                        <p className='inputRow' style={{color:'white'}}>
                                            o &nbsp;
                                        </p>2
                                        <div>
                                            <Link to="/login" style={{color:'white', textDecoration:'none'}}>
                                                Inicia sesión!
                                            </Link>
                                        </div>
                                </div>
                            </form>
                        </div>
                        <div className='SVG'>
                            <ImgOne/>
                        </div>
                    </div>
                    <div className='wave w1'></div>
                    <div className='wave w2'></div>
                </div>
        </div>
    );
}

export default Register;