import React from 'react';
import '../styles/card.sass';

const Card = ({ title, price, description, category, image, rating }) => {
  return (
    <div className='card'>
      <div className='img-container' >
        <img src={image} className='card-img-top img-fluid' alt={title} />
      </div>
      <div className='card-body'>
        <h5 class='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
