import React,{useState,useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const BuscarEquipo = () => {
    const navigate = useNavigate();
    const {equipmentSerialNumber} =useParams();
    const [myEquipment, setMyEquipment] = useState({
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
    const [myContract, setMyContract] = useState({
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
        login();
        axios.get('http://localhost:8080/api/myequipment/buscar/'+equipmentSerialNumber)
            .then(res=>{
                setMyEquipment({
                ...res.data
                })
                console.log(res)
            }
            )
            .catch(err => console.log(err))
        axios.get('http://localhost:8080/api/mycontract/buscar/'+equipmentSerialNumber)
            .then(res=>{
                setMyContract({
                ...res.data
                })
                console.log(res)
            }
            )
        .catch(err => setMyContract({
            contractType:'Equipo sin contrato',
            startOfContract:'Equipo sin contrato',
            contractTerm:'Equipo sin contrato',
            equipmentOnContract:'Equipo sin contrato',
            contractSupplier:'Equipo sin contrato',
        }))
    }, []);

    return (
        <div>
            <Navigation/>
            <div className='bg'>
                <div className='upper'>
                    <h1>Equipo {myEquipment.equipmentSerialNumber}</h1>
                    <Link to="/">
                        <button className='button'>Mis Equipos</button>
                    </Link>
                </div>
                <table>
                    <tr>
                        <th>Serie:</th>
                        <td>{myEquipment.equipmentSerialNumber}</td>
                    </tr>
                    <tr>
                        <th>Modelo:</th>
                        <td>{myEquipment.equipmentModel}</td>
                    </tr>
                    <tr>
                        <th>Estado:</th>
                        <td>{myEquipment.equipmentState}</td>
                    </tr>
                    <tr>
                        <th>Ubicacion:</th>
                        <td>{myEquipment.equipmentUbication}</td>
                    </tr>
                    <tr>
                        <th>Tipo:</th>
                        <td>{myEquipment.equipmentType}</td>
                    </tr>
                    <tr>
                        <th>Accesorios:</th>
                        <td>{myEquipment.accessories}</td>
                    </tr>
                    <tr>
                        <th>Tipo de Contrato:</th>
                        <td>{myContract.contractType? myContract.contractType:"Equipo sin contrato"}</td>
                    </tr>
                    <tr>
                        <th>Inicio de contrato:</th>
                        <td>{myContract.startOfContract?.slice(0,10)}</td>
                    </tr>
                    <tr>
                        <th>Termino de contrato:</th>
                        <td>{myContract.contractTerm?.slice(0,10)}</td>
                    </tr>
                    <tr>
                        <th>Proveedor:</th>
                        <td>{myContract.contractSupplier}</td>
                    </tr>
                    <tr>
                        <th>Observaciones:</th>
                        <td>{myEquipment.observation}</td>
                    </tr>   
                </table>
            </div>
        </div>
    );
}

export default BuscarEquipo;

