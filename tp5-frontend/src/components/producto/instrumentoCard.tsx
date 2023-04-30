import {Instrumento} from "../../interfaces/instrumento.ts";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


interface InstrumentoProps {
    instrumento: Instrumento;
}

export const InstrumentoCard = ({ instrumento }: InstrumentoProps) => {
    return (
        <Card key={instrumento.id} className="mb-3 mt-3 p-2 m-2">
                <div className="d-flex">
                    <Card.Img src={`http://localhost:8080/static/img/${instrumento.imagen}`} className="align-self-start mr-3" style={{ width: '200px', height: '200px' }}/>
                    <Card.Body>
                        <Card.Title>{instrumento.nombre}</Card.Title>
                        <Card.Text>${instrumento.precio}</Card.Text>
                        <Card.Text>
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
                        <Card.Text>Cantidad Vendida: {instrumento.cantidadVendida}</Card.Text>
                        <Link to={`/productos/${instrumento.id}`}>
                            <Button variant="primary">Ver Detalles</Button>
                        </Link>
                    </Card.Body>
                </div>
        </Card>
    );
};