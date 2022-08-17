import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import Login from './Login'
import UpdateImg from '../components/UpdateImg';


const ModificarContrato= (props) =>{
    const navigate = useNavigate();
    const {id} =useParams();
    const {register,handleSubmit,formState: { errors }, reset} = useForm()
    const [myForm, setMyForm] = useState({
        contractType:'',
        startOfContract:'',
        contractTerm:'',
        equipmentOnContract:'',
        contractSupplier:'',
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

        axios.get('http://localhost:8080/api/mycontract/'+id)
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

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMyForm((values) => ({ ...values, [name]:value }))}

    const onSubmit = (e) =>{
        setMyForm(myForm);
        axios
            .put('http://localhost:8080/api/mycontract/'+id,myForm)
                .then(res=>{
                    alert('Contrato Actualizado!')
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
                    <h1>Modificar Contrato</h1>
                    <Link to="/mis-contratos">
                        <button className='button'>Mis Contratos</button>
                    </Link>
                </div>
                <div className='tarjetaLogin'>
                    <div className='formContainer'>
                        <form onSubmit={handleSubmit(onSubmit)} className='InterfaceFormContainer'>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Tipo de Contrato</label>
                                <div className='ErrorMsg'>
                                    <select
                                        {...register(
                                            'contractType',{
                                                required:true,
                                            }
                                        )}
                                        id='contractType'
                                        onChange={(e)=> handleOnChange(e)}
                                        value={myForm.contractType}
                                        className='inputStyle'
                                    >
                                        <option value="Anual">Anual</option>
                                        <option value="Semestral">Semestral</option>
                                        <option value="Trimestral">Trimestral</option>
                                        <option value="Cuatrimestral">Cuatrimestral</option>
                                    </select>
                                    {errors.contractType?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='dateInput'>
                                <label style={{color:'white'}}>Inicio del Contrato: </label>
                                <div className='ErrorMsg'>
                                    <div className='dateInputStyle'>
                                        <input
                                            type="date" {...register(
                                                'startOfContract',{
                                                    required:true,
                                                }
                                            )}
                                            id='startOfContract'
                                            onChange={(e)=> handleOnChange(e)}
                                            value={myForm.startOfContract}
                                            className='inputStyle'
                                        />
                                    </div>
                                    {errors.startOfContract?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='dateInput' >
                                <label style={{color:'white'}}>Fecha de termino del contrato: </label>
                                <div className='ErrorMsg'>
                                    <div>
                                        <input
                                            type="date" {...register(
                                                'contractTerm',{
                                                    required:true,
                                                }
                                            )}
                                            id='contractTerm'
                                            onChange={(e)=> handleOnChange(e)}
                                            value={myForm.contractTerm}
                                            className='inputStyle'
                                        />
                                    </div>
                                    {errors.contractTerm?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Serie de equipo en Contrato: </label>
                                <div className='ErrorMsg'>
                                    <input
                                        type="text" {...register(
                                            'equipmentOnContract',{
                                                required:true,
                                            }
                                        )}
                                        id='equipmentOnContract'
                                        onChange={(e)=> handleOnChange(e)}
                                        value={myForm.equipmentOnContract}
                                        className='inputStyle'
                                    />
                                    {errors.equipmentOncontract?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <div className='inputRow'>
                                <label style={{color:'white'}}>Proveedor: </label>
                                <div className='ErrorMsg'>
                                    <input
                                        type="text" {...register(
                                            'contractSupplier',{
                                                required:true,
                                            }
                                        )}
                                        id='contractSupplier'
                                        onChange={(e)=> handleOnChange(e)}
                                        value={myForm.contractSupplier}
                                        className='inputStyle'
                                    />
                                    {errors.contractSupplier?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                                </div>
                            </div>
                            <input type="submit" value={"Actualizar"} className='interfaceSubmitBoton'/>
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

export default ModificarContrato;

