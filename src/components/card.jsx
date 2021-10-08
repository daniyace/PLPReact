import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img from '../assets/cart.svg';
import '../styles/card.sass';

const Card = ({
  prod,
  addtocart,
  disposition,
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
  const [middle, setMiddle] = useState(0);
  const [fistload, setFisrtLoad] = useState(true);
  const variants = {
    static: {
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    hover: {
      opacity: 0.3,
      rotateY: 180,
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
  };
  const scrollAnimation = {
    static: {
      top: middlS + window.scrollY - middle,
    },
    none: {},
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

  useEffect(() => {
    const handleScroll = (e) => {
      var card = document.getElementById('card' + id);
      var cardbox = card.getBoundingClientRect();
      setMiddle(cardbox.height / 2);
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll, false);
    };
  }, [id]);
  useEffect(() => {
    if (fistload) {
      var card = document.getElementById('card' + id);
      var cardbox = card.getBoundingClientRect();
      setMiddle(cardbox.height / 2);
      setFisrtLoad(false);
    }
  }, [fistload, id]);
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
      initial={{
        position: 'absolute',
        top:
          id % 2 === 0
            ? window.innerHeight + window.scrollY
            : -window.innerHeight + window.scrollY - middle * 2,
        left:
          disposition === 1 && id % 2 === 0
            ? window.innerWidth / 2 - 600
            : window.innerWidth / 2 + 300,
      }}
      variants={scrollAnimation}
      animate={fistload ? 'none' : 'static'}
      transition={{
        type: 'spring',
        delay: 0.01,
        duration: 1,
      }}
    >
      <motion.div
        className='img-container'
        initial={{
          top: 200,
        }}
        variants={variants}
        animate={animation === 1 ? 'hover' : 'static'}
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

export default Card;
