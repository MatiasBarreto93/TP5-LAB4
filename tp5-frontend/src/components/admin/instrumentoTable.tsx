import React, { useEffect, useState } from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import {Instrumento} from "../../interfaces/instrumento.ts";
import {PencilFill, Trash} from "react-bootstrap-icons";
import {InstrumentoEditModal} from "./EditInstrumentoModal.tsx";
import {InstrumentoCreateModal} from "./createInstrumentoModal.tsx";

const MAX_CARACTERES_DESCRIPCION = 30;

export const InstrumentoTable: React.FC = () => {

    //Llenar la tabla
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/instrumentos')
            .then(response => response.json())
            .then(data => setInstrumentos(data));
    }, []);

    const fetchInstrumentos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/instrumentos');
            const data = await response.json();
            setInstrumentos(data);
        } catch (error) {
            console.error(error);
        }
    };

    //Modal Create
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateInstrumento = () => {
        setShowCreateModal(true);
    };

    //Modal Edit
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowModal = (instrumento: Instrumento) => {
        setInstrumentoSeleccionado(instrumento);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        fetchInstrumentos();
    };

    const handleDeleteInstrumento = async (instrumentoId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/instrumentos/${instrumentoId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchInstrumentos();
            } else {
                throw new Error(`Error eliminando instrumento con ID ${instrumentoId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container fluid className="mt-2 mb-2 mx-2 my-2">
            <Button onClick={handleCreateInstrumento} className="mt-2 mb-2 mx-2 my-2">Crear instrumento</Button>
            <InstrumentoCreateModal show={showCreateModal} onHide={handleCloseModal} />
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
                    <td>
                        <PencilFill
                        color="#FBC02D"
                        size={24}
                        onClick={() => handleShowModal(instrumento)}
                        title="Editar instrumento"
                        onMouseEnter={() => {document.body.style.cursor = 'pointer'}}
                        onMouseLeave={() => {document.body.style.cursor = 'default'}}
                        />
                    </td>
                    <td>
                        <Trash
                        color="#D32F2F"
                        size={24}
                        title="Borrar instrumento"
                        onClick={() => handleDeleteInstrumento(instrumento.id)}
                        onMouseEnter={() => {document.body.style.cursor = 'pointer'}}
                        onMouseLeave={() => {document.body.style.cursor = 'default'}}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
            {instrumentoSeleccionado && (
                <InstrumentoEditModal
                    instrumento={instrumentoSeleccionado}
                    show={showEditModal}
                    onHide={handleCloseModal}
                />
            )}
        </Container>
    );
};