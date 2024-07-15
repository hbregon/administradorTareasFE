import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'

function Tabla() {
    const columnas = [
        {   
            name: 'Descripción',
            selector: fila => fila.descripcion
        },
        {
            name: 'Colaborador',
            selector: fila => fila.nombreColaborador
        },
        {
            name: 'Estado',
            selector: fila => fila.estado
        },
        {
            name: 'Prioridad',
            selector: fila => fila.prioridad
        },
        {
            name: 'Fecha Inicio',
            selector: fila => fila.fechaInicio
        },
        {
            name: 'Fecha Fin',
            selector: fila => fila.fechaFin
        },
    ];

    const [resultado, setResultado] = useState([]);
    useEffect(() =>{
        const timer = setInterval(() =>{
            obtenerListaTareas()
        .then((respuestaTareas) => {
            obtenerListaColaboradores()
                .then((respuestaColaboradores) => {
                    for (let index = 0; index < respuestaTareas.length; index++) {
                        for (let index2 = 0; index2 < respuestaColaboradores.length; index2++) {
                            if (respuestaTareas[index].idColaborador === respuestaColaboradores[index2].idColaborador) 
                            {
                                respuestaTareas[index].nombreColaborador = respuestaColaboradores[index2].nombre
                            }
                        }
                    }
                    setResultado(respuestaTareas)
                })
                .catch((error) => console.log(error))
        })
        }, 8000);
    }, [])
    

    return (
        <div>
            <DataTable
                columns={columnas}
                noDataComponent = 'La tabla no tiene datos'
                data={resultado}
                title="Tareas"
                defaultSortAsc={5}
                />
        </div>
    )
}

function obtenerListaColaboradores() {
    return new Promise((resuelta, rechazada) => {
            fetch("https://administadortareasapi.azurewebsites.net/api/Colaborador/Lista")
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((colaboradores) => {
                resuelta(colaboradores.respuesta);
            })
            .catch((error) => rechazada(error))
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
        .catch((error) => rechazada(error))
    }, []);
}

export default Tabla;