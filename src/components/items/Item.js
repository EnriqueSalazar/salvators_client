import React, { Component, PropTypes } from 'react';
import ItemDetail from './ItemDetail'
import ItemModList from './ItemModList'
import {
  Row
} from 'react-bootstrap';


class Item extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <Row>
          <h3>Item</h3>
          <ItemDetail
            initialValues={this.props.item}
            itemSubmit={this.props.itemSubmit}
            handleDestroyItem={this.props.handleDestroyItem}
          />
        </Row>
        <Row>
          <ItemModList
            modFiltered={this.props.modFiltered}
            item={this.props.item}
            itemMods={this.props.itemMods}
            createItemMod={this.props.createItemMod}
            handleDestroyItemMods={this.props.handleDestroyItemMods}
          >
            {this.props.modificadores}
          </ItemModList>
        </Row>
      </div>
    )
  }
}

Item.propTypes = {};

export default Item;
