import {useEffect, useState} from "react";
import {Instrumento} from "../../interfaces/instrumento.ts";
import {CaretDownFill, CaretUpFill, PencilFill, Trash} from "react-bootstrap-icons";
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

    //Sort Table
    // inicializar el estado de ordenamiento sortState, la columna va a ser ID y su ordenamiento ASC (Como viene por defecto desde la BBDD)
    const [sortState, setSortState] = useState<{ column: string, direction: string }>({
        column: 'id',
        direction: 'asc'
    });

    //almacena el estado actual de las columnas de la tabla que pueden ser ordenadas, y su dirección de ordenación actual.
    const [sortableColumns, setSortableColumns] = useState<{ [key: string]: string }>({
        id: 'asc',
        nombre: 'asc',
        marca: 'asc',
        modelo: 'asc',
        imagen: 'asc',
        precio: 'asc',
        costoEnvio: 'asc',
        cantidadVendida: 'asc',
        descripcion: 'asc'
    });

    //Al hacer click en la col se encarga de cambiar la dirección a su contraparte si es "asc" cambia a "desc"
    const handleSort = (column: string) => {
        const newDirection = sortableColumns[column] === 'asc' ? 'desc' : 'asc';                            //Se consulta el estado de la direccion de la columna que si no es "asc" es "desc"
        const newSortableColumns = { ...sortableColumns, [column]: newDirection };                      //Se guarda el estado actual de la col al hacer click (Esto pasa en nanosegundos)
        setSortableColumns(newSortableColumns);                                                                         //Se actualiza el estado de la col con el paso anterior
        setSortState({ column, direction: newDirection });                                                        //Por ultimo hace el "set" y renderiza los cambios
    };

    //Este código crea una variable llamada sortedData que es una versión ordenada de la variable instrumentos,
    // utilizando la información del estado sortState que indica la columna y dirección en la que se debe realizar la ordenación.
    //La función de ordenación compara los valores de dos elementos a y b
    const sortedData = instrumentos.sort((a, b) => {
        //devuelve 0 si aun no se hizo click en ninguna col (nulo)
        if (sortState.column === null) {
            return 0;
        }
        const aValue = a[sortState.column];
        const bValue = b[sortState.column];
        //devuelve 0 si son iguales despues de comparar
        if (aValue === bValue) {
            return 0;
        }
        //devuelve 1 si la dirección es ascendente (asc) y -1 si la dirección es descendente (desc).
        return sortState.direction === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });

    //Se encarga de renderizar los iconos de la columna correspondiente, dependiendo del tipo de ordenamiento
    const renderSortIcon = (column: string) => {
        const icon = sortableColumns[column] === 'asc' ? <CaretUpFill /> : <CaretDownFill />;
        return sortState.column === column ? icon : <CaretUpFill />;
    };

    return(
        <>
            <Button onClick={() => handleClick("Nuevo Instrumento")}>
                Nuevo Instrumento
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID{renderSortIcon('id')}</th>
                    <th onClick={() => handleSort('nombre')}>Nombre{renderSortIcon('nombre')}</th>
                    <th onClick={() => handleSort('marca')}>Marca{renderSortIcon('marca')}</th>
                    <th onClick={() => handleSort('modelo')}>Modelo{renderSortIcon('modelo')}</th>
                    <th onClick={() => handleSort('imagen')}>Imagen{renderSortIcon('imagen')}</th>
                    <th onClick={() => handleSort('precio')}>Precio{renderSortIcon('precio')}</th>
                    <th onClick={() => handleSort('costoEnvio')}>Costo de Envio{renderSortIcon('costoEnvio')}</th>
                    <th onClick={() => handleSort('cantidadVendida')}>Cantidad Vendida{renderSortIcon('cantidadVendida')}</th>
                    <th onClick={() => handleSort('descripcion')}>Descripcion{renderSortIcon('descripcion')}</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map(ins => (
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