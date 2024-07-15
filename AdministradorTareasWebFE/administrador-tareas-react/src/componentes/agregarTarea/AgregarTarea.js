import React, { useEffect, useState }  from 'react';
import './AgregarTarea.css'
import { Formik, Form, Field, ErrorMessage, isNaN } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker"
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup"

function AgregarTarea() {
    const [listaColaboradores, setlistaColaboradores] = useState("none");
    const [opcionSeleccionadaColaborador, setOpcionSeleccionadaColaborador] = useState("none");
    const [opcionSeleccionadaEstado, setOpcionSeleccionadaEstado] = useState("none");
    const [opcionSeleccionadaPrioridad, setOpcionSeleccionadaPrioridad] = useState("none");
    const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState(new Date());
    const [fechaFinSeleccionada, setFechaFinSeleccionada] = useState(new Date());
    
    
    useEffect(() =>{
        obtenerListaColaboradores()
        .then((respuestaColaboradores) => {
            for (let index = 0; index < respuestaColaboradores.length; index++) {
                respuestaColaboradores[index].value = respuestaColaboradores[index].idColaborador
                respuestaColaboradores[index].label = respuestaColaboradores[index].nombre
            }
            setlistaColaboradores(respuestaColaboradores)
        })
        .catch((error) => console.log(error))
    }, [])

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

    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Tarea</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <Formik
                    initialValues={{ descripcion: "", colaborador: 0, fechaInicio: new Date(), fechaFin: new Date(), nota: "" }}
                    validate={valores => {
                        let errores = {};
                        if (valores.descripcion === "") {
                            errores.descripcion = "Descripción es requerida";
                        }
                        if (document.getElementById("selectEstado").childNodes[3].value !== '' && document.getElementById("selectEstado").childNodes[3].value !== 1 && document.getElementById("selectColaborador").childNodes[3].value === '') {
                            errores.colaborador = "El colaborador es requerido para el tipo de estado seleccionado";
                        }
                        if (document.getElementById("fechaInicio").value === "") {
                            errores.fechaInicio = "Fecha de Inicio es requerida";
                        } else if (isNaN(Date.parse(document.getElementById("fechaInicio").value))) {
                            errores.fechaInicio = "Fecha de Inicio tiene un formato incorrecto"
                        }
                        if (document.getElementById("fechaFin").value === "") {
                            errores.fechaFin = "Fecha Fin es requerida";
                        }else if (isNaN(Date.parse(document.getElementById("fechaFin").value))) {
                            errores.fechaFin = "Fecha Fin tiene un formato incorrecto"
                        }
                        return errores;
                    }}
                    onSubmit={(valores, { setSubmitting }) => {
                        manejadorGuardarTarea(valores, opcionSeleccionadaColaborador, opcionSeleccionadaEstado, opcionSeleccionadaPrioridad, fechaInicioSeleccionada, fechaFinSeleccionada)
                        valores.descripcion = "";
                        document.getElementById("selectColaborador").childNodes[3].value = '';
                        document.getElementById("selectEstado").childNodes[3].value = '';
                        document.getElementById("selectPrioridad").childNodes[3].value = '';
                        valores.fechaInicio = new Date();
                        valores.fechaFin = new Date(); 
                        valores.nota = "";
                        setSubmitting(false);
                        document.getElementById("botonCerrar").click();
                    }}
                >
                    {(touched, errores, isSubmitting) => (
                        <Form>
                            {(
                                <div class="modal-body">
                                <div id="feedback-form">
                                    <div className="form-group">
                                        <label htmlFor="descripcion">Descripción</label>
                                        <Field
                                            type="text"
                                            name="descripcion"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="descripcion"
                                            className={`error=message ${touched.descripcion && errores.descripcion ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="colaborador">Colaborador: </label>
                                        <Select
                                        id="selectColaborador"
                                        name="colaborador"
                                        options={listaColaboradores}
                                        placeholder='Seleccione un colaborador'
                                        onChange={(option) => setOpcionSeleccionadaColaborador(option.value)}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="colaborador"
                                            className={`error-message ${touched.colaborador && errores.colaborador ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="estado">Estado: </label>
                                        <Select
                                            id="selectEstado"
                                            name="estado"
                                            options={listaEstados}
                                            placeholder="Seleccione un estado"
                                            onChange={(opcion) => setOpcionSeleccionadaEstado(opcion.label)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="prioridad">Prioridad: </label>
                                        <Select
                                            id="selectPrioridad"
                                            name="prioridad"
                                            options={listaPrioridades}
                                            placeholder="Seleccione una prioridad"
                                            onChange={(opcion) => setOpcionSeleccionadaPrioridad(opcion.label)}
                                        ></Select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fechaInicio">Fecha Inicio</label>
                                        <DatePicker
                                        name="fechaInicio"
                                        id="fechaInicio"
                                        selected={fechaInicioSeleccionada}
                                        onChange={(fechaInicioSeleccionada) => setFechaInicioSeleccionada(fechaInicioSeleccionada)}
                                        className="form-control"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="fechaInicio"
                                            className={`error-message ${touched.fechaInicio && errores.fechaInicio ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fechaFin">Fecha Fin</label>
                                        <DatePicker
                                        name="fechaFin"
                                        id="fechaFin"
                                        selected={fechaFinSeleccionada}
                                        onChange={(fechaFinSeleccionada) => setFechaFinSeleccionada(fechaFinSeleccionada)}
                                        className="form-control"
                                        
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="fechaFin"
                                            className={`error-message ${touched.fechaFin && errores.fechaFin ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="nota">Notas</label>
                                        <Field
                                            type="text"
                                            name="nota"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="nota"
                                            className={`form-control ${touched.nota && errores.nota ? "is-invalid" : ""
                                                }`}
                                        />
                                        <br></br>
                                    </div>
                                    
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="botonCerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" class="btn btn-primary" disabled={isSubmitting}>Guardar</button>
                                    </div>
                                    <br />
                                </div>
                            )}

                        </Form>
                    )}
                    </Formik>
                       
                    </div>
                </div>
            </div>
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

function manejadorGuardarTarea(valores, opcionSeleccionadaColaborador, opcionSeleccionadaEstado, opcionSeleccionadaPrioridad, fechaInicioSeleccionada, fechaFinSeleccionada){
        const descripcion = valores.descripcion;
        if (opcionSeleccionadaColaborador === '' || opcionSeleccionadaColaborador === 'none') {
            opcionSeleccionadaColaborador = 0
        }
        if (opcionSeleccionadaEstado === '' || opcionSeleccionadaEstado === 'none') {
            opcionSeleccionadaEstado = "PENDIENTE"
        }
        if (opcionSeleccionadaPrioridad === '' || opcionSeleccionadaPrioridad === 'none') {
            opcionSeleccionadaPrioridad = "BAJA"
        }
        const nota = valores.nota;
        fetch("https://administadortareasapi.azurewebsites.net/api/Tarea/Guardar", {
            method: "POST",
            body: JSON.stringify({
                descripcion : descripcion,
                estado: opcionSeleccionadaEstado,
                prioridad: opcionSeleccionadaPrioridad,
                fechaInicio: fechaInicioSeleccionada,
                fechaFin: fechaFinSeleccionada,
                idColaborador: opcionSeleccionadaColaborador,
                nota: nota
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(respuesta => respuesta.json());
        alert("Formulario validado y se envio correctamente");
}

export default AgregarTarea;