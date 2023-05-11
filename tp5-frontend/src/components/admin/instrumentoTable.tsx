import {useEffect, useState} from "react";
import {Instrumento} from "../../interfaces/instrumento.ts";
import {PencilFill, Trash} from "react-bootstrap-icons";
import {Button, Table} from "react-bootstrap";
import {InstrumentoModal} from "./InstrumentoModal.tsx";

export const InstrumentoTable = () => {

    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    //Limito la cantidad de caracteres que voy a mostrar del campo descripcion
    const MAX_CARACTERES_DESCRIPCION = 30;

    useEffect(() => {
        fetchInstrumentos();
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

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

    //Logica del Modal
    const handleClick = (newTitle: string, instrumento?: Instrumento) => {
        setTitle(newTitle);                                                                                             //Cambio el titulo del modal al hacer click en algunos de los botones
        setInstrumento(instrumento);                                                                                    //Paso el instrumento al modal si es que hay alguno seleccionado
        setShowModal(true);                                                                                       //Renderizo el modal unicamente y solo cuando el usuario haga click
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
                                    handleClick("Editar Instrumento", ins);                                     //Args: "title", "Intrumento"
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
                                    handleClick("¿Borrar Instrumento?", ins);                                   //Args: "title", "Intrumento"
                                }}
                                onMouseEnter={() => {document.body.style.cursor = 'pointer'}}
                                onMouseLeave={() => {document.body.style.cursor = 'default'}}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {/*Expresión condicional que se utiliza para renderizar el componente <InstrumentoModal/> en caso de que la variable showModal sea verdadera (o true).*/}
            {/*Entonces se renderiza unicamente cuando el usuario hace click en alguno de los 3 botones*/}
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