import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const listUrl = "http://localhost:7443/appointment/list"
const createUrl = "http://localhost:7443/appointment/created"

class Appointment extends React.Component {

  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
  };

  componentDidMount() {
    axios.get(listUrl)
        .then(res => {
          const services = res.data
          this.setState({ data: services })
        })
  }
  
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  processStatus = (status) => {
    if (status) {
      return 'Activo'
    } else {
      return 'Inactivo'
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          {/*<Button color='success' onClick={() => this.mostrarModalInsertar()}>Agendar Cita</Button>*/}
          <Button color='success'><Nav.Link href="/Servicios/Citas">Agendar Cita</Nav.Link></Button>

          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora agendada</th>
                <th>Hora de finalización</th>
                <th>Cliente</th>
                <th>Barbero</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.day}</td>
                  <td>{elemento.hourStart}</td>
                  <td>{elemento.hourEnd}</td>
                  <td>{elemento.customerName}</td>
                  <td>{elemento.barberName}</td>
                  <td>{this.processStatus(elemento.status)}</td>
                  <td>
                    <Button color='primary' href={'/Servicios/Citas/Actualizar/' + elemento.id}>Editar</Button>{" "}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default Appointment;
