import React, { useState } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {Instrumento} from "../../interfaces/instrumento.ts";

type InstrumentoCreateModalProps = {
    show: boolean;
    onHide: () => void;
};

export const InstrumentoCreateModal: React.FC<InstrumentoCreateModalProps> = ({show, onHide,}) => {

    const [instrumento, setInstrumento] = useState<Instrumento>({
        id: 0,
        nombre: '',
        marca: '',
        modelo: '',
        imagen: '',
        precio: 0,
        costoEnvio: '',
        cantidadVendida: 0,
        descripcion: ''
    });

    const handleCreateInstrumento = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/instrumentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(instrumento),
            });
            if (response.ok) {
                // Si la petición fue exitosa, cerramos el Modal y reseteamos los campos
                onHide();
                setInstrumento({
                    id: 0,
                    nombre: '',
                    marca: '',
                    modelo: '',
                    imagen: '',
                    precio: 0,
                    costoEnvio: '',
                    cantidadVendida: 0,
                    descripcion: ''
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo instrumento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del instrumento"
                                    value={instrumento.nombre}
                                    onChange={(e) => setInstrumento({...instrumento, nombre: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formMarca">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Marca del instrumento"
                                    value={instrumento.marca}
                                    onChange={(e) => setInstrumento({...instrumento, marca: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formModelo">
                                <Form.Label>Modelo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Modelo del instrumento"
                                    value={instrumento.modelo}
                                    onChange={(e) => setInstrumento({...instrumento, modelo: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formImagen">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Imagen del instrumento"
                                    value={instrumento.imagen}
                                    onChange={(e) => setInstrumento({...instrumento, imagen: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPrecio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Precio del instrumento"
                                    value={instrumento.precio}
                                    onChange={(e) => setInstrumento({...instrumento, precio: parseFloat(e.target.value)})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCostoEnvio">
                                <Form.Label>Costo Envio</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Costo Envio"
                                    value={instrumento.costoEnvio}
                                    onChange={(e) => setInstrumento({...instrumento, costoEnvio: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCantVendida">
                                <Form.Label>Cantidad Vendida</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Cantidad Vendida"
                                    value={instrumento.cantidadVendida}
                                    onChange={(e) => setInstrumento({...instrumento, cantidadVendida: parseFloat(e.target.value)})}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescrip">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Descripcion"
                                    value={instrumento.descripcion}
                                    onChange={(e) => setInstrumento({...instrumento, descripcion: e.target.value})}
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
                <Button variant="primary" onClick={handleCreateInstrumento}>
                    Crear
                </Button>
            </Modal.Footer>
        </Modal>
    );
};