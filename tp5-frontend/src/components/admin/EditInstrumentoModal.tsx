import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {Instrumento} from "../../interfaces/instrumento.ts";
import React, {useEffect, useState} from "react";

type Props  = {
    show: boolean;
    onHide: () => void;
    instrumento: Instrumento | null;
};

export const InstrumentoEditModal: React.FC<Props> = ({show, onHide, instrumento }) => {

    const [instrumentoActualizado, setInstrumentoActualizado] =  useState<Instrumento | null>(null)

    useEffect(() => {
        setInstrumentoActualizado(instrumento);
    }, [instrumento]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInstrumentoActualizado((prevState) => {
            if (!prevState) {
                return null;
            }
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSaveChanges = async () => {
        if (instrumentoActualizado) {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/v1/instrumentos/${instrumentoActualizado.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(instrumentoActualizado),
                    }
                );
                if (response.ok) {
                    onHide();
                } else {
                    throw new Error("Error al actualizar el instrumento");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (!instrumento) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Instrumento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                type="text"
                                value={instrumentoActualizado?.nombre || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                name="marca"
                                type="text"
                                value={instrumentoActualizado?.marca || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formModelo">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                name="modelo"
                                type="text"
                                value={instrumentoActualizado?.modelo || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImagen">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                name="imagen"
                                type="text"
                                value={instrumentoActualizado?.imagen || ''}
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
                                value={instrumentoActualizado?.precio || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCostoEnvio">
                            <Form.Label>Costo Envio</Form.Label>
                            <Form.Control
                                name="costoEnvio"
                                type="text"
                                value={instrumentoActualizado?.costoEnvio || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCantVendida">
                            <Form.Label>Cantidad Vendida</Form.Label>
                            <Form.Control
                                name="cantidadVendida"
                                type="number"
                                value={instrumentoActualizado?.cantidadVendida || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescrip">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                name="descripcion"
                                type="text"
                                value={instrumentoActualizado?.descripcion || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};