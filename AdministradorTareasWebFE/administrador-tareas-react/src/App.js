import "./App.css";
import Tabla from "./componentes/tabla/Tabla";
import EliminarTarea from "./componentes/eliminarTarea/EliminarTarea";
import React, { useEffect, useState, useContext, createContext } from "react";
import AgregarModificarTarea from "./componentes/agregarModificarTarea/AgregarModificarTarea";

export const TareaContext = React.createContext();

function App() {
  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col col-md-8">
            <AgregarModificarTarea />
          </div>
          <div className="col col-md-4">
            <EliminarTarea />
          </div>
        </div>
      </div>
      <div>
        <Tabla />
      </div>
    </div>
  );
}

export default App;
