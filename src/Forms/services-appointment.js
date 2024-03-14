import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from "axios";

const listUrl = "http://localhost:7443/appointment/data"
const createUrl = "http://localhost:7443/appointment/created"

class ServicesAppointmet extends React.Component {

  state = {
    dataServices: [],
    dataBarber: [],
    dataCustomer: [],
    selectedServices: [],
    selectedServicesId: 0,
    modalActualizar: false,
    modalAgregar: false,
  };

  componentDidMount() {
    axios.get(listUrl)
      .then(res => {
        const services = res.data.services
        const barbers = res.data.barbers
        const customers = res.data.customers
        this.setState({ dataServices: services, dataBarber: barbers, dataCustomer: customers })
      })
      .catch(error => {
        // Manejar errores si alguna de las solicitudes falla
        console.error('Error al realizar solicitudes GET:', error);
      });
  }

  insertar = () => {
    let valorNuevo = { ...this.state.form };
    var servicesIdList = []
    this.state.selectedServices.map((service) => {
      servicesIdList.push(service.id)
    })
    const request = {
      day: valorNuevo.day,
      hourStart: valorNuevo.hourStart,
      hourEnd: valorNuevo.hourEnd,
      customerId: valorNuevo.customerId,
      barberId: valorNuevo.barberId,
      serviceIdList: servicesIdList
    }

    console.log(request)

    this.setState({
      modalAgregar: false
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

  mostrarModalAgregar = () => {
    this.setState({ modalAgregar: true, });
  };

  agregar = () => {
    var contador = 0;
    var arreglo = this.state.dataServices;
    var otroArreglo = this.state.selectedServices;
    var id = this.state.selectedServicesId;
    arreglo.map((registro) => {
      if (Number(id) === registro.id) {
        var service = arreglo.splice(contador, 1);
        otroArreglo.push(service[0]);
      }
      contador++;
    });

    this.setState({
      modalAgregar: false,
      dataServices: arreglo,
      selectedServices: otroArreglo
    })

  }

  cerrarModalAgregar = () => {
    this.setState({ modalAgregar: false, })
  };

  eliminar = () => {
    var contador = 0;
    var arreglo = this.state.dataServices;
    var otroArreglo = this.state.selectedServices;
    var id = this.state.selectedServicesId;
    otroArreglo.map((registro) => {
      if (Number(id) === registro.id) {
        var service = otroArreglo.splice(contador, 1);
        arreglo.push(service[0]);
      }
      contador++;
    });
  
    this.setState({
      modalAgregar: false,
      dataServices: arreglo,
      selectedServices: otroArreglo
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
          <h1>Servicios por Cita</h1>
          <br />
          <label>
            Fecha:
          </label>
          <input
            className="form-control"
            name="day"
            type="date"
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
          <Button
            color="secondary"
            onClick={() => this.mostrarModalAgregar()}
          >
            Agregar servicio
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectedServices.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.label}</td>
                  <td>
                  <Button color='primary' onClick={() => this.eliminar(elemento)}>Eliminar</Button>{" "}
                  </td>
                  {" "}
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <Button
            color="primary" href="/Citas"
            onClick={() => this.insertar()}
          >
            Agendar Cita
          </Button>
          <Button
            className="btn btn-danger"
            href="/Citas"
          >
            Cancelar
          </Button>
        </Container>

        {/* Modal para agregar servicios */}
        <Modal isOpen={this.state.modalAgregar}>
          <ModalHeader>
            <div><h3>Agregar servicio</h3></div>
          </ModalHeader>

          <ModalBody>
            <label>
              Servicios:
            </label>
            <select className="form-control"
              name="serviceId"
              onChange={this.handleServiceChange}>
              <option value="0">Seleccione un servicio</option>
              {this.state.dataServices.map((service) => (
                <option value={service.id}> {service.label} </option>
              ))}
            </select>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.agregar()}
            >
              Agregar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalAgregar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}

export default ServicesAppointmet;
