import React,{useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

const CapitalHumano = () => {
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
    useEffect(() => {
        login()
        axios.get("http://localhost:8080/api/mycolaborator")
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
            axios.delete('http://localhost:8080/api/mycolaborator/' + contractId)
                .then(res =>{
                    alert('Colaborador correctamente Eliminado')
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
                    <h1>Mi Capital Humano</h1>
                    <Link to="/nuevo-colaborador">
                        <button className='button'>Agregar Colaborador</button>
                    </Link>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Identificador</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                // contract.filter((item)=>{
                                //     if(item.equipmentOnContract === searchSomething|| 
                                //         item.contractType === searchSomething ||
                                //         item.contractSupplier === searchSomething ||
                                //         item.startOfContract === searchSomething ||
                                //         item.contractTerm === searchSomething
                                //     )
                                        // {
                                            contract.map((item,idx)=>{
                                                return(
                                                    <tr key={idx}>
                                                        <th scope="row">{idx+1}</th>
                                                        <td>{item.colaboratorName}</td>
                                                        <td>{item.colaboratorId}</td>
                                                        <td>{item.colaboratorCharge}</td>
                                                        <td>{item.colaboratorArea}</td>
                                                        <td>
                                                            <Link to={'/capital-Humano/'+item._id+'/edit'}>
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

export default CapitalHumano;
