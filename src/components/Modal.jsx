import React from 'react';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';
import '../styles/modal.sass';
import Swal from 'sweetalert2';

ReactModal.setAppElement('#root');
ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.5)';

const Modal = ({ isOpen, setIsOpen, cart, setCart }) => {
  let total = 0;
  cart.map((e) => {
    total += e.cant * e.price;
    return '';
  });
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: '720px',
      overflowY: 'auto',
      maxHeight: '95vh',
    },
    overlay: { zIndex: 9999 },
  };
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <ReactModal
      className='Modal bg-light'
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={modalStyles}
      contentLabel='Invitados'
    >
      <motion.div>
        {cart.length === 0 ? (
          <motion.div
            className='d-flex flex-column'
            initial={{ scale: 0 }}
            animate={{
              scale: 0.95,
              transition: {
                type: 'spring',
                duration: 0.7,
              },
            }}
          >
            <h1 className='text-center mt-4 text-capitalize'>
              Add products to your Cart
            </h1>
            <div
              className='btn mt-5 mb-4 btn-outline-danger'
              onClick={() => setIsOpen(false)}
            >
              Close
            </div>
          </motion.div>
        ) : (
          <div>
            {cart.map((product, i) => {
              return (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 0.95,
                    transition: {
                      type: 'spring',
                      duration: 0.7,
                      delay: i * 0.15,
                    },
                  }}
                  className='row modalcontainer'
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className='modalimg col-5 img-fluid'
                  />
                  <h4 className='title col-7 text-lowercase'>
                    {product.title}
                  </h4>
                  <h5 className='col-4 text-center pt-3 d-flex justify-content-center'>
                    Price: ${product.price}
                  </h5>
                  <h5 className='col-3 text-center pt-3 d-flex justify-content-center'>
                    Amount: {product.cant}
                  </h5>
                  <h5 className='col-5 text-center pt-3 d-flex justify-content-center'>
                    Total: ${product.cant * product.price}
                  </h5>
                </motion.div>
              );
            })}
            <div className='mb-4 mt-3 checkout mx-auto d-block col-12 d-flex justify-content-center'>
              <h5> Grand Total: {formatter.format(total)}</h5>
            </div>
            <div
              className='btn btn-outline-dark mb-5 mt-3 checkout mx-auto d-block w-25'
              onClick={() => {
                Swal.fire('Thanks for your purchase', '', 'success');
                setCart([]);
                setIsOpen(false);
              }}
            >
              Checkout
            </div>
          </div>
        )}
      </motion.div>
    </ReactModal>
  );
};

export default Modal;
