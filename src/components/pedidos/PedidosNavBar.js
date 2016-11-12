/**
 * Created by enriq on 12/11/16.
 */

import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

const PedidosNavBar = props => {
  const {list, callback, selectedKey} = props;
  let navItems = list ? list.map((item) => {
    return (
      <NavItem eventKey={item.id}>
        {item.nombre}
      </NavItem>)
  }) : null;
  return (
    <div >
      <Nav bsStyle="tabs" activeKey={selectedKey} onSelect={callback}>
        <NavItem eventKey='0'>
          Todas
        </NavItem>
        {navItems}
      </Nav>
    </div>
  );
};

PedidosNavBar.propTypes = {};

export default PedidosNavBar;

