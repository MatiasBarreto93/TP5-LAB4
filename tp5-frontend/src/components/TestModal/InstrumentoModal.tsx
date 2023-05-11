import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Instrumento} from "../../interfaces/instrumento.ts";
import React, { useState} from "react";

interface Props {
    show: boolean;
    onHide: () => void;
    title:string
    ins: Instrumento;
    fetchInstrumentos: () => void;
}
export const InstrumentoModal = ({ show, onHide, title, ins, fetchInstrumentos }: Props)=>{
    //console.log("Log en InstrumentoModal" + ins)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInstrumento((prevState) => prevState ? {
            ...prevState,
            [name]: value,
        } : undefined);
    };

    const handleSaveUpdate= () =>{
        const isNew = !instrumento.id; // Si no hay ID, entonces es una creación
        const url = isNew ? 'http://localhost:8080/api/v1/instrumentos' : `http://localhost:8080/api/v1/instrumentos/${instrumento.id}`;

        fetch(url, {
            method: isNew ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instrumento)
        })
            .then(response => {
                if (response.ok) {
                    onHide(); // Cerrar el modal si la solicitud fue exitosa
                    fetchInstrumentos(); //Actualizar la tabla
                    //Agregar un modal para informar al usuario de la CREACION / EDICION Props => title y String (nombre objeto)
                    //todo
                } else {
                    throw new Error('Ha ocurrido un error'); // Mostrar mensaje de error si la solicitud falló
                }
            })
            .catch(error => {
                console.log(error);
                // Mostrar mensaje de error al usuario
            });
    }

    const borrarInstrumento = () => {
        if (instrumento) {
            const id = instrumento.id;
            fetch(`http://localhost:8080/api/v1/instrumentos/${id}`, {
                method: "DELETE"}
            )
                .then(() => {
                    onHide();
                    fetchInstrumentos();
                })
                .catch(error => console.error(error));
        }
    };

    //Validacion de TITULOS permitidos
    const validTitles = ["Nuevo Instrumento", "Editar Instrumento", "¿Borrar Instrumento?"];

    if (!validTitles.includes(title)) {
        return <div>Error</div>;
    }

    return (
        <>
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
                            <Row>
                                <Col>
                                    <Form.Group controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            name="nombre"
                                            type="text"
                                            value={instrumento?.nombre || ''}
                                            onChange={handleChange}
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