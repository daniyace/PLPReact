import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/card.sass';
import img from '../assets/cart.svg';

const Card2 = ({
  prod,
  addtocart,
  middlS,
  isScrolling,
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const [animation, setAnimation] = useState(0);

  const variants = {
    static: {
      opacity: 1,
      top: 0,
      transition: {
        type: 'spring',
        duration: 0.7,
        delay: id * 0.04,
      },
    },
    none: {
      opacity: 0.3,
    },
    show: {
      opacity: 1,
    },
  };

  const show = {
    hide: {
      opacity: 0,
      transition: {
        type: 'spring',
        duration: 0.7,
      },
    },
    show: {
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.7,
      },
    },
  };
  return (
    <motion.div
      id={'card' + id}
      className='card'
      onTap={() => {
        setAnimation(1);
      }}
      onMouseEnter={() => {
        setAnimation(1);
      }}
      onMouseLeave={() => {
        setAnimation(0);
      }}
      initial={{ top: window.innerHeight }}
      variants={variants}
      animate={'static'}
    >
      <motion.div
        className='img-container'
        variants={variants}
        animate={animation === 0 ? 'show' : 'none'}
      >
        <motion.img
          src={image}
          className='card-img-top img-fluid'
          alt={title}
        />
      </motion.div>
      <motion.div
        className='card-body text-center w-100'
        initial={{
          position: 'absolute',
          bottom: 0,
        }}
        variants={show}
        animate={animation === 1 ? 'show' : 'hide'}
      >
        <h6 class='card-title'>{title}</h6>
        <h6 class='card-title'>${price}</h6>
        <div
          className='btn btn-outline-dark cart'
          onClick={() => {
            addtocart(prod);
          }}
        >
          <img src={img} alt='cart' />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card2;
