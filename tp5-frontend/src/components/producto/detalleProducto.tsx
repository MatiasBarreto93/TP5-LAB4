import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Card, Button, Container} from "react-bootstrap";
import { Instrumento } from "../../interfaces/instrumento";

export const DetalleProducto = () => {
    const [instrumento, setInstrumento] = useState<Instrumento>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const obtenerInstrumento = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/instrumentos/${id}`);
                const data = await response.json();
                setInstrumento(data);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerInstrumento();
    }, [id]);

    return (
            <Container fluid>
                {instrumento ? (
                    <Card key={instrumento.id} className="mb-3 mt-3 p-2 m-2">
                        <div className="d-flex mb-3 mt-3 mx-2">
                            <div className="d-grid mx-2 mt-2 mb-2" style={{ maxWidth: '500px'}}>
                                <Card.Img src={`http://localhost:8080/static/img/${instrumento.imagen}`} className="justify-content-center mr-3 w-100 h-100" style={{ maxWidth: '500px', maxHeight: '500px' }}/>
                                <Card.Text>Descripcion: <br/> {instrumento.descripcion}</Card.Text>
                            </div>
                            <Card.Body className="p-3 mx-2 mt-2 mb-2" style={{ borderLeft: '2px solid gray' }}>
                                <Button variant="primary" className="mb-3 mt-2" onClick={() => window.history.back()}>Volver</Button>
                                <Card.Text>Cantidad Vendida: {instrumento.cantidadVendida}</Card.Text>
                                <Card.Title className="display-5">{instrumento.nombre}</Card.Title>
                                <Card.Text className="display-6">${instrumento.precio}</Card.Text>
                                <Card.Text>Marca: {instrumento.marca}</Card.Text>
                                <Card.Text>Modelo: {instrumento.modelo}</Card.Text>

                                <Card.Text> Costo de Envio: <br/>
                                    <span style={{ color: instrumento.costoEnvio === 'G' ? 'green' : 'orange' }}>
                                  {instrumento.costoEnvio === 'G' ? (
                                      <>
                                          <img src={`http://localhost:8080/static/img/camion.png`} style={{ width: '20px', marginRight: '5px' }} alt={"0"} />
                                          Envio Gratis a todo el pais
                                      </>
                                  ) : (`Costo de Envio Interior de Argentina $${instrumento.costoEnvio}`)
                                  }
                                </span>
                                </Card.Text>
                                <br/>
                                <Button variant="outline-primary" className="mb-3 mt-2" onClick={() => window.history.back()}>Agregar al Carrito</Button>
                            </Card.Body>
                        </div>
                    </Card>
                ) : (
                    <p>El Producto no existe</p>
                )}
            </Container>
    );
};