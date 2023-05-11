import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";

interface Props {
    searchTerm?: string;
    onSearchTermChange?: (searchTerm: string) => void;
}

export const Header = ({ searchTerm, onSearchTermChange }: Props) =>{

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Hendrix</Navbar.Brand>
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
                        onChange={(e) => onSearchTermChange?.(e.target.value)}
                    />
                    <Button variant="outline-success">
                        Buscar
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}