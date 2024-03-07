import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Barberia</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Barberos">Barberos</Nav.Link>
            <Nav.Link href="/Clientes">Clientes</Nav.Link>
            <Nav.Link href="/Servicios">Servicios</Nav.Link>
            <Nav.Link href="/Citas">Citas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;