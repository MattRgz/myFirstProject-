import React,{useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login'

const MisEquipos = () => {
    const navigate = useNavigate();
    const [searchSomething,setSearchSomething]= useState({message:''});
    const [refresh, setRefresh] = useState(true)
    const [myMaintenance,setMyMaintenance] = useState([]);
    const [myMaintenanceState , setMyMaintenanceState] = useState(false)
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
        const handleSubmit= (e) =>{
            e.preventDefault()
            setSearchSomething(searchSomething)
        }
        const deleteEquipment = (equipmentId) =>{
            axios.delete('http://localhost:8080/api/mymaintenance/' + equipmentId)
                .then(res =>{
                    alert('Equipo Correctamente Eliminado')
                    setRefresh(!refresh)
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
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Ultimo Mantenimiento</th>
                                <th scope="col">Tecnico a cargo</th>
                                <th scope="col">Estado de mantenimiento</th>
                                <th scope="col">Mantenimiento actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                myMaintenance.map((item,idx)=>{
                                    return(
                                        <tr key={idx}>
                                            <th scope="row">{idx+1}</th>
                                            <td>{item.equipment}</td>
                                            <td>{item.contract}</td>
                                            <td>{item.technician}</td>
                                            <td>{myMaintenanceState?'Realizado':'En Progreso'}</td>
                                            <td></td>
                                            <td>
                                                <button onClick={(e)=>{deleteEquipment(item._id)}} className='button maintenanceButton'>
                                                    Mantenimiento Terminado!
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MisEquipos;

