import {useEffect, useState} from "react";
import {Instrumento} from "../../interfaces/instrumento.ts";
import {PencilFill, Trash} from "react-bootstrap-icons";
import {Button, Table} from "react-bootstrap";
import {InstrumentoModal} from "./InstrumentoModal.tsx";


export const RandomTable = () => {

    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const MAX_CARACTERES_DESCRIPCION = 30;

    useEffect(() => {
        fetchInstrumentos();
    }, []);

    const fetchInstrumentos = () => {
        fetch('http://localhost:8080/api/v1/instrumentos')
            .then(response => response.json())
            .then(data => setInstrumentos(data))
            .catch(error => console.error(error));
    };

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

    //Render de Componente hasta que el usuario haga click
    const handleClick = (newTitle: string, instrumento?: Instrumento) => {
        setTitle(newTitle);
        //console.log( "Instrumento en handleClick: " + instrumento)
        setInstrumento(instrumento);
        setShowModal(true);
    };

    return(
        <>
            <Button onClick={() => handleClick("Nuevo Instrumento")}>
                Nuevo Instrumento
            </Button>
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
                {instrumentos.map(ins => (
                    <tr key={ins.id}>
                        <td>{ins.id}</td>
                        <td>{ins.nombre}</td>
                        <td>{ins.marca}</td>
                        <td>{ins.modelo}</td>
                        <td>{ins.imagen}</td>
                        <td>{ins.precio}</td>
                        <td>{ins.costoEnvio}</td>
                        <td>{ins.cantidadVendida}</td>
                        <td>{ins.descripcion.slice(0, MAX_CARACTERES_DESCRIPCION)}...</td>
                        <td>
                            <PencilFill
                                color="#FBC02D"
                                size={24}
                                onClick={() => {
                                    //console.log("Instrumento de la fila: " + ins);
                                    handleClick("Editar Instrumento", ins);
                                }}
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
                                onClick={() => {
                                    handleClick("¿Borrar Instrumento?", ins);
                                }}
                                onMouseEnter={() => {document.body.style.cursor = 'pointer'}}
                                onMouseLeave={() => {document.body.style.cursor = 'default'}}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {showModal && (
                <InstrumentoModal
                    ins={instrumento}
                    title={title}
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    fetchInstrumentos={fetchInstrumentos}
                />
            )}
        </>
    )
}