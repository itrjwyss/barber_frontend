import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from "axios";

const listUrl = "http://localhost:7443/appointment/list"
const listUrl2 = "http://localhost:7443/barber/list"
const listUrl3 = "http://localhost:7443/customer/list"
const createUrl = "http://localhost:7443/appointment/created"

class Appointment extends React.Component {

  state = {
    data: [],
    dataBarber: [],
    dataCustomer: [],
    modalActualizar: false,
    modalInsertar: false,
  };

  getCustomerName(customerId) {
    const customer = this.state.dataCustomer.find(customer => customer.id === customerId);
    return customer ? customer.name : "Cliente no encontrado";
  }
  
  getBarberName(barberId) {
    const barber = this.state.dataBarber.find(barber => barber.id === barberId);
    return barber ? barber.name : "Barbero no encontrado";
  }

  componentDidMount() {
    axios.get(listUrl)
      .then(res => {
        // Manejar la primera respuesta
        const data = res.data;
  
        // Realizar la segunda solicitud GET
        return axios.get(listUrl2)
          .then(res2 => {
            // Manejar la segunda respuesta
            const dataBarber = res2.data;
  
            // Realizar la tercera solicitud GET
            return axios.get(listUrl3)
              .then(res3 => {
                // Manejar la tercera respuesta
                const dataCustomer = res3.data;
  
                // Actualizar el estado con los datos recibidos
                this.setState({ data, dataBarber, dataCustomer });
              });
          });
      })
      .catch(error => {
        // Manejar errores si alguna de las solicitudes falla
        console.error('Error al realizar solicitudes GET:', error);
      });
  }

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true, });
  };

  insertar = () => {
    let valorNuevo = {...this.state.form};
    const request = {
      day: valorNuevo.day,
      hourStart: valorNuevo.hourStart,
      hourEnd: valorNuevo.hourEnd,
      customerId: valorNuevo.customerId,
      barberId: valorNuevo.barberId
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
          <Button color='success' onClick={() => this.mostrarModalInsertar()}>Agendar Cita</Button>
          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora agendada</th>
                <th>Hora de finalización</th>
                <th>Cliente</th>
                <th>Barbero</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.day}</td>
                  <td>{elemento.hourStart}</td>
                  <td>{elemento.hourEnd}</td>
                  <td>{this.getCustomerName(elemento.customerId)}</td>
                  <td>{this.getBarberName(elemento.barberId)}</td>
                  <td>
                    <Button color='primary' onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>{" "}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal para insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Agendar Cita</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Fecha:
              </label>
              <input
                className="form-control"
                name="day"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Hora de inicio:
              </label>
              <input
                className="form-control"
                name="hourStart"
                type="time"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Hora de finalización:
              </label>
              <input
                className="form-control"
                name="hourEnd"
                type="time"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cliente:
              </label>
              <select className="form-control"
                name="customerId"
                onChange={this.handleChange}>
                {this.state.dataCustomer.map((customer) => (
                <option value={customer.id}> {customer.name} </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <label>
                Barbero:
              </label>
              <select className="form-control"
                name="barberId"
                onChange={this.handleChange}>
                {this.state.dataBarber.map((barber) => (
                <option value={barber.id}> {barber.name} </option>
                ))}
              </select>
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
                Fecha:
              </label>
              <input
                className="form-control"
                name="day"
                type="date"
                onChange={this.handleChange}
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Hora:
              </label>
              <input
                className="form-control"
                name="hour_start"
                type="time"
                onChange={this.handleChange}
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cliente:
              </label>
              <select className="form-control"
                name="customer_id"
                onChange={this.handleChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>
                Barbero:
              </label>
              <select className="form-control"
                name="barber_id"
                onChange={this.handleChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
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
                Fecha:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Hora:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cliente:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Barbero:
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

export default Appointment;
