import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login (){
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
}