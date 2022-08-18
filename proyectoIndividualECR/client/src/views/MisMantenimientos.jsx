import React,{useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Login from './Login';
import Swal from 'sweetalert2';

const MisEquipos = () => {
    const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors}, reset} = useForm();
    const [searchSomething,setSearchSomething]= useState({message:''});
    const [refresh, setRefresh] = useState(true)
    const [myMaintenance,setMyMaintenance] = useState([]);
    const [myMaintenanceState , setMyMaintenanceState] = useState(false);
    const [lastMaintenance,setLastMaintenance] = useState()
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
    const succesAlert = (mensaje) =>{
        Swal.fire({
            icon: 'success',
            text: mensaje,
        })
    }
    useEffect(() => {
        login();
        axios
            .get('http://localhost:8080/api/mymaintenance')
                .then(res=>{
                    setMyMaintenance([
                        ...res.data
                    ])
                })
        },[refresh])

        const handleOnChange =(e) =>{
            const search = e.target.name;
            setSearchSomething(search)
        }
        const onSubmit= (e) =>{
            e.preventDefault()
            
        }
        const deleteEquipment = (equipmentId) =>{
            axios.delete('http://localhost:8080/api/mymaintenance/' + equipmentId)
                .then(res =>{
                    setRefresh(!refresh)
                    succesAlert('Equipo correctamente eliminado') 
                })
                .catch((err) => {
                    alert(`Mensaje desde el back-End:
                    ${err.response.data.msg}:
                    ${err.response.data.error.message}`)
                    console.log(err)
                })
        }
        const updateMaintenanceState = () =>{
            setMyMaintenanceState(!myMaintenanceState)
        } // TENGO QUE ASIGNAR ESTE ESTADO AL USUARIO PARA QUE AVISE EL ESTADO DEL MANTENIMIENTO!!!

        const finishMaintenanceState= () =>{
            if(myMaintenanceState){}
        }
    return (
        <div>
            <Navigation/>
            <div className='bg'>
                <div className='upper'>
                    <h1>Mis Mantenimientos</h1>
                    <div style={{display:'none'}}>
                        Use esto como soporte, por tiempo jajaj
                    </div>
                </div>
                <form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Contrato equipo</th>
                                <th scope="col">Tecnico a cargo</th>
                                <th scope="col">Estado de mantenimiento</th>
                                <th scope="col">Inicio mantenimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                myMaintenance.map((item,idx)=>{
                                    return(
                                        <tr key={idx}>
                                            <th scope="row">{idx+1}</th>
                                            <td>{item.equipment}</td>
                                            <td>{item.contract?item.contract:"Sin contrato"}</td>
                                            <td>{item.technician}</td>
                                            <td>{myMaintenanceState?'Realizado':'En proceso'}</td>
                                            <td>{item.maintenanceDate?.substring(0,10)}</td>
                                            <td>
                                                <button onClick={(e)=>{deleteEquipment(item._id)}} className='button maintenanceButton'>
                                                    Terminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default MisEquipos;

