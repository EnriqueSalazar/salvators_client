/**
 * Created by enriq on 5/07/16.
 */
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import TopBarLinks from '../../components/FETopBarLinks'

class TopBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><h1>Salvator's Frontend</h1></a>
          </Navbar.Brand>
        </Navbar.Header>
        <br /> <br /> <br /> <br />
      </Navbar>
    );
  }
}

export default TopBar;
