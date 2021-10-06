import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import '../styles/card.sass';

const Card2 = ({
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
            : -window.innerHeight + window.scrollY,
        left:
          id % 2 === 0
            ? window.innerWidth / 2 - 600
            : window.innerWidth / 2 + 300,
      }}
    >
      <motion.div className='img-container'>
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

export default Card2;
