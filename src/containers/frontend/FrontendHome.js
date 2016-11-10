/**
 * Created by enriq on 23/09/16.
 */
import React, {Component} from 'react';
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Salvator's</h1>
              <h1> F R O N T E N D</h1>
            </Jumbotron>

          </Col>
        </Row>
        <Row>
          <Col md={6}>
          </Col>
          <Col md={6}>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default Home;
