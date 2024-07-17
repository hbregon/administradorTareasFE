import React, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { connect } from "formik";
import "semantic-ui-css/semantic.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Tabla() {
  const columnas = [
    {
      name: "Descripción",
      selector: (fila) => fila.descripcion,
    },
    {
      name: "Colaborador",
      selector: (fila) => fila.nombreColaborador,
    },
    {
      name: "Estado",
      selector: (fila) => fila.estado,
    },
    {
      name: "Prioridad",
      selector: (fila) => fila.prioridad,
    },
    {
      name: "Fecha Inicio",
      selector: (fila) => fila.fechaInicio,
    },
    {
      name: "Fecha Fin",
      selector: (fila) => fila.fechaFin,
    },
  ];

  const [listaColaboradores, setlistaColaboradores] = useState("none");
  const [opcionSeleccionadaColaborador, setOpcionSeleccionadaColaborador] =
    useState("none");
  const [opcionSeleccionadaEstado, setOpcionSeleccionadaEstado] =
    useState("none");
  const [opcionSeleccionadaPrioridad, setOpcionSeleccionadaPrioridad] =
    useState("none");

  const listaEstados = [
    { value: 1, label: "PENDIENTE" },
    { value: 2, label: "EN PROCESO" },
    { value: 3, label: "FINALIZADA" },
  ];

  const listaPrioridades = [
    { value: 1, label: "ALTA" },
    { value: 2, label: "MEDIA" },
    { value: 3, label: "BAJA" },
  ];

  const [fechaInicioFiltro, setFechaInicioFiltro] = useState(new Date());
  const [fechaFinFiltro, setFechaFinFiltro] = useState(new Date());

  const [resultado, setResultado] = useState([]);
  useEffect(() => {
    obtenerListaTareas().then((respuestaTareas) => {
      obtenerListaColaboradores()
        .then((respuestaColaboradores) => {
          for (let index = 0; index < respuestaTareas.length; index++) {
            for (
              let index2 = 0;
              index2 < respuestaColaboradores.length;
              index2++
            ) {
              if (
                respuestaTareas[index].idColaborador ===
                respuestaColaboradores[index2].idColaborador
              ) {
                respuestaTareas[index].nombreColaborador =
                  respuestaColaboradores[index2].nombre;
              }
              respuestaColaboradores[index2].value =
                respuestaColaboradores[index2].idColaborador;
              respuestaColaboradores[index2].label =
                respuestaColaboradores[index2].nombre;
            }
          }
          setlistaColaboradores(respuestaColaboradores);
          setResultado(respuestaTareas);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const [filasFiltradas, setFilasFiltradas] = useState([]);

  function manejadorFiltro() {
    const nuevoResultado = resultado.filter((fila) => {
      const nombreColaborador = listaColaboradores.find((filaColaborador) => filaColaborador.value === parseInt(opcionSeleccionadaColaborador)).nombre;
      const estadoLabel = listaEstados.find((filaEstado) => filaEstado.value === parseInt(opcionSeleccionadaEstado)).label;
      const prioridadLabel = listaPrioridades.find((filaPrioridad) => filaPrioridad.value === parseInt(opcionSeleccionadaPrioridad)).label;
      if (nombreColaborador === undefined) {
        nombreColaborador = ""
      }
      if (estadoLabel === undefined) {
        estadoLabel = ""
      }
      if (prioridadLabel === undefined) {
        prioridadLabel = ""
      }
      return fila.nombreColaborador === nombreColaborador || fila.estado === estadoLabel || fila.prioridad === prioridadLabel;
    });
    setResultado(nuevoResultado);
  }

  return (
    <div>
      <div className="row">
        <div className="col col-md-12">
          <button
            type="button"
            class="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target="#modalFiltros"
            id="botonFiltrar"
            onClick={() => setResultado(resultado)}
          >
            Filtros
          </button>
          <div
            class="modal fade"
            id="modalFiltros"
            tabindex="-1"
            aria-labelledby="modalFiltrosLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalFiltrosLabel">
                    Filtros
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <Select
                    id="selectColaborador"
                    name="colaborador"
                    options={listaColaboradores}
                    placeholder="Seleccione un colaborador"
                    onChange={(option) => setOpcionSeleccionadaColaborador(option.value)}
                  />
                  <Select
                    id="selectEstado"
                    name="estado"
                    options={listaEstados}
                    placeholder="Seleccione un estado"
                    onChange={(opcion) => setOpcionSeleccionadaEstado(opcion.value)}
                  />
                  <Select
                    id="selectPrioridad"
                    name="prioridad"
                    options={listaPrioridades}
                    placeholder="Seleccione una prioridad"
                    onChange={(opcion) => setOpcionSeleccionadaPrioridad(opcion.value)}
                  />
                  <label>Fecha Inicio: </label>
                  <DatePicker
                    selected={fechaInicioFiltro}
                    onChange={(fechaInicioFiltro) =>
                      setFechaInicioFiltro(fechaInicioFiltro)
                    }
                    disabled
                  />
                  <br></br>
                  <label>Fecha Fin: </label>
                  <DatePicker
                    selected={fechaFinFiltro}
                    onChange={(fechaFinFiltro) =>
                      setFechaFinFiltro(fechaFinFiltro)
                    }
                    disabled
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    id="botonCerrar"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    //onClick={() => }
                  >
                    Cerrar
                  </button>
                  <button type="submit" class="btn btn-info" onClick={manejadorFiltro}>
                    Filtrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DataTable
        id="tablaTareas"
        columns={columnas}
        noDataComponent="Cargando datos"
        data={resultado}
        title="Lista de Tareas"
        defaultSortAsc={5}
        selectableRows
        onSelectedRowsChange={(opciones) => manejadorSeleccionFila(opciones)}
        pagination
      />
    </div>
  );
}

function obtenerListaColaboradores() {
  return new Promise((resuelta, rechazada) => {
    fetch(
      "https://administadortareasapi.azurewebsites.net/api/Colaborador/Lista"
    )
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((colaboradores) => {
        resuelta(colaboradores.respuesta);
      })
      .catch((error) => rechazada(error));
  }, []);
}

function obtenerListaTareas() {
  return new Promise((resuelta, rechazada) => {
    fetch("https://administadortareasapi.azurewebsites.net/api/Tarea/Lista")
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((tareas) => {
        resuelta(tareas.respuesta);
      })
      .catch((error) => rechazada(error));
  }, []);
}

function manejadorSeleccionFila(opciones) {
  const div = document.createElement("div");
  if (opciones.selectedCount === 0) {
    document.getElementById("botonEliminar").disabled = true;
    document.getElementById("botonModificar").disabled = true;
  } else if (opciones.selectedCount === 1) {
    div.id = "idTarea";
    div.value = opciones.selectedRows[0];
    div.innerText = opciones.selectedRows[0];
    div.style.display = "none";
    document.body.appendChild(div);
    console.log(div.value);
    if (opciones.selectedRows[0].estado === "EN PROCESO") {
      document.getElementById("botonEliminar").disabled = true;
      document.getElementById("botonModificar").disabled = false;
    } else if (opciones.selectedRows[0].estado === "FINALIZADA") {
      document.getElementById("botonEliminar").disabled = false;
      document.getElementById("botonModificar").disabled = true;
    } else {
      document.getElementById("botonEliminar").disabled = false;
      document.getElementById("botonModificar").disabled = false;
    }
  } else if (opciones.selectedCount > 1) {
    alert("Solo puede marcar una fila para poder hacer alguna acción");
    div.remove();
  } else {
    document.getElementById("botonEliminar").disabled = false;
    document.getElementById("botonModificar").disabled = false;
  }
}

export default Tabla;
