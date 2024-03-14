import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from "axios";
import { useParams } from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

const updateUrl = "http://localhost:7443/appointment/update"

class ServicesAppointmetUpdate extends React.Component {

  state = {
    dataServices: [],
    dataBarber: [],
    dataCustomer: [],
    selectedServices: [],
    selectedServicesId: 0,
    modalActualizar: false,
    modalAgregar: false,
    form: {
      id: 0,
      status: true,
      day: "",
      hourStart: "",
      hourEnd: "",
      customerId: 0,
      barberId: 0
    }
  };

  componentDidMount() {
    const id = window.location.href.split('/')[6]
    const searchAppointment = `http://localhost:7443/appointment/find/${id}`

    axios.get(searchAppointment)
      .then(res => {
        console.log(res.data)
        const appointment = res.data.appointment
        const services = res.data.services
        const barbers = res.data.barbers
        const customers = res.data.customers
        const selectedServices = res.data.serviceList
        this.setState({ dataServices: services, dataBarber: barbers, dataCustomer: customers,
          form: {
            id: appointment.id,
            status: appointment.status,
            day: appointment.day,
            hourStart: appointment.hourStart,
            hourEnd: appointment.hourEnd,
            customerId: appointment.customerId,
            barberId: appointment.barberId
          },
          selectedServices: selectedServices
        })
      })
      .catch(error => {
        // Manejar errores si alguna de las solicitudes falla
        console.error('Error al realizar solicitudes GET:', error);
      });
  }

  editar = () => {
    let valorNuevo = {...this.state.form};
    const request = {
      id: valorNuevo.id,
      status: valorNuevo.status,
      day: valorNuevo.day,
      hourStart: valorNuevo.hourStart,
      hourEnd: valorNuevo.hourEnd,
      customerId: valorNuevo.customerId,
      barberId: valorNuevo.barberId
    }

    this.setState({
      modalActualizar: false
    })

    axios.put(updateUrl, request, {
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

  handleServiceChange = (e) => {
    this.setState({
      selectedServicesId: e.target.value
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

  render() {
    return (
      <>
        <Container>
          <h1>Editar Cita</h1>
          <br />
          <label>
            Fecha:
          </label>
          <input
            className="form-control"
            name="day"
            type="date"
            value={this.state.form.day}
            onChange={this.handleChange}
          />
          <br />
          <label>
            Hora de inicio:
          </label>
          <input
            className="form-control"
            name="hourStart"
            type="time"
            value={this.state.form.hourStart}
            onChange={this.handleChange}
          />
          <br />
          <label>
            Hora de finalización:
          </label>
          <input
            className="form-control"
            name="hourEnd"
            type="time"
            value={this.state.form.hourEnd}
            onChange={this.handleChange}
          />
          <br />
          <label>
            Cliente:
          </label>
          <select className="form-control"
            name="customerId"
            onChange={this.handleChange}>
            <option value="0">Seleccione un cliente</option>
            {this.state.dataCustomer.map((customer) => (
              <option value={customer.id}> {customer.label} </option>
            ))}
          </select>
          <br />
          <label>
            Barbero:
          </label>
          <select className="form-control"
            name="barberId"
            onChange={this.handleChange}>
            <option value="0">Seleccione un barbero</option>
            {this.state.dataBarber.map((barber) => (
              <option value={barber.id}> {barber.label} </option>
            ))}
          </select>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Servicios</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectedServices.map((elemento) => (
                <tr>
                  <td>{elemento.serviceName}</td>
                  {" "}
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Button
            color="primary" href="/Citas"
            onClick={() => this.editar()}
          >
            Actualizar Cita
          </Button>
          <Button
            className="btn btn-danger"
            href="/Citas"
          >
            Cancelar
          </Button>
        </Container>

      </>
    );
  }
}

export default ServicesAppointmetUpdate;
