import React, { useEffect, useState }  from 'react';
import './AgregarTarea.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker"
import "semantic-ui-css/semantic.min.css";

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
                        <h5 class="modal-title" id="exampleModalLabel">Agregar tarea</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <Formik
                    initialValues={{ descripcion: "", colaborador: "Seleccione un colaborador", estado: "Seleccione un estado", prioridad: "Seleccione una prioridad", fechaInicio: new Date(), fechaFinal: new Date(), notas: ""}}
                    validate={valores => {
                        let errores = {};
                        if (valores.descripcion === "") {
                            errores.nombre = "Descripción es requerida";
                        }
                        if (valores.fechaInicio === "") {
                            errores.fechaInicio = "Fecha de Inicio es requerida";
                        }
                        if (valores.fechaFinal === "") {
                            errores.mensaje = "Fecha Final es requerida";
                        }
                        return errores;
                    }}
                    onSubmit={(valores, { setSubmitting }) => {
                        alert("Formulario validado y se envio correctamente");
                        valores.descripcion = "";
                        valores.colaborador = "Seleccione un colaborador";
                        valores.estado = "Seleccione un estado";
                        valores.prioridad = "Seleccione una prioridad";
                        valores.notas = "";
                        setSubmitting(false);
                    }}
                >
                    {(touched, errores, isSubmitting) => (
                        <Form>
                            {(
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
                                            className={`form-control ${touched.descripcion && errores.descripcion ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="colaborador">Colaborador: </label>
                                        <Select
                                        id="selectColaborador"
                                        placeholder='Seleccione un colaborador'
                                        options={listaColaboradores}
                                        onChange={(option) => setOpcionSeleccionadaColaborador(option.value)}
                                        />
                                        {/* <div>
                                            {touched.colaborador && errores.colaborador ? errores.colaborador : null}
                                        </div> */}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="estado">Estado: </label>
                                        <Select
                                            id="selectEstado"
                                            name="estado"
                                            options={listaEstados}
                                            placeholder="Seleccione un estado"
                                            onChange={(opcion) => setOpcionSeleccionadaEstado(opcion.value)}
                                        ></Select>
                                        <div>
                                            {touched.colaborador && errores.colaborador ? errores.colaborador : null}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="prioridad">Prioridad: </label>
                                        <Select
                                            id="selectPrioridad"
                                            name="prioridad"
                                            options={listaPrioridades}
                                            placeholder="Seleccione una prioridad"
                                            onChange={(opcion) => setOpcionSeleccionadaPrioridad(opcion.value)}
                                        ></Select>
                                        <div>
                                            {touched.colaborador && errores.colaborador ? errores.colaborador : null}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nota">Fecha Inicio</label>
                                        <DatePicker
                                        selected={fechaInicioSeleccionada}
                                        onChange={(fechaInicioSeleccionada) => setFechaInicioSeleccionada(fechaInicioSeleccionada)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nota">Fecha Fin</label>
                                        <DatePicker
                                        selected={fechaFinSeleccionada}
                                        onChange={(fechaFinSeleccionada) => setFechaFinSeleccionada(fechaFinSeleccionada)}
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
                                            className={`form-control ${touched.descripcion && errores.descripcion ? "is-invalid" : ""
                                                }`}
                                        />
                                    </div>

                                    <button type="submit" disabled={isSubmitting}>
                                        SENT
                                    </button>
                                    <br />
                                </div>
                            )}

                        </Form>
                    )}
                    </Formik>
                       
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Guardar</button>
                        </div>
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

export default AgregarTarea;