/**
 * Created by enriq on 23/09/16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

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

  NavLink(to, key, text) {
    return (<IndexLinkContainer to={to}>
      <NavItem eventKey={key}>{text}</NavItem>
    </IndexLinkContainer>)
  }

  MenuLink(to, key, text) {
    return (<IndexLinkContainer to={to}>
      <MenuItem eventKey={key}>{text}</MenuItem>
    </IndexLinkContainer>)
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          {this.NavLink("/backend", 0, "Inicio")}
          <NavDropdown eventKey="33" title={'Items'} id="basic-nav-dropdown">
            {this.MenuLink("/backend/editgrupos", 1, "Grupos")}
            {this.MenuLink("/backend/editcategorias", 4, "Categorias")}
          </NavDropdown>
          {this.NavLink("/backend/editformaspago", 6, "Formas de Pago")}
          {this.NavLink("/backend/editdomiciliarios", 2, "Domiciliarios")}
          {this.NavLink("/backend/editestados", 3, "Estados")}
          {this.NavLink("/backend/editdescuentos", 5, "Descuentos")}
          {this.NavLink("/backend/h", 8, "Usuarios")}
          {this.NavLink("/backend/editmods", 9, "Modificadores y Submodificadores")}
          {this.NavLink("/backend/editrestaurantes", 10, "Restaurantes")}
          {this.NavLink("/backend/i", 666, "Salir")}
        </Nav>
        <Nav pullRight>
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
