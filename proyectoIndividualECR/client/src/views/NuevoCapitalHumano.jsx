import React,{useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Login from './Login'
import CreateImg from '../components/CreateImg'
import Swal from 'sweetalert2';


const NuevoCapitalHumano = () => {
    const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors}} = useForm();
    const [myForm, setMyForm] = useState({
        colaboratorName:'',
        colaboratorId:'',
        colaboratorCharge:'',
        colaboratorArea:'',
    });
    const login = () =>{
        axios.get("http://localhost:8080/api/users/ingreso", {withCredentials:true})
            .then(res=>{
                console.log('funciona!');
            }).catch(err=>{
                console.log('Al login!');
                    navigate('/login')
                }
            )
    }
    useEffect(() => {
        login()
    }, []);
    const handleOnChange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setMyForm((values)=>({...values,[name]:value}))
    }
    const succesAlert = (mensaje) =>{
        Swal.fire({
            icon: 'success',
            text: mensaje,
        })
    }
    const onSubmit = (e) =>{
        setMyForm(myForm);
        axios
            .post('http://localhost:8080/api/mycolaborator',myForm)
                .then(res=>{
                    navigate("/capital-humano")
                    succesAlert('Colaborador correctamente agregado!')
                })
                .catch(err=>{
                    alert(`Mensaje desde el backEnd:
                    ${err.response.data.msg}:
                    ${err.response.data.error.message}`)
                    console.log(err)
                })
        }
    return (
        <div>
            <Navigation/>
            <div className='bg'>
                <div className='upper'>
                    <h1>Nuevo Colaborador</h1>
                    <Link to="/capital-Humano">
                        <button className='button'>Mis Colaboradores</button>
                    </Link>
                    </div>
                    <div className='tarjetaLogin'>
                    <div className='formContainer'>
                        <form onSubmit={handleSubmit(onSubmit)} className='InterfaceFormContainer'>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Nombre: </label>
                                <div className='ErrorMsg'>
                                    <input type="text" {
                                        ...register(
                                                    'colaboratorName',{
                                                        required:true,
                                                    }
                                                )
                                            }
                                            id='colaboratorName'
                                            onChange={(e)=> handleOnChange(e)}
                                            className='inputStyle'
                                            />
                                        {errors.colaboratorName?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Id: </label>
                                <div className='ErrorMsg'>
                                    <input type="text" {
                                                ...register(
                                                    'colaboratorId',{
                                                        required:true,
                                                    }
                                                )
                                            }
                                        id='colaboratorId'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                        {errors.colaboratorId?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Cargo: </label>
                                <div className='ErrorMsg'>
                                    <input
                                        type="text" {...register(
                                            'colaboratorCharge',{
                                                required:true,
                                            }
                                        )}
                                        id='colaboratorCharge'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.colaboratorCharge?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Area: </label>
                                <div className='ErrorMsg'>
                                    <select {
                                        ...register(
                                            'colaboratorArea',{
                                                required:true,
                                            } 
                                        )
                                    } 
                                        id="colaboratorArea"
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                        >
                                        <option value="Broncopulmonar">Broncopulmonar</option>
                                        <option value="Cardiologia">Cardiologia</option>
                                        <option value="Dental">Dental</option>
                                        <option value="Dermatologia">Dermatologia</option>
                                        <option value="Endoscopia">Endoscopia</option>
                                        <option value="Fonoaudiologia">Fonoaudiologia</option>
                                        <option value="Ginecologia">Ginecologia y Obstetricia</option>
                                        <option value="Pabellon">Pabellon</option>
                                        <option value="Kinesiologia">Kinesiologia</option>
                                        <option value="Neurologia">Neurologia</option>
                                        <option value="Oftalmologia">Oftalmologia</option>
                                        <option value="Pediatria">Pediatria</option>
                                        <option value="Servicio tecnico">Servicio tecnico</option>
                                        <option value="Urologia">Urologia</option>
                                        <option value="Vacunatorio">Vacunatorio</option>
                                    </select>
                                    {errors.colaboratorArea?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <input type="submit" value={"Crear"} className='interfaceSubmitBoton'/>
                        </form>
                    </div>
                    <div className='SVG'>
                        <CreateImg/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoCapitalHumano;