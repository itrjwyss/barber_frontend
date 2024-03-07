import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

class Service extends React.Component {

  state = {
    //data: data,
    modalActualizar: false,
    modalInsertar: false,
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true, });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false, })
  };
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color='success' onClick={() => this.mostrarModalInsertar()}>Nuevo Servicio</Button>
          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.data.map((elemento)=>(
                  <tr>
                    <td>{elemento.id}</td>
                    <td>{elemento.libro}</td>
                    <td>{elemento.autor}</td>
                    <td>
                      <Button color='primary' onClick={()=>this.mostrarModalActualizar(elemento)}>Editar</Button>{" "}
                      <Button color='danger' onClick={()=>this.mostrarModalEliminar(elemento)}>Eliminar</Button>
                    </td>{" "}
                  </tr>
                ))} */}
            </tbody>
          </Table>
        </Container>

        {/* Modal para insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo Servicio</h3></div>
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
              /*value={this.state.data.length+1}*/
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
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripción:
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio:
              </label>
              <input
                className="form-control"
                name="price"
                type="float"
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

            <FormGroup>
              <label>
                Descripción:
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
              //value={this.state.form.libro}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio:
              </label>
              <input
                className="form-control"
                name="price"
                type="float"
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

            <FormGroup>
              <label>
                Descripción:
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
                Precio:
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

export default Service;
