import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import '../styles/card.sass';

const Card = ({
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
      rotateY: 0,
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    hover: {
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
      {/* <div className='card-body'>
        <h5 class='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div> */}
    </motion.div>
  );
};

export default Card;
