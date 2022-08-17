import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import Login from './Login';
import UpdateImg from '../components/UpdateImg';

const NuevoCapitalHumano = () => {
    const navigate = useNavigate();
    const {id} =useParams();
    const{register,handleSubmit,formState:{errors},reset} = useForm();
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
        axios.get('http://localhost:8080/api/mycolaborator/'+id)
        .then(res=>{
            reset(res.data)
            setMyForm({
                ...res.data
            }
            )
        }
            )
            .catch(err => console.log(err))
    }, []);
    const handleOnChange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setMyForm((values)=>({...values,[name]:value}))
    }
    const onSubmit = (e) =>{
        
        axios
            .put('http://localhost:8080/api/mycolaborator/'+id,myForm)
                .then(res=>{
                    alert('Mantenimiento Agregado!')
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
                        <h1>Editar Colaborador</h1>
                        <Link to="/capital-Humano">
                            <button button className='button'>Mis Colaboradores</button>
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
                                            value={myForm.colaboratorName}
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
                                            value={myForm.colaboratorId}
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
                                            value={myForm.colaboratorCharge}
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
                                            value={myForm.colaboratorArea}
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
                                <div className='interfaceSubmitBotonContainer'>
                                    <input type="submit" value="Actualizar" className='interfaceSubmitBoton'/>
                                </div>
                            </form>
                        </div>
                        <div className='SVG'>
                            <UpdateImg/>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default NuevoCapitalHumano;