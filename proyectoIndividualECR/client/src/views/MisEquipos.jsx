import React,{useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ShowInterface.scss';
import Swal from 'sweetalert2';

const MisEquipos = () => {
    const [equipment, setEquipment] = useState([]);
    const [searchSomething,setSearchSomething]= useState({message:''});
    const [refresh, setRefresh] = useState(true)
    const navigate = useNavigate();
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
        axios.get("http://localhost:8080/api/myequipment")
            .then(res=>{
                setEquipment([
                    ...res.data
                ]
                )
                console.log(res)
            })
            .catch(err=>console.log(err))
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
            axios.delete('http://localhost:8080/api/myequipment/' + equipmentId)
                .then(res =>{
                    succesAlert('Equipo Correctamente Eliminado')
                    setRefresh(!refresh)
                })
                .catch((err) => {
                    alert(`Mensaje desde el back-End:
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
                    <h1>Mis Equipos</h1>
                    <Link to="/nuevo-equipo">
                        <button className='button'>Agregar Equipo</button>
                    </Link>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Serie</th>
                                <th scope="col">Estado Actual del Equipo</th>
                                <th scope="col">Ubicacion</th>
                                <th scope="col">Accesorios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                            equipment.map((item,idx)=>{
                                                return(
                                                    <tr key={idx}>
                                                        <th scope="row">{idx+1}</th>
                                                        <td>{item.equipmentModel}</td>
                                                        <td>{item.equipmentSerialNumber}</td>
                                                        <td>{item.equipmentState}</td>
                                                        <td>{item.equipmentUbication}</td>
                                                        <td>{item.accessories}</td>
                                                        <div>
                                                            <td>
                                                                <Link to={'/'+item._id+'/edit'}>
                                                                    <button className='button tableButton'>
                                                                        Editar
                                                                    </button>
                                                                </Link>
                                                                <Link to={'/buscando/'+item.equipmentSerialNumber}>
                                                                    <button className='button tableButton'>
                                                                        Detalle
                                                                    </button>
                                                                </Link>
                                                                <Link to={'/mantenimiento/'+item.equipmentSerialNumber}>
                                                                    <button className='button tableButton'>
                                                                        Mantenimiento
                                                                    </button>
                                                                </Link>
                                                                <button onClick={(e)=>{deleteEquipment(item._id)}} className='button tableButton'>
                                                                    Eliminar
                                                                </button>
                                                            </td>
                                                        </div>
                                                    </tr>
                                                )
                                            })
                                        }
                                {/* })
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MisEquipos;
