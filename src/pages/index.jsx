import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import Card from '../components/card';
import Card2 from '../components/card2';
import '../styles/index.sass';
import 'bootstrap/dist/css/bootstrap.css';

const Index = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('electronics');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [middle, setMiddle] = useState(window.innerHeight / 2);
  const [prodtoshow, setProdtoshow] = useState([]);
  const queryp = async () => {
    await axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.data) {
          setProducts(response.data);
          //console.log(response.data);
        }
      })
      .catch((e) => {});
  };
  const queryc = async () => {
    await axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        if (response.data) {
          setCategories(response.data);
          //console.log(response.data);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (firstLoad && products.length === 0 && categories.length === 0) {
      queryp();
      queryc();
      setFirstLoad(false);
    }
  }, [products, firstLoad, categories]);

  useEffect(() => {
    const handleScroll = () => {
      const elec = document.getElementById('electronics');
      const jew = document.getElementById('jewelery');
      const men = document.getElementById(`men's clothing`);
      const women = document.getElementById(`women's clothing`);
      if (elec !== null) {
        const rectelec = elec.getBoundingClientRect();
        const rectjew = jew.getBoundingClientRect();
        const rectmen = men.getBoundingClientRect();
        const rectwomen = women.getBoundingClientRect();
        let midd = window.innerHeight / 2;
        setMiddle(midd);

        if (midd > rectelec.y && midd < rectelec.bottom) {
          setSelectedCategorie('electronics');
        }
        if (midd > rectjew.y && midd < rectjew.bottom) {
          setSelectedCategorie('jewelery');
        }
        if (midd > rectmen.y && midd < rectmen.bottom) {
          setSelectedCategorie(`men's clothing`);
        }
        if (midd > rectwomen.y && midd < rectwomen.bottom) {
          setSelectedCategorie(`women's clothing`);
        }
      }

      const yPos = window.scrollY;
      //const isScrollingUp = yPos < lastYPos;
      setIsScrolling(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      setIsScrolling(false);
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [lastYPos]);

  return (
    <div className='col-12'>
      <div className='container'>
        <nav className='navbar navbar-light bg-light sticky-top'>
          <div className='container-fluid'>
            <span className='navbar-brand mb-0 tit'>MENU</span>
            <span
              className='navbar-brand mb-0 tit'
              onClick={() => {
                scroll.scrollTo(window.innerHeight / 3, {
                  duration: 1,
                  delay: 50,
                  smooth: 'easeInOutQuint',
                });
                setSelectedPage('');
              }}
            >
              WEARE®
            </span>
            <span className='navbar-brand mb-0 tit'>CART</span>
          </div>
        </nav>
        {selectedPage === '' ? (
          <>
            <div
              className='line container'
              style={{ top: middle, position: 'fixed' }}
            />
            <div className='list-cont' id='inicio'>
              <motion.ul class='list-group'>
                {categories.map((cat, i) => {
                  return (
                    <motion.li
                      initial={{ y: window.innerHeight }}
                      animate={{
                        y: 0,
                        transition: {
                          type: 'spring',
                          duration: 0.7,
                          delay: i * 0.2,
                        },
                      }}
                      key={cat}
                      id={cat}
                      class='list-group-item border-0 list text-break bg-transparent'
                    >
                      <motion.p
                        onClick={() => {
                          setSelectedPage(cat);
                        }}
                        className='text-center pt-4 pb-4'
                      >
                        {cat}
                      </motion.p>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
            <div className='cards'>
              {products.map((product) => {
                if (selectedPage === '') {
                  if (selectedCategorie !== '')
                    if (product.category === selectedCategorie) {
                      return (
                        <Card
                          disposition={1}
                          middlS={middle}
                          isScrolling={isScrolling}
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          description={product.description}
                          category={product.category}
                          image={product.image}
                          rating={product.rating}
                        />
                      );
                    }
                }
                return '';
              })}
            </div>
          </>
        ) : (
          <>
            <div className='cards d-flex flex-wrap align-items-center justify-content-evenly mt-3'>
              {products.map((product, i) => {
                if (product.category === selectedPage) {
                  return (
                    <Card2
                      disposition={2}
                      middlS={middle}
                      isScrolling={isScrolling}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      category={product.category}
                      image={product.image}
                      rating={product.rating}
                    />
                  );
                } else if (selectedPage === 'all')
                  return (
                    <Card2
                      disposition={2}
                      middlS={middle}
                      isScrolling={isScrolling}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      category={product.category}
                      image={product.image}
                      rating={product.rating}
                    />
                  );
                return '';
              })}
            </div>
          </>
        )}
        <nav className='navbar navbar-light bg-light fixed-bottom'>
          <div className='container'>
            <span
              className='navbar-brand tit'
              onClick={() => {
                setSelectedPage(`women's clothing`);
              }}
            >
              WOMAN
            </span>
            <span
              className='navbar-brand tit border border-dark rounded-pill all'
              onClick={() => {
                setSelectedCategorie('');
                setSelectedPage('all');
              }}
            >
              ALL
            </span>
            <span
              className='navbar-brand tit'
              onClick={() => {
                setSelectedPage(`men's clothing`);
              }}
            >
              MEN
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;
