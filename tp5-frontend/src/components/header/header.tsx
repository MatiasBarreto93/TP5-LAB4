import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
export const Header = ({ onSearchTermChange }:any) =>{

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        onSearchTermChange(searchTerm);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/dondeestamos">Donde Estamos</Nav.Link>
                    <Nav.Link href="/admin">Administracion</Nav.Link>
                </Nav>
                <Form
                    className="d-flex w-50"
                    onSubmit={(e) => {
                        e.preventDefault(); // evitar que se recargue la página al hacer submit
                    }}
                >
                    <Form.Control
                        type="search"
                        placeholder="Buscar..."
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        variant="outline-success"
                        onClick={() => handleSearch(searchTerm)}
                    >
                        Buscar
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}