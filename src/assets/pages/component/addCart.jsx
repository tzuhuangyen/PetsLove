//product page's cart component
import React from 'react';
import { useContext } from 'react';
import { CartContext } from './Context';

function Cart() {
  const contextValue = useContext(CartContext);
  const { state, dispatch } = contextValue;
  // Check if state and state.cartList are defined before accessing
  const cartList = state && state.cartList ? state.cartList : [];
  return (
    <div className='bg-light p-3'>
      {/*        {JSON.stringify(state.cartList)}
       */}
      <table className='table align-middle'>
        <tbody>
          {state.cartList.map((item) => {
            return (
              <tr key={item.id} className='table-row'>
                <td className='p-0'>
                  <button
                    type='button'
                    className='deleteBtn'
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_CART_ITEM',
                        payload: {
                          ...item,
                        },
                      });
                    }}
                  >
                    x
                  </button>
                </td>
                <td className='pe-0'>
                  <img src={item.img_url} alt='' className='table-img' />
                </td>
                <td>
                  {item.name} <br />
                  <span className='text-muted'>{item.price}</span>
                </td>
                <td className='p-0'>
                  <select
                    name=''
                    id=''
                    className='form-select '
                    value={item.quantity}
                    onChange={(e) => {
                      e.preventDefault();
                      const quantity = parseInt(e.target.value);
                      dispatch({
                        type: 'CHANGE_CART_QUANTITY',
                        payload: {
                          ...item,
                          quantity,
                        },
                      });
                    }}
                  >
                    {[...Array(5)].map((_, i) => {
                      return (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className='text-end'>
                  {' '}
                  €{parseFloat(item.price) * parseInt(item.quantity)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className='text-end'>
              Total €{state.total || 0}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
