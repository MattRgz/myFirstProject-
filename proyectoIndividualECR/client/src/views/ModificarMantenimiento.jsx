import React,{useState,useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Link,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Login from './Login'

const MisMantenimientos = () => {
    const navigate = useNavigate();
    const{register,handleSubmit,formState:{errors},reset} = useForm();
    const {equipmentSerialNumber} =useParams();
    const [myForm, setMyForm] = useState({
        technician:'',
        contract:'',
        equipment:'',
    });
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
    const [myColaborator, setMyColaborator] = useState({
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
        axios.get('http://localhost:8080/api/myequipment/buscar/'+equipmentSerialNumber)
        .then(res=>{
            reset(res.data)
                setMyForm({
                    ...res.data
                }
                )
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
        .catch(err => console.log(err))
        axios.get("http://localhost:8080/api/mycolaborator")
            .then(res=>{
                setMyColaborator([
                    ...res.data
                ]
                )
                console.log(res)
            })
            .catch(err=>console.log(err))
    }, []);

    return (
        <div>
            <Navigation/>
            <div>
                <p>EQUIPO: <span>{myEquipment.equipmentUbication}</span></p>
                <p>CONTRATO: <span>{myContract.equipmentUbication}</span></p>
                <p>CAPITAL HUMANO: <span>{myColaborator.equipmentUbication}</span></p>
            </div>
        </div>
    );
}

export default MisMantenimientos;
