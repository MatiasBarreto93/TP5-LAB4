import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import React, {useState} from "react";


interface Props {
    searchTerm: string;
    onSearchTermChange: (searchTerm: string) => void;
}

export const Header = ({ searchTerm = "", onSearchTermChange }: Props) =>{

    const [, setSearchTerm] = useState("");

    const handleSearch = (searchTerm: string) => {

        onSearchTermChange(searchTerm);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
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
                    <Nav.Link href="/administracion">Administracion</Nav.Link>
                </Nav>
                <Form
                    className="d-flex w-50"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Form.Control
                        type="search"
                        placeholder="Buscar..."
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <Button variant="outline-success" onClick={() => handleSearch(searchTerm)}>
                        Buscar
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}