/**
 * Created by enriq on 23/09/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

class TopBarLinks extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.NavLink = this.NavLink.bind(this);
    this.state = {activeKey: 1};
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey});
  }
  NavLink(to,key,text) {
    return (<IndexLinkContainer to={to}>
      <NavItem eventKey={key}>{text}</NavItem>
    </IndexLinkContainer>)
  }
  render() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          {this.NavLink("/",0,"Inicio")}
          {this.NavLink("/editgrupos",1,"Items")}
          {this.NavLink("/editdomiciliarios",2,"Domiciliarios")}
          {this.NavLink("/editcategorias",4,"Categorias")}
          {this.NavLink("/editdescuentos",5,"Descuentos")}
          {this.NavLink("/editformaspago",6,"Formas de Pago")}
          {this.NavLink("/h",8,"Usuarios")}
          {this.NavLink("/editmods",9,"Configurador")}
          {this.NavLink("/i",666,"Salir")}
        </Nav>
      </div>
    );
  }

}

TopBarLinks.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(TopBarLinks);
