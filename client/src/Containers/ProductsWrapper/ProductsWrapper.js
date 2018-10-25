import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import CartItem from "../../Componenents/UI/CardItem/CartItem";

const Wrapper = styled.section`
width:90%;
margin:auto;
display: flex;
justify-content: center;
flex-wrap: wrap;

`;
const GridItem = styled.div`
padding: .3rem;
`

class ProductsWrapper extends React.Component {


    render() {
        const {
            products,
            cart,
            wishlist

        } = this.props;
        const mergedProdcts = products.map(product => {
            const inWishlist = !!wishlist.find(item => item.product === product._id);
            const inCart = !!cart.find(item => item.product === product._id);
            return {
                ...product,
                inCart,
                inWishlist
            }
        })
        return (
            <Wrapper>
                {
                    mergedProdcts.map(product => <GridItem key={product._id}><CartItem product={product}/></GridItem>)
                }
            </Wrapper>

        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    wishlist: state.products.wishlist,
    cart: state.products.cart,
})
export default connect(mapStateToProps)(ProductsWrapper);