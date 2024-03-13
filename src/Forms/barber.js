import React from 'react';
import axios from "axios";

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const listUrl = "http://localhost:7443/barber/list"
const createUrl = "http://localhost:7443/barber/created"

class Barber extends React.Component {

  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: 0,
      name: "",
      status: true
    }
  }

  componentDidMount() {
    axios.get(listUrl)
      .then(res => {
          const barbers = res.data
          this.setState({ data: barbers })
      })
  }

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true, });
  };

  insertar = () => {
    let valorNuevo = {...this.state.form};
    const request = {
      name: valorNuevo.name
    }

    this.setState({
      modalInsertar: false
    })

    axios.post(createUrl, request, {
      'Content-Type': 'application/json'
    })
      .then(res => {
        const response = res.data
        if (response.successful) {
          console.log(response.message)
          this.componentDidMount()
        } else {
          console.error(response.message)
        }
      })
  }

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false, })
  };

  processStatus = (status) => {
    if (status) {
      return 'Activo'
    } else {
      return 'Inactivo'
    }
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color='success' onClick={() => this.mostrarModalInsertar()}>Nuevo Barbero</Button>
          <br /><br />

          <Table>
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Edición</th>
            </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                  <tr>
                    <td>{elemento.name}</td>
                    <td>{this.processStatus(elemento.status)}</td>
                    <td>
                      <Button color='primary' onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>{" "}
                    </td>
                    {" "}
                  </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal para insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo Barbero</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal para actualizar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              //value={this.state.form.libro}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal para eliminar */}
        <Modal isOpen={this.state.modalEliminar}>
          <ModalHeader>
            <div><h3>Eliminar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.libro}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.eliminar(this.state.form)}
            >
              Si
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalEliminar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Barber;
