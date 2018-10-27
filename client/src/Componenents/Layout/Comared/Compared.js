import Button from "@material-ui/core/Button/Button";
import {green} from "@material-ui/core/colors";
import Fade from "@material-ui/core/Fade/Fade";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide/Slide";
import Typography from "@material-ui/core/Typography/Typography";
import Zoom from "@material-ui/core/Zoom/Zoom";
import React, {Fragment} from 'react';
import {addProductToCart} from "../../../Store/ProdcutsActions";
import RadarChart from "../../UI/RadarChart/RadarChart";
import CoverFlowSwiper from "./CoverFlowSwiper/CoverFlowSwiper";
import {connect} from 'react-redux';
import styled from 'styled-components';

const MetaDataWrapper = styled.div`
overflow:hidden;
position: relative;
height: 3rem;
width: 100%;
.MataData__container{
position: absolute;
top: 0;
left:0;
width: 100%;
}
.MetaData__typography{
font-weight: bold;
text-transform:capitalize;

}

`

const FapWrapper = styled.div`
position: fixed;
bottom: 3rem;
right: 3rem;
z-index: 555;
font-weight: bold;
`;

class Compared extends React.Component {

    state = {
        activeSlideId: null
    }

    setActiveSlide = (activeSlideId) => {
        this.setState({activeSlideId})
    }


    render() {
        const {
            props: {
                products,
                comparedList,
                addProductToCart
            },
            setActiveSlide
        } = this;

        let swiperReadyData = null,
            onCart = false,
            activeProduct = null;
        if (comparedList.length > 0) {
            const productOnComparedList = comparedList.map(comparedListItem => products
                .find(product =>
                    product._id === comparedListItem.product));


            swiperReadyData = productOnComparedList.reduce((acc, {_id: id, metaData: {image, name}}) =>
                [...acc, {id, image}], []);
            activeProduct = productOnComparedList.find(comparedListItem => comparedListItem._id === this.state.activeSlideId);
            onCart = !!this.props.cart.find(carItem => carItem.product === this.state.activeSlideId);
        }


        return (
            <div>
                {swiperReadyData &&
                <Fragment>
                    <CoverFlowSwiper
                        getActiveKey={setActiveSlide}
                        slides={swiperReadyData}
                    />
                    {activeProduct && <Fragment>
                        <div className="container text-center mt-5">
                            <div className="row justify-content-center">
                                <div className="col col-md-6 text-center">
                                    <MetaDataWrapper className="p-3">
                                        <Slide in={true} timeout={100} key={this.state.activeSlideId}>
                                            <div className="MataData__container">
                                                <Typography variant="headline" component="div" className="MetaData__typography">
                                                    {activeProduct.metaData.name}
                                                </Typography>
                                                <Typography variant="subheading" component="div" className="MetaData__typography">
                                                    {activeProduct.metaData.price}$
                                                </Typography>
                                            </div>
                                        </Slide>
                                    </MetaDataWrapper>
                                </div>
                                <div className="col-12"/>
                                <div className="col col-md-6">
                                    <div className="max__with-250">
                                        <RadarChart
                                            statistics={activeProduct.statistics}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FapWrapper>
                            <Zoom in={true} UnmountOnExit MountOnEnter timeout={500} key={activeProduct._id}>
                                <Button variant="fab" color={onCart ? "default" : "primary"}
                                        style={{color: onCart && green[700]}}
                                        onClick={() => addProductToCart(activeProduct._id, onCart ? 0 : 1)}
                                >
                                    <Icon>add_shopping_cart</Icon>
                                </Button>
                            </Zoom>
                        </FapWrapper>
                    </Fragment>
                    }
                </Fragment>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products,
    comparedList: state.products.comparedList,
    cart: state.products.cart
})
const mapDispatchToProps = dispatch => ({
    addProductToCart: (id, count) => dispatch(addProductToCart(id, count))
})
export default connect(mapStateToProps, mapDispatchToProps)(Compared);