import {Container, Nav, Navbar} from "react-bootstrap";


export const Header = () =>{
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/dondeestamos">Donde Estamos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}