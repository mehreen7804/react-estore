import React, { Component } from 'react';
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();
//Context api .. so aht we dont need o aaccess thorough other components to get data .... instead with 
///context api we can get data anywhere from the app without passing through other components
// as this context will provide data to whole app o we will impor this file in the hihest pon of he app
// which is index.js in which APP comp is beind rendered

// whenever we use  the createcontext method it comes with two things
//provider    its gonna provide the informaion forr all the application 
//consumer 
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    };
    setProducts = () => {

        let Products = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            Products = [...Products, singleItem];
        });



        this.setState(() => {

            return { products: Products };

        });
    };
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = (id) => {
        let Products = [...this.state.products];
        const index = Products.indexOf(this.getItem(id));
        const product = Products[index];
        product.inCart = 1;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                products: Products,
                cart: [...this.state.cart, product]
            };
        },
            () => {
                this.addTotals();
            }
        );
    };
     openModal = (id) => {
    const product = this.getItem(id);
    this.setState({
      modalOpen: true,
      modalProduct: product,
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, () => { this.addTotals() });
    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, () => { this.addTotals() });
        }
    };

    removeItem = (id) => {
        let Products = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = Products.indexOf(this.getItem(id));
        let removeProduct = Products[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.toal = 0;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                    products: [...Products]
                };
            },
            () => {
                this.addTotals();
            }
        );

    };

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        },
            () => {
                this.setProducts();
                this.addTotals();

            });
    };
    clearCart

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;

        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };
        });

    }


    render() {
        return (
            <div>
                <ProductContext.Provider
                    value={{
                        ...this.state,
                        handleDetail: this.handleDetail,
                        addToCart: this.addToCart,
                        openModaL: this.openModaL,
                        closeModal: this.closeModal,
                        increment: this.increment,
                        decrement: this.decrement,
                        removeItem: this.removeItem,
                        clearCart: this.clearCart
                    }}>
                    {this.props.children}
                </ProductContext.Provider>
            </div>
        );
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

{/*here we r using
    (..thi.state) destructuring we can also use simple mehid which
will also work that is "products:this.state.products" however its a 
slow process we can access it wherever we r using the consumer

here in value we r defining value as an object so that we can give any 

properties o value by defning state and methods... then we can acces them 
in our productList


*/ } 
