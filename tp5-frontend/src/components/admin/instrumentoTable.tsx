import React, { useEffect, useState } from 'react';
import {Container, Table} from 'react-bootstrap';
import {Instrumento} from "../../interfaces/instrumento.ts";
import {PencilFill, Trash} from "react-bootstrap-icons";
import {InstrumentoEditModal} from "./EditInstrumentoModal.tsx";

const MAX_CARACTERES_DESCRIPCION = 30;

export const InstrumentoTable: React.FC = () => {

    //Llenar la tabla
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/instrumentos')
            .then(response => response.json())
            .then(data => setInstrumentos(data));
    }, []);

    //Modal Edit
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (instrumento: Instrumento) => {
        setInstrumentoSeleccionado(instrumento);
        setShowModal(true);
    };

    return (
        <Container fluid className="mt-2 mb-2 mx-2 my-2">
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Costo de envío</th>
                <th>Cantidad vendida</th>
                <th>Descripción</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {instrumentos.map(instrumento => (
                <tr key={instrumento.id}>
                    <td>{instrumento.id}</td>
                    <td>{instrumento.nombre}</td>
                    <td>{instrumento.marca}</td>
                    <td>{instrumento.modelo}</td>
                    <td>{instrumento.imagen}</td>
                    <td>{instrumento.precio}</td>
                    <td>{instrumento.costoEnvio}</td>
                    <td>{instrumento.cantidadVendida}</td>
                    <td>{instrumento.descripcion.slice(0, MAX_CARACTERES_DESCRIPCION)}...</td>
                    <td><PencilFill color="#FBC02D" size={24} onClick={() => handleShowModal(instrumento)}/></td>
                    <td><Trash color="#D32F2F" size={24}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
            {instrumentoSeleccionado && (
                <InstrumentoEditModal
                    instrumento={instrumentoSeleccionado}
                    show={showModal}
                    onHide={handleCloseModal}
                />
            )}
        </Container>
    );
};