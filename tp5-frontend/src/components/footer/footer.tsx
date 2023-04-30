import {Col, Container, Row} from "react-bootstrap";
import {Phone, GeoAlt, Envelope, Facebook} from "react-bootstrap-icons";

export const Footer = () =>{
    return(
        <Container fluid className="text-center mt-2 mb-2 text-white bg-dark p-5">
            Informacion de contacto
            <div className="text-center">
            <Row>
                <Col className="equal-width mt-2 mb-2"><Phone/> +54 9 261 155155155</Col>
                <Col className="equal-width mt-2 mb-2"><GeoAlt/> Av. Las Heras y Av. San Martin, Ciudad de Mendoza</Col>
            </Row>
            <Row>
                <Col className="equal-width mt-2 mb-2"><Envelope/>musical_hendrix@gmail.com</Col>
                <Col className="equal-width mt-2 mb-2"><Facebook/>Musical-Hendrix</Col>
            </Row>
            </div>
        </Container>
    )
}