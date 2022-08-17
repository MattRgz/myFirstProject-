import './App.css';
import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Error404 from './views/Error404';
import CapitalHumano from './views/CapitalHumano';
import MisEquipos from './views/MisEquipos';
import MisContratos from './views/MisContratos';
import MisMantenimientos from './views/MisMantenimientos';
import NuevoContrato from './views/NuevoContrato';
import ModificarContrato from './views/ModificarContrato';
import NuevoEquipo from './views/NuevoEquipo';
import ModificarEquipo from './views/ModificarEquipo';
import NuevoCapitalHumano from './views/NuevoCapitalHumano';
import ModificarCapitalHumano from './views/ModificarCapitalHumano'
import BuscarEquipo from './views/BuscarEquipo';
import NuevoMantenimiento from './views/NuevoMantenimiento';
import Login from './views/Login'
import Register from './views/Register';
import {UsersContextProvider} from './context/UserContext'

function App() {
  return (
    <UsersContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Error404/>}/>
            <Route exact path ='/capital-Humano' element={<CapitalHumano/>}/>
            <Route exact path ='/nuevo-colaborador' element={<NuevoCapitalHumano/>}/>
            <Route exact path ='/capital-Humano/:id/edit' element={<ModificarCapitalHumano/>}/>
            <Route exact path='/' element={<MisEquipos/>}/>
            <Route exact path='/mis-contratos' element={<MisContratos/>}/>
            <Route exact path='/mis-mantenimientos' element={<MisMantenimientos/>}/>
            <Route exact path='/nuevo-Contrato' element={<NuevoContrato/>}/>
            <Route exact path='/mis-contratos/:id/edit' element={<ModificarContrato/>}/>
            <Route exact path='/nuevo-equipo' element={<NuevoEquipo/>}/>
            <Route exact path='//buscando/:equipmentSerialNumber' element={<BuscarEquipo/>}/>
            <Route exact path='//:id/edit' element={<ModificarEquipo/>}/>
            <Route exact path='//mantenimiento/:equipmentSerialNumber' element={<NuevoMantenimiento/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </UsersContextProvider>
  );
}

export default App;
