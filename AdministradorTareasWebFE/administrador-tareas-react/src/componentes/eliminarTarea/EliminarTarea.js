import React, { useContext, useEffect, useState } from "react";
import ConfirmarEliminacion from "../confirmarEliminacion/ConfirmarEliminacion";

class EliminarTarea extends React.Component {

  render() {
    return (
      <div>
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#ConfirmarEliminacionModal"
        >
          Eliminar Tarea
        </button>
        <ConfirmarEliminacion/>
      </div>
    );
  }
}

export default EliminarTarea;
