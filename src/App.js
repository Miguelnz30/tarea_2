import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id:1 , nombre: "nombre", apellido: "apellido",email: "example@p.com" },
  
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    busqueda:'',
    usuario:[],
	fadeIn:false,
	message:'',
    form: {
      id: "",
      nombre: "",
      apellido: "",
	  email: "",
    },
  };
  onchange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value});
    this.filtrar();
  }
  componentDidMount(){
    this.setState({usuario:data});
  }
  filtrar=()=>{
    var search=data.filter(item=>{
      if(item.nombre.includes(this.state.busqueda)){
        return item;
      }
    })
  }
  

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].apellido= dato.apellido;
		arreglo[contador].email= dato.email;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
	  
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
	this.message('agregado');
	  
  }
  message=(message)=>{
	  this.setState({
		  fadeIn:true,
		  message:message
	  });
	  setTimeout(()=>{
		  this.setState({
		   fadeIn:false,
		  message:''
		  })
	  },3000);
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
      
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear Usuario</Button>
		  
          <br />
          <br />
          <div className="barraBusqueda">
      <input
      type="text"
      placeholder="busqueda"
      className="textField"
      value={this.state.busqueda}
      onChange={this.onchange}
      />
      <button type="button" className="btnBuscar" /*onClick={onclear}*/ ></button>
      </div>
          <Table data={data} id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
           
            <thead>
              <tr>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
				<th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
				  <td>{dato.email}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Cedula:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
			
			<FormGroup>
              <label>
                Email: 
              </label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.email}
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



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
			
			<FormGroup>
              <label>
                Email: 
              </label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.email}
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
        
      
      
      </>
    );
    
  }
}

export default App;
