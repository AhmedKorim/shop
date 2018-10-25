import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styled from 'styled-components';
import {getSpringCoordinates} from "../../../Store/ActionsTypes";
import {addProductToCart, toggleWishlist} from "../../../Store/ProdcutsActions";
import AsyncIconButton from "../AsyncIconButton/AsyncIconButton";

const Wrapper = styled.div`
  max-width:250px;
  min-width: 200px;
`;
const Image = styled.div`
    cursor:pointer;
  padding-top: 79%;
  position: relative;
  div{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   background: #fff url("${props => props.source}") center center no-repeat;
   background-size: contain;
  }
`;
const Body = styled.div`
  
`
const TextWrapper = styled(Typography)`
font-weight: bold !important;
text-align: center;
text-transform:capitalize;
padding: .4rem .2rem ;
`;
const Price = styled.div`
   padding:.2rem;
   .margin-left{
   margin-left: auto;
   }
   .priceWrapper{
   text-align: center;
   font-weight: bold;
   }
   .action-button{
   min-width: unset;
   min-height: unset;
   width: 40px;
   height: 40px;
   margin-right: .2rem;
   }
`;

class CartItem extends Component {

    showProductDetails = (e, id) => {
        const x = this.wrapper.offsetLeft;
        const y = this.wrapper.offsetTop;
        const width = this.wrapper.offsetWidth;
        const height = this.wrapper.offsetHeight;
        window.shit = this.wrapper;
        this.props.updatedSpringCoordinates({
            x: x + width / 2,
            y: y + height / 3,
            width: this.wrapper.offsetWidth / 2,
            height: this.wrapper.offsetHeight / 2
        })
        this.props.history.push('/products/' + id)

    };


    render() {
        const {
            props: {
                product: {
                    _id,
                    metaData: {
                        name,
                        price,
                        image,
                    },
                    inCart,
                    inWishlist
                },
                addProductToCart,
                toggleWishlist,
                asyncButtons
            },
            showProductDetails,
        } = this;

        const loadingButtons = asyncButtons.filter(buttons => buttons.indexOf(_id) > -1);
        const addingToWishList = loadingButtons.find(e => e.indexOf('wishlist') > -1);
        const addingToCart = loadingButtons.find(e => e.indexOf('cart') > -1);
        return (
            <div>
                <Wrapper innerRef={node => this.wrapper = node}>
                    <Paper elevation={1} style={{padding: ".4rem 0"}}>
                        <Tooltip title="click for more detials">
                            <Image source={`${window.location.origin}/${image}`} onClick={(e) => showProductDetails(e, _id)}>
                                <div></div>
                            </Image>
                        </Tooltip>
                        <Body>
                        <TextWrapper>
                            {name}
                        </TextWrapper>
                        <Price>
                            <Grid container alignItems="center">
                                <Grid item xs={4} className="priceWrapper">
                                    {price}$
                                </Grid>
                                <Grid item xs container className="margin-left">
                                    <AsyncIconButton
                                        clickHandler={() => addProductToCart(_id, inCart ? 0 : 1)}
                                        mainIcon="add_shopping_cart"
                                        success={inCart}
                                        successIcon="add_shopping_cart"
                                        loading={addingToCart}
                                    />
                                    <AsyncIconButton
                                        clickHandler={() => toggleWishlist(_id)}
                                        mainIcon="favorite"
                                        success={inWishlist}
                                        successIcon="favorite"
                                        loading={addingToWishList}
                                        successVariant={true}
                                    />
                                </Grid>
                            </Grid>
                        </Price>
                        </Body>
                    </Paper>
                </Wrapper>
            </div>
        )
    }
}

const mapDispatchToPros = dispatch => {
    return {
        updatedSpringCoordinates: (coordinates) => dispatch(getSpringCoordinates(coordinates)),
        addProductToCart: (productId, count) => dispatch(addProductToCart(productId, count)),
        toggleWishlist: (productId) => dispatch(toggleWishlist(productId))
    }
}
const mapStateToProps = state => ({
    asyncButtons: state.animations.asyncButtonLoading
})
export default withRouter(connect(mapStateToProps, mapDispatchToPros)(CartItem));