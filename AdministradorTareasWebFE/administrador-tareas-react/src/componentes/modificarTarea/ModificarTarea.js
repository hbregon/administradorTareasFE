function ModificarTarea() {
    const [informacionTarea, setInformacionTarea] = useState({
        idTarea: 0
    })

    const manejadorCambio = (evento) => {
        const {idTarea, valor} = evento.target;
        //setInformacionTarea({ ...})
    }

}

function obtenerTarea(id) {
    return new Promise((resuelta, rechazada) => {
            fetch("https://administadortareasapi.azurewebsites.net/api/Tarea/Lista")
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((tarea) => {
                resuelta(tarea.respuesta);
            })
            .catch((error) => rechazada(error))
        }, []);
}

export default ModificarTarea;