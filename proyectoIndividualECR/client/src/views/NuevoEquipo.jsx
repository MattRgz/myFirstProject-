import React,{useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Login from './Login';
import CreateImg from '../components/CreateImg';
import Swal from 'sweetalert2';

const NuevoEquipo = () => {
    const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors}} = useForm();
    const [myForm, setMyForm] = useState({
        equipmentModel:'',
        equipmentSerialNumber:'',
        equipmentState:'',
        observation:'',
        maintenanceState:'',
        equipmentUbication:'',
        equipmentType:'',
        accessories:'',
        lastMaintenance:'',
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
        login(0);
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
            .post('http://localhost:8080/api/myequipment',myForm)
                .then(res=>{
                    succesAlert('Equipo correctamente agregado!')
                    navigate("/")
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
                    <h1>Nuevo Equipo</h1>
                    <Link to="/">
                        <button className='button'>Mis Equipos</button>
                    </Link>
                </div>
                <div className='tarjetaLogin2'>
                    <div className='formContainer'>
                        <form onSubmit={handleSubmit(onSubmit)} className='InterfaceFormContainer'>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Modelo</label>
                                <div className='ErrorMsg'>
                                    <input type="text" {
                                                ...register(
                                                    'equipmentModel',{
                                                        required:true,
                                                    }
                                                )
                                            }
                                        id='equipmentModel'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.equipmentModel?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Serie</label>
                                <div className='ErrorMsg'>
                                    <input type="text" {
                                                ...register(
                                                    'equipmentSerialNumber',{
                                                        required:true,
                                                    }
                                                )
                                            }
                                        id='equipmentSerialNumber'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.equipmentSerialNumber?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Estado</label>
                                <div className='ErrorMsg'>
                                    <select
                                        {...register(
                                            'equipmentState',{
                                                required:true,
                                            }
                                        )}
                                        id='equipmentState'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        <option value="Activo">Operativo</option>
                                        <option value="Fuera de Servicio">Fuera de servicio</option>
                                    </select>
                                    {errors.equipmentState?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Observaciones: </label>
                                <div className='ErrorMsg'>
                                <div className='dateInputStyle'>
                                    <textarea
                                        type="" {...register(
                                            'observation',{
                                                required:true,
                                            }
                                        )}
                                        id='observation'
                                        onChange={(e)=> handleOnChange(e)}
                                        style={{resize:'none'}}
                                        className='inputStyle'
                                    />
                                </div>
                                    {errors.observation?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Ubicacion del activo:</label>
                                <div className='ErrorMsg'>
                                <select
                                        {...register(
                                            'equipmentUbication',{
                                                required:true,
                                            }
                                        )}
                                        id='equipmentUbication'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    >
                                        <option value="">Seleccione una opcion</option>
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
                                    {errors.equipmentUbication?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Tipo de equipo: </label>
                                <div className='ErrorMsg'>
                                    <input
                                        type="text" {...register(
                                            'equipmentType',{
                                                required:true,
                                            }
                                        )}
                                        id='equipmentType'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    />
                                    {errors.equipmentType?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Accesorios:</label>
                                <div className='ErrorMsg'>
                                <select
                                        {...register(
                                            'accessories',{
                                                required:true,
                                            }
                                        )}
                                        id='accessories'
                                        onChange={(e)=> handleOnChange(e)}
                                        className='inputStyle'
                                    >
                                        <option value>Seleccione una opcion</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {errors.accessories?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
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

export default NuevoEquipo;
