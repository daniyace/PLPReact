import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import Swal from 'sweetalert2';
import Card from '../components/card';
import Card2 from '../components/card2';
import Modal from '../components/Modal';
import '../styles/index.sass';
import 'bootstrap/dist/css/bootstrap.css';

const Index = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('electronics');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [middle, setMiddle] = useState(window.innerHeight / 2);
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
          scroll.scrollTo(window.innerHeight / 3, {
            duration: 1,
            delay: 50,
            smooth: 'easeInOutQuint',
          });
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

      //const isScrollingUp = yPos < lastYPos;
      setIsScrolling(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      setIsScrolling(false);
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  const addtocart = (prod) => {
    let arr = [...cart];
    let i = arr.findIndex((x) => x.id === prod.id);
    if (i !== -1) {
      prod.cant = arr[i].cant + 1;
      arr.splice(i, 1);
    } else prod.cant = 1;

    arr.push(prod);
    setCart([...arr]);
    Swal.fire('Added to your cart', '', 'success');
  };

  return (
    <div className='col-12'>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} cart={cart} setCart={setCart}/>
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
            <span
              className='navbar-brand mb-0 tit'
              onClick={() => {
                setIsOpen(true);
              }}
            >
              CART
            </span>
          </div>
        </nav>
        {selectedPage === '' ? (
          <>
            <div
              className='line container'
              style={{ top: middle, position: 'fixed' }}
            />
            <div className='list-cont' id='inicio'>
              <motion.ul className='list-group'>
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
                      className='list-group-item border-0 list text-break bg-transparent'
                    >
                      <motion.p
                        onClick={() => {
                          scroll.scrollTo(0, {
                            duration: 0,
                            delay: 0,
                            smooth: 'easeInOutQuint',
                          });
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
                      if (
                        product.id === 2 ||
                        product.id === 3 ||
                        product.id === 5 ||
                        product.id === 8 ||
                        product.id === 9 ||
                        product.id === 12 ||
                        product.id === 17 ||
                        product.id === 18
                      )
                        return (
                          <Card
                            prod={product}
                            addtocart={addtocart}
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
            <div className='cards d-flex flex-wrap align-items-center justify-content-evenly mb-5 mt-2'>
              {products.map((product, i) => {
                if (product.category === selectedPage) {
                  return (
                    <Card2
                      prod={product}
                      addtocart={addtocart}
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
                      prod={product}
                      addtocart={addtocart}
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
                scroll.scrollTo(0, {
                  duration: 0,
                  delay: 0,
                  smooth: 'easeInOutQuint',
                });
                setSelectedPage(`women's clothing`);
              }}
            >
              WOMAN
            </span>
            <span
              className='navbar-brand tit border border-dark rounded-pill all'
              onClick={() => {
                scroll.scrollTo(0, {
                  duration: 0,
                  delay: 0,
                  smooth: 'easeInOutQuint',
                });
                setSelectedCategorie('');
                setSelectedPage('all');
              }}
            >
              ALL
            </span>
            <span
              className='navbar-brand tit'
              onClick={() => {
                scroll.scrollTo(0, {
                  duration: 0,
                  delay: 0,
                  smooth: 'easeInOutQuint',
                });
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
