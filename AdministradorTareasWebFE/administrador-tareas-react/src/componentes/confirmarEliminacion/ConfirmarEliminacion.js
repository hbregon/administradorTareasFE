import { Component } from "react";

class ConfirmarEliminacion extends Component {
  render() {
    return (
      <div
        class="modal fade"
        id="ConfirmarEliminacionModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Eliminar Tarea
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">¿Seguro que desea eliminar la tarea seleccionada?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={eliminarTareaPorId}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function eliminarTareaPorId() {
  const divIdTarea = document.getElementById("idTarea");
  if (divIdTarea !== null) {
    fetch(
      `https://administadortareasapi.azurewebsites.net/api/Tarea/Eliminar/${divIdTarea.value.idTarea}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    ).then((respuesta) => {
      respuesta.json();
      if (respuesta.status === 200) {
        window.location.reload(true);
        alert("Se elimino correctamente la tarea");
        divIdTarea.remove();
      }
    });
  }
}

export default ConfirmarEliminacion;
