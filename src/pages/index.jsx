import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Card from '../components/card';
import '../styles/index.sass';
import 'bootstrap/dist/css/bootstrap.css';

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const queryp = async () => {
    await axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.data) {
          setProducts(response.data);
          console.log(response.data);
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
          console.log(response.data);
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
  return (
    <div className='col-12'>
      <div className='container'>
        <nav className='navbar navbar-light bg-light sticky-top'>
          <div className='container-fluid'>
            <span className='navbar-brand mb-0 tit'>MENU</span>
            <span className='navbar-brand mb-0 tit'>WEARE®</span>
            <span className='navbar-brand mb-0 tit'>CART</span>
          </div>
        </nav>
        <div className='list-cont'>
          <ul class='list-group '>
            {categories.map((cat) => {
              return (
                <li class='list-group-item border-0 list text-break bg-transparent'>
                  <p className='text-center pt-4 pb-4'>{cat}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className='navbar navbar-light bg-light fixed-bottom'>
          <div className='container'>
            <span className='navbar-brand  tit'>WOMAN</span>
            <span className='navbar-brand  tit border border-dark rounded-pill all'>
              ALL
            </span>
            <span className='navbar-brand  tit'>MEN</span>
          </div>
        </nav>

        {/* {products.map((product) => {
        return (
          <div key={product.id}>
            <Card
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              image={product.image}
              rating={product.rating}
            />
          </div>
        );
      })} */}
      </div>
    </div>
  );
};

export default Index;
