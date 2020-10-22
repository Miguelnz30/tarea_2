import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
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
const api=axios.create({
  baseURL:'http://localhost:3050',
  withCredentials: true,
  mode:'no-cors',
  headers: {
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type',  
  }
})
/*const data = [
  { id:1 , nombre: "nombre", apellido: "apellido",email: "example@p.com" },
  
];*/

class App extends React.Component {
  state = {
    //data: data,
    modalActualizar: false,
    modalInsertar: false,
    busqueda:'',
    usuarios:[],
    form: {
      cedula:"",
      nombre: "",
      apellido: "",
	    correo: "",
    },
  };
  constructor(){
    super();
    this.getUser();
  }
  
  onchange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value});
    this.filtrar();
  }
  /*componentDidMount(){
    this.setState({usuario:data});
  }
  filtrar=()=>{
    var search=data.filter(item=>{
      if(item.nombre.includes(this.state.busqueda)){
        return item;
      }
    })
  }*/
  
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
  getUser=async()=>{
    let data= await api.get('/usuarios').then(({data})=>data);
      this.setState({usuarios:data})
    }
  createUser=async()=>{
    var lista= this.state.usuarios;
    let res= await api.post('/add',{...this.state.form})
    this.setState({ modalInsertar: false, data: lista });
    console.log(res)
      this.getUser();
      }
  updateUser=async(cedula,val)=>{
    var arreglo = this.state.usuarios;
    val={...this.state.form};
    let data=await api.put(`/update/${cedula}`,{
      cedula:val,
      nombre:val,
      apellido:val,
      correo:val
})
    this.setState({ data: arreglo, modalActualizar: false });
    console.log(data)
    this.getUser();
  }
  deleteUser= async(cedula)=>{
      var arreglo = this.state.usuarios;
      let data =await api.delete(`/delete/${cedula}`);
      this.setState({ data: arreglo, modalActualizar: false });
      console.log(data)
        this.getUser();

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
      
          <Table  className="table table-striped table-bordered table-sm"  width="100%">
           
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
              {this.state.usuarios.map((dato) => (
                <tr key={dato.cedula}>
                  <td>{dato.cedula}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
				          <td>{dato.correo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.deleteUser(dato.cedula)}>Eliminar</Button>
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
                value={this.state.form.cedula}
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
                name="correo"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.updateUser(this.state.form)}
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
                cedula: 
              </label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cedula}
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
                name="correo"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.createUser()}
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
