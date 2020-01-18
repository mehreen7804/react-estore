import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";
class ProductList extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                        <div className="row">
                            <ProductConsumer>
                                {/*in here we will not pass the data vlue as props
                                 insted we will pass it as render props */}
                                {/* render props is always  like an arrow function */}
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            //<Product />

        )
    }
}

export default ProductList;

{/*when we are definig "value" as a string in the prodlist then 
we can use this way to define value inside "productConsumer" i.e 
{value => {
 return <h1>{value}</h1>;
 }}
 but now as we have defined value as an object in context inside the 
 <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.state.handleDetail,
                addToCart: this.state.addToCart
            }}>
      we will reurn it differently by mapping on the products... 
      then in call back function ()  {hat will tel us what to do with each product}  
  */}