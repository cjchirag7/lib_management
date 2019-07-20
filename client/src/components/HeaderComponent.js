import React,{Component} from 'react';
import {Navbar, Form, FormGroup, Label, Input, Nav, NavbarToggler,Collapse,NavItem, NavbarBrand, Modal, ModalBody, ModalHeader, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';


  function Registerer(props){
    if(props.isSignedIn===false)
    return (
      <React.Fragment>
          &nbsp;
      <Button color="primary" outline onClick={props.toggleRegister}>                    
     <span className="fa fa-user-plus fa-lg"></span> Register
     </Button>
      </React.Fragment>
    );
    else return(
      <React.Fragment>
      </React.Fragment>
    );
  }

  
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
         isNavOpen: false,
         isModalOpen: false,
         isRegisterOpen: false
           }
        this.toggleModal=this.toggleModal.bind(this);
        this.toggleNav=this.toggleNav.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleRegister=this.toggleRegister.bind(this);
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleRegister(event){
      this.setState({
        isRegisterOpen: !this.state.isRegisterOpen
      });

    }

    handleLogin(event) {
      this.toggleModal();
      this.props.loginUser({username: this.username.value, password: this.password.value});
      event.preventDefault();

  }

  handleLogout() {
      this.props.logoutUser();
  }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    render(){
        return (
            <React.Fragment>
                 <Navbar color="dark" dark expand="md" fixed="top">
                    <div className="container">
                     <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                     <NavbarBrand className="mr-auto text-primary" href="/home">
                     <span className="fa fa-home fa-lg"/> Home
                     </NavbarBrand>
                     <Collapse isOpen={this.state.isNavOpen} navbar>
                     <Nav navbar>
                        <NavItem className="ml-2">
                            <NavLink className="nav-link text-primary" to="/books">
                                <span className="fa fa-book fa-lg"/> Books
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-2">
                            <NavLink className="nav-link text-primary" to="/search">
                                <span className="fa fa-search fa-lg"/> Search
                            </NavLink>
                        </NavItem>
                     </Nav>
                     <Nav className="ml-auto" navbar>
                     <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                        <Button outline color="primary" onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline color="primary" onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                       </NavItem>
                           
                     <NavItem className="ml-2 mb-1">
                    <Registerer isSignedIn={this.props.auth.isAuthenticated} toggleRegister={()=>{this.toggleRegister()}}/>
                     </NavItem>
                      </Nav>
                     </Collapse>
                    </div>
                 </Navbar>
                 <Modal isOpen={!this.props.auth.isAuthenticated&&this.state.isModalOpen} toggle={this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>
                         Sign In
                     </ModalHeader>
                     <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                     </Modal>
                 <Modal isOpen={this.state.isRegisterOpen} toggle={this.toggleRegister}>
                     <ModalHeader toggle={this.toggleRegister}>
                         Register 
                     </ModalHeader>
                     <ModalBody>
                     <Form onSubmit={(e)=>{this.handleRegister();
                            this.props.registerUser({
                              username: this.username.value,
                               password: this.password.value,
                               email: this.email.value,
                               roll: this.roll.value,
                               firstname: this.firstname.value,
                               lastname: this.lastname.value, });
                              e.preventDefault(); }}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="lastname" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="roll">Roll no</Label>
                                <Input type="text" id="roll" name="roll"
                                    innerRef={(input) => this.roll = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email"
                                    innerRef={(input) => this.email = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Sign Up</Button>
                        </Form>
                     </ModalBody>
                 </Modal>
                </React.Fragment>
        );
    }
}

export default Header;