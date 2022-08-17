import React,{useState,useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Link, useParams,useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import CreateImg from '../components/CreateImg';


const NuevoMantenimiento = () => {
    const navigate = useNavigate();
    const {equipmentSerialNumber} =useParams();
    const{register,handleSubmit,formState:{errors}, reset} = useForm();
    const [myForm, setMyForm] = useState({
        technician:'',
        equipment:equipmentSerialNumber,
        maintenanceDate: new Date().toDateString(),
    });
    const [myContract, setMyContract] = useState({
        contractType:'',
        startOfContract:'',
        contractTerm:'',
        equipmentOnContract:'',
        contractSupplier:'',
    });
    const [myColaborator,setMyColaborator] = useState([])


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

    axios.get('http://localhost:8080/api/mycontract/buscar/'+equipmentSerialNumber)
            .then(res=>{
                reset(res.data)
                setMyContract(res.data)
                })
            .catch(err => console.log(err))
    axios.get('http://localhost:8080/api/mycolaborator')
        .then(res=>{
                setMyColaborator([
                ...res.data
                ])
            }
            )
        .catch(err => console.log(err))
}, []);

const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMyForm((values) => ({ ...values, [name]:value }))}
    

const onSubmit = (e) =>{
    console.log("22222",myForm)
    setMyForm(myForm);
    console.log("11111",myForm)
    axios
        .post('http://localhost:8080/api/mymaintenance',myForm)
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
                    <h1>Nuevo Mantenimiento</h1>
                    <Link to="/mis-mantenimientos">
                        <button className='button'>Mis Mantenimientos</button>
                    </Link>
                </div>
                <div className='tarjetaLogin'>
                <div className='formContainer'>
                    <form onSubmit={handleSubmit(onSubmit)} className='InterfaceFormContainer'>
                        <div className='inputRow'>
                            <label style={{color:'white'}}> Serie: </label>
                            <div className='ErrorMsg'>
                                <input  
                                    type="text" 
                                    {...register(
                                            'equipment',{
                                                required:false,
                                            }
                                    )}
                                    id='equipment'
                                    onChange={(e)=> handleOnChange(e)}
                                    value={myContract? myContract.equipmentOnContract:"Equipo sin contrato"}
                                    disabled
                                    className='inputStyle'
                                />
                                {errors.equipment?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                            </div>
                        </div>
                        <div className='inputRow'>
                            <label style={{color:'white'}}>Tecnico a cargo:</label>
                            <div className='ErrorMsg'>
                                <select
                                    {...register(
                                        'technician',{
                                            required:true,
                                        }
                                    )}
                                    id='technician'
                                    onChange={(e)=> handleOnChange(e)}
                                    className='inputStyle'
                                >
                                    <option value="">Seleccione una opcion</option>
                                    {myColaborator?.map((item,idx)=>{
                                        return(
                                            <option value={`${item.colaboratorName? item.colaboratorName:null}`}>{item.colaboratorName?item.colaboratorName:null}</option>
                                        )
                                    })}
                                </select>
                                {errors.technician?.type === 'required' && <p style={{color:'white'}}>El campo no debe estar vacio</p>}
                            </div>
                        </div>
                        {
                            equipmentSerialNumber===myContract.equipmentOnContract? <input type="submit" value="Crear" className='interfaceSubmitBoton'/> : <h3  style={{color:'white', textAlign:"center"}}> Equipo sin contrato! </h3>
                        }
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
export default NuevoMantenimiento;
