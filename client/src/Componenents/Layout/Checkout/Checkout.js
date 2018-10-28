import Typography from "@material-ui/core/Typography/Typography";
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import CheckoutInfo from "./CheckoutInfo/CheckoutInfo";
import CheckOuTProduct from "./CheckoutProduct/CheckOutProduct";
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

const ListWrapper = styled.div`
height: 80vh;
overflow:hidden;
overflow-y:auto;
`

class Checkout extends React.Component {
    render() {
        const {
            props: {
                cart,
                products
            }
        } = this;
        const productsOnCart = cart.map(cartItem => products.find(product => product._id === cartItem.product)).filter(i => i !== void 0);
        return (
            <Fragment>
                {
                    productsOnCart && <div className="Checkout-wrapper">
                        <div className="container">
                            <div>
                                <Typography variant="display1">
                                    Checkout
                                </Typography>
                            </div>
                            <div className="row align-items-stretch">
                                <div className="col-md-5 col">
                                    <CheckoutInfo/>
                                </div>
                                <div className="col-md-7 col ">
                                    <ListWrapper>
                                        <PerfectScrollbar>
                                            <div className="px-2">
                                                <TransitionGroup>
                                                    {productsOnCart.map(({_id, metaData}) => <CSSTransition classNames={{
                                                            enter: 'fadeGreenify',
                                                            enterActive: 'fadeGreenify',
                                                            exit: 'bounceOutRight',
                                                            exitActive: 'bounceOutRight'
                                                        }} timeout={1000} key={_id}>
                                                            <CheckOuTProduct
                                                                pId={_id}
                                                                brand={metaData.brand}
                                                                name={metaData.name}
                                                                price={metaData.price}
                                                                image={metaData.image}
                                                            />
                                                        </CSSTransition>
                                                    )}
                                                </TransitionGroup>
                                            </div>
                                        </PerfectScrollbar>
                                    </ListWrapper>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    cart: state.products.cart,
})
export default connect(mapStateToProps)(Checkout);