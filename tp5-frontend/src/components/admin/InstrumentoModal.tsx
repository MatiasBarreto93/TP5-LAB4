import { Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Instrumento} from "../../interfaces/instrumento.ts";
import React, { useState} from "react";
import {toast} from "react-toastify";

interface Props {
    show: boolean;
    onHide: () => void;
    title:string
    ins: Instrumento;
    fetchInstrumentos: () => void;
}
export const InstrumentoModal = ({ show, onHide, title, ins, fetchInstrumentos }: Props)=>{

    //Si se proporciona un valor inicial a través de la variable "ins", se utiliza ese valor. De lo contrario, se utiliza un objeto con campos vacíos
    //Este se utiliza para la creacion de un nuevo Instrumento
    const [instrumento, setInstrumento] = useState<Instrumento | undefined>(ins ? ins : {
        id: 0,
        nombre: "",
        marca: "",
        modelo: "",
        imagen: "",
        precio: 0,
        costoEnvio: "",
        cantidadVendida: 0,
        descripcion: "",
    });

    //En vez de hacer el set por cada atributo de la interface Ej:
    // const [nombre, setNombre] = useState<string | undefined>(ins?.nombre || '');
    // const [marca, setMarca] = useState<string | undefined>(ins?.nombre || '');
    // Y crear la siguiente funcion por cada uno de los atributos para manejar su estado
    /*
     *   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     *   const { value } = event.target;
     *  setNombre(value);};
     *
     * */
    //Se utiliza esta forma para evitar tanta redundancia
    //Actualiza de forma automatica los valores recibidos del objeto "ins" y los almacenados en el formulario.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                                            //Observa un evento en el HTMLInput del formulario
        const { name, value } = e.target;                                                                 //Del input ("target"), se extrae el "name" y "value"
        setInstrumento((prevState) => prevState ? {                            //Actualiza el estado "set"
            ...prevState,                                                                                               // crear una copia del estado anterior
            [name]: value,                                                                                              // se actualiza el valor de la propiedad cuyo nombre coincide con el valor de la variable "name"
        } : undefined);                                                                                                 // maneja el caso en el que el estado anterior sea undefined (crear un nuevo instrumento)
    };

    //Crear o actualizar un instrumento dependiendo del props "title" que recibe desde el componente padre "InstrumentoTable"
    const handleSaveUpdate = async () => {
        const isNew = !instrumento.id; //Si no hay id es un nuevo instrumento y se selecciona la URL
        const url = isNew
            ? "http://localhost:8080/api/v1/instrumentos"
            : `http://localhost:8080/api/v1/instrumentos/${instrumento.id}`;

        try {
            const response = await fetch(url, {
                method: isNew ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(instrumento),
            });

            //Si la transaccion es correcta
            if (response.ok) {
                onHide();                                                                                               //Se cierra el modal
                await fetchInstrumentos();                                                                              // Esperar a que se complete la actualización de la tabla si es exitoso
                toast.success(isNew ? "Instrumento Creado" : "Instrumento Actualizado", {                //Notificacion exito
                    position: "top-center",
                });
            } else {
                toast.error("Ah ocurrido un error", {                                                    //Notificacion error
                    position: "top-center",
                });
            }
        } catch (error) {
            console.log(error);
            // Mostrar mensaje de error al usuario
        }
    };

    const borrarInstrumento = async () => {
        if (instrumento) {
            const id = instrumento.id;
            try {
                await fetch(`http://localhost:8080/api/v1/instrumentos/${id}`, {
                    method: "DELETE",
                });
                onHide();
                await fetchInstrumentos(); // Esperar a que se complete la actualización de la tabla
                toast.success("Instrumento Borrado", {
                    position: "top-center",
                });
            } catch (error) {
                toast.error("Ah ocurrido un error", {                                                    //Notificacion error
                    position: "top-center",
                });
            }
        }
    };

    //Validacion de TITULOS permitidos
    const validTitles = ["Nuevo Instrumento", "Editar Instrumento", "¿Borrar Instrumento?"];
    if (!validTitles.includes(title)) {
        return (
            toast.error("Error!, la funcion requerida no existe", {
                position: "top-center"
            }))
    }

    return (
        <>
            {/*Si el Props "title" contiene la palabra borrar, se renderiza el modal de delete, sino el de crear/editar*/}
            {title.toLowerCase().includes("borrar")
                ?
                <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>¿Borrar instrumento?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Está seguro que desea eliminar el instrumento<br/> <strong>{instrumento?.nombre}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={borrarInstrumento}>
                        Eliminar
                    </Button>
                </Modal.Footer>
                </Modal>
                :
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/*1 FILA y 2 COLUMNAS , para que el formulario no sea tan vertical*/}
                            <Row>
                                <Col>
                                    <Form.Group controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            name="nombre"                                                               //Tiene que estar para poder editar hace que cada input sea unico
                                            type="text"
                                            value={instrumento?.nombre || ''}                                           //Si es crear el campo esta vacio
                                            onChange={handleChange}                                                     //Permite el cambio y que se guarden los estados
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formMarca">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control
                                            name="marca"
                                            type="text"
                                            value={instrumento?.marca || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formModelo">
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control
                                            name="modelo"
                                            type="text"
                                            value={instrumento?.modelo || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formImagen">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control
                                            name="imagen"
                                            type="text"
                                            value={instrumento?.imagen || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formPrecio">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control
                                            name="precio"
                                            type="number"
                                            value={instrumento?.precio || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formCostoEnvio">
                                        <Form.Label>Costo Envio</Form.Label>
                                        <Form.Control
                                            name="costoEnvio"
                                            type="text"
                                            value={instrumento?.costoEnvio || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formCantVendida">
                                        <Form.Label>Cantidad Vendida</Form.Label>
                                        <Form.Control
                                            name="cantidadVendida"
                                            type="number"
                                            value={instrumento?.cantidadVendida || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDescrip">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control
                                            name="descripcion"
                                            type="text"
                                            value={instrumento?.descripcion || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleSaveUpdate}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
                }
        </>
    )
}