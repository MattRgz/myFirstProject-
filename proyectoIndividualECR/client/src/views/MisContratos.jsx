import React,{useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import '../styles/ShowInterface.scss';
import Swal from 'sweetalert2';

const MisContratos = () => {
    const navigate = useNavigate();
    const [contract, setContract] = useState([]);
    const [searchSomething,setSearchSomething]= useState({message:''});
    const [refresh, setRefresh] = useState(true)
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
        login()
        axios.get("http://localhost:8080/api/mycontract")
            .then(res=>{
                setContract([
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
        const deleteContract = (contractId) =>{
            axios.delete('http://localhost:8080/api/mycontract/' + contractId)
                .then(res =>{
                    succesAlert('Contrato correctamente eliminado')
                    setRefresh(!refresh)
                }
                )
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
                    <h1>Mis Contratos</h1>
                    <Link to="/nuevo-Contrato">
                        <button className='button'>Agregar Contrato</button>
                    </Link>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Tipo de Contrato</th>
                            <th scope="col">Proovedor</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Termino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                            contract.map((item,idx)=>{
                                                return(
                                                    <tr key={idx}>
                                                        <th scope="row">{idx+1}</th>
                                                        <td>{item.equipmentOnContract}</td>
                                                        <td>{item.contractType}</td>
                                                        <td>{item.contractSupplier}</td>
                                                        <td>{item.startOfContract.slice(0,10)}</td>
                                                        <td>{item.contractTerm.slice(0,10)}</td>
                                                        <td>
                                                            <Link to={'/mis-contratos/'+item._id+'/edit'}>
                                                                <button className='button tableButton'>
                                                                    Editar
                                                                </button>
                                                            </Link>
                                                            <button onClick={(e)=>{deleteContract(item._id)}} className='button tableButton'>
                                                                Eliminar
                                                            </button>
                                                        </td>
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

export default MisContratos;
