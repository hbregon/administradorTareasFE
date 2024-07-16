import React, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { connect } from "formik";
import "semantic-ui-css/semantic.min.css";

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

  const [filasFiltradas, setFilasFiltradas] = useState(listaColaboradores);

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

  return (
    <div>
      <div>
        Filtros
        <Select
          id="selectColaborador"
          name="colaborador"
          options={listaColaboradores}
          placeholder="Seleccione un colaborador"
          onChange={(option) => setOpcionSeleccionadaColaborador(option.label)}
        />
        <Select
          id="selectEstado"
          name="estado"
          options={listaEstados}
          placeholder="Seleccione un estado"
          onChange={(opcion) => setOpcionSeleccionadaEstado(opcion.label)}
        />
        <Select
          id="selectPrioridad"
          name="prioridad"
          options={listaPrioridades}
          placeholder="Seleccione una prioridad"
          onChange={(opcion) => setOpcionSeleccionadaPrioridad(opcion.label)}
        />
      </div>
      <DataTable
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
  if (opciones.selectedCount === 1) {
    const div = document.createElement("div");
    div.id = "idTarea";
    div.value = opciones.selectedRows[0];
    div.innerText = opciones.selectedRows[0];
    div.style.display = "none";
    document.body.appendChild(div);
    console.log(div.value);
  }
}

function manejadorFiltro() {

}

export default Tabla;
