import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectedItem } from '../../actions';
import { getDeliveryQuote } from '../../thunk/getDeliveryQuote';
import './styles.css';

export class RentalCard extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  handleQuote() {
    const { activeUser, rental, selectedItem, getDeliveryQuote} = this.props;
    selectedItem(rental);
    getDeliveryQuote(activeUser.userLocation, rental.itemLocation);
    this.setState({ redirect: true });
  }

  render() {
    const {name, itemLocation, description, image, rentalPrice  } = this.props.rental;
    const { userName } = this.props.activeUser;
    const rentalButton = () => {
      return userName ? 
        <button className='rental-button' onClick={() => this.handleQuote()}>Rent</button> 
        : <Link to='/Login'><button className='login'>Rent</button></Link>;
    };

    return (
      <div className='rental-card'>
        <img className='rental-image' alt='item for rent' src={image}/>
        <div className='card-info'>
          <h1 className='rental-title'>{name}</h1>
          <h2 className='rental-location'>Location: {itemLocation}</h2>
          <p className='rental-description'>Info: {description}</p>
          <h3 className='rental-price'>Price: ${rentalPrice}</h3>
          {rentalButton()}
        </div>
        {this.state.redirect && (
          <Redirect to={`/${userName}/Confirmation`} />
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  activeUser: state.activeUser
});

export const mapDispatchToProps = (dispatch) => ({
  getDeliveryQuote: (fromAddress, toAddress) => dispatch(getDeliveryQuote(fromAddress, toAddress)),
  selectedItem: (item) => dispatch(selectedItem(item))
});

RentalCard.propTypes = {
  rental: PropTypes.object,
  activeUser: PropTypes.object,
  getDeliveryQuote: PropTypes.func,
  selectedItem: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalCard);
