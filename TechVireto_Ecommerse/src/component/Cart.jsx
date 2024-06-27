/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import "../App.css";
export default function Cart(props) {
    /* console.log *///(props.cart.forEach(a=>console.log(a.image)));
    const details= props.cart;
    //console.log(details);
    return (
      <div className="cart-layout">
        <div>
          <h1>Your Cart</h1>
          {props.cart.length===0 &&<p>You have not added any product to your cart yet.</p>}
          <table className="table table-cart">
            <thead>
              <tr>
                <th width="25%" className="th-product">Product</th>
                <th width="20%">Unit price</th>
                <th width="10%">Quanity</th>
                <th width="25%">Total</th>
              </tr>
            </thead>
            <tbody>
              
              {details.map((product)=>{
                  return (<tr>
                    <td>
                      <img src={product.image} width="30" height="30" alt="" />
                        {product.name}
                    </td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <strong>${product.price*product.quantity}</strong>
                    </td> 
                  </tr>)
              })
              }
              
                
            </tbody>
            <tfoot>
              <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${details.reduce((total,current)=>{
                    return total+(current.price*current.quantity)
                  },0)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }