/**
 * Created by enriq on 23/09/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Salvator's</h1>
              <p>Modificadores y submodificadores</p>
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

Home.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Home);
