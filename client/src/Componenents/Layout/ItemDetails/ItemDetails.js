import {withTheme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import {green} from "@material-ui/core/colors";
import Fade from "@material-ui/core/Fade/Fade";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import Zoom from "@material-ui/core/Zoom/Zoom";
import React, {Fragment} from 'react';
import Hammer from "react-hammerjs";
import {connect} from "react-redux";
import styled from 'styled-components';
import {addProductToCart, setActiveProduct} from "../../../Store/ProdcutsActions";
import AsyncIconButton from "../../UI/AsyncIconButton/AsyncIconButton";
import ImgSwipper from "../../UI/ImgSwipper/ImgSwipper";
import RadarChart from "../../UI/RadarChart/RadarChart";
import Rating from "../../UI/Rating/Rating";
import SpringItem from "../../UI/SpringItem/SpringItem"
import ProductAvatar from "../Navigation/ProductAvatar";


const Wrapper = styled.section`
box-sizing: border-box;
position: absolute;
top: ${({scroll}) => scroll}px;
left: 0;
width: 100%;
z-index: 89;
height:100%;
overflow: hidden;
overflow-y:auto;
padding-top: 400px;
&>div{
position:relative;
}
//transition:border-radius ease-in-out 1s;
border-radius: ${props => props.wihtech ? "0%" : '0%'};
    background-color:${props => props.wihtech ? '#fff' : "transparent"};
`
const Content = styled.div`
    overflow: visible;
background-color:#fff;
padding: 4rem 0;
box-shadow: ${props => props.shadows[19]};
position:relative;
z-index: 44;
  width:100%;
 
  .disription_header{
  font-weight: bold;
  margin-bottom: .7rem;
  color: #212121;
  }
`;
const SliderShow = styled.div`
  height:40vh;
`;
const FapWrapper = styled.div`
position: fixed;
bottom: 3rem;
right: 3rem;
z-index: 555;
font-weight: bold;
`;


const ResImg = styled.div`
padding: 1rem 0;
text-align: center;
margin: auto;
max-width: ${props => props.maxWidth}px;
img{
max-width: 100%;
}
`
const RateWrapper = styled.div`
display: flex;
justify-content: center;
width: 100%;
div{
}
`
const Row = styled.div`
display: flex;
justify-content: center;  
align-items: center;
`
const Datavisulization = styled.div`
padding: 1rem;
max-width: 300px;
margin: auto;
`


const SButton = styled(Button)`
&&{position:fixed;
top: 5rem;
left: 10%;
color: #000;
z-index: 1234123;}
`

class ItemDetails extends React.Component {
    state = {
        showContent: false,
        white: false,
        closing: false,
        closed: false,
        live: true
    }
    wihtech = () => {
        if (!this.state.closing) {
            if (!this.state.white) this.setState({white: true});
            if (!this.state.showContent) this.setState({showContent: true});
        } else {
            if (!this.state.closed) {
                this.setState({closed: true});
                this.props.history.push('/products')
            }
        }
    }
    close = () => {
        // collapse all
        if (this.state.closing) return;
        this.setState({
            white: false,
            showContent: false,
            closing: true,
        })
    }
    animtionVla = () => {
        const strting = {
            x: this.props.coordinates.x,
            y: this.props.coordinates.y - this.props.scroll,
            width: this.props.coordinates.width,
            height: this.props.coordinates.height,
        }
        const ending = {
            x: 0,
            y: (this.props.headerHeight || 64),
            width: window.innerWidth,
            height: 400,
        }

        if (!this.state.closing) {
            return {
                animationStart: strting,
                animationEnd: ending
            }
        }
        return {
            animationStart: ending,
            animationEnd: strting
        }

    }
    handelSwipe = (e) => {
        console.log(e.velocityX);
        if (e.velocityX < -.3) {
            console.log('close');
            this.close()
        }
    }

    componentDidUpdate() {
        const {keyDown} = this.props;
        if (keyDown && !this.state.closing) {
            if (keyDown.key === "Escape" && !keyDown.expired) {
                this.close();
            }
        }
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps.location.pathname, this.props.location.pathname);
        if (nextProps.location.pathname === this.props.location.pathname) {
            if (!this.state.closing) return;
            this.close();

        }
    }

    componentDidMount() {
        this.wrapper && this.wrapper.focus();

    }

    componentWillUnmount() {
        this.props.setActiveProduct(null)
    }

    render() {
        const {
            props: {
                coordinates,
                theme,
                headerHeight,
                scroll,
                addProductToCart,
                cart
            },
            state: {
                closing
            },
            handelSwipe
        } = this;
        let details = null;

        const {animationStart, animationEnd} = this.animtionVla();

        const id = this.props.match.params.id;
        let activeProduct = this.props.products.find(({_id}) => _id === id);
        if (!this.props.activeProduct && !activeProduct) {
            this.props.setActiveProduct(id)
        }
        activeProduct = activeProduct || this.props.products.find(product => product._id === this.props.activeProduct);
        if (activeProduct) {
            const {
                _id,
                metaData: {
                    name,
                    image,
                    brand,
                    price,
                    description
                },
                statistics,
                slides
            } = activeProduct;
            const onCart = !!cart.find(cartItem =>
                cartItem.product === activeProduct._id
            );
            details = <Wrapper wihtech={this.state.white} scroll={scroll}>
                <Hammer
                    onSwipe={handelSwipe}
                    options={{
                        recognizers: {
                            swipe: {enable: true}
                        }
                    }}>
                    <div>
                        <Zoom in={this.state.showContent} UnmountOnExit MountOnEnter timeout={400} mountOnEnter
                              style={{transitionDelay: this.state.showContent ? 100 : 100}}>
                            <Tooltip title="go back">
                                <SButton onClick={this.close}><Icon>keyboard_backspace</Icon></SButton>
                            </Tooltip>
                        </Zoom>
                        <SpringItem
                            startingX={animationStart.x}
                            startingY={animationStart.y}
                            startingWidth={animationStart.width}
                            startingHeight={animationStart.height}
                            endingX={animationEnd.x}
                            endingY={animationEnd.y}
                            endingWidth={animationEnd.width}
                            endingHeight={animationEnd.height}
                            fire={this.wihtech}
                            close={this.close}
                            image={`${window.location.origin}/${image}`}
                        />
                        <Fade in={this.state.showContent} UnmountOnExit MountOnEnter timeout={300}
                              style={{transitionDelay: this.state.showContent ? 200 : 0}}>
                            <div className="container">
                                <Content shadows={theme.shadows}>
                                    <div>
                                        <Zoom in={this.state.showContent} UnmountOnExit MountOnEnter timeout={300} mountOnEnter
                                              style={{transitionDelay: this.state.showContent ? 200 : 100}}>
                                            <ProductAvatar text={price + '$'}/>
                                        </Zoom>
                                    </div>
                                    <div className="p-4">
                                        <div className="row">
                                            <div className="col-12 text-center mb-2">
                                                <div className="m-auto">
                                                    <Typography variant="display1" component="h3" className="disription_header mb-0">
                                                        {name}
                                                    </Typography>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div>
                                                            <Typography variant="subheading" component="h4" className="disription_header brand_name mb-0">
                                                                {brand}
                                                            </Typography>
                                                        </div>
                                                        <div className="px-2">
                                                            <RateWrapper>
                                                                <div>
                                                                    <Rating rate={80}/>
                                                                </div>
                                                            </RateWrapper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <Typography variant="headline" component="h4" className="disription_header">
                                                    Discription
                                                </Typography>
                                                <Typography>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci autem deleniti dicta excepturi
                                                    harum,
                                                    molestiae
                                                    nisi
                                                    qui
                                                    quis quod. Accusantium nam nesciunt numquam quisquam saepe! At, doloremque, porro. Laudantium!
                                                </Typography>
                                                <br/>
                                                <Typography>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci autem deleniti dicta excepturi
                                                    harum,
                                                    molestiae
                                                    nisi
                                                    quiLorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci autem deleniti dicta
                                                    excepturi
                                                    harum,
                                                    molestiae
                                                    nisi
                                                    qui
                                                    quis quod. Accusantium nam nesciunt numquam quisquam saepe! At, doloremque, porro. Laudantium!
                                                </Typography>
                                            </div>
                                            <div className="col">
                                                <Datavisulization>
                                                    <RadarChart current={name} statistics={statistics}/>
                                                </Datavisulization>
                                            </div>
                                        </div>
                                    </div>
                                    <Fragment>
                                        {/*<Collapse timeout={100} in={this.state.showContent} mountOnEnter>*/}
                                        <div>
                                        </div>
                                        <div>
                                        </div>
                                        {/*</Collapse>*/}
                                        <div className="container">
                                            <SliderShow>
                                                <ImgSwipper
                                                    imagesArray={slides.map(slide => ({[slide]: `${window.location.origin}/${slide}`})
                                                    )}
                                                />
                                            </SliderShow>
                                        </div>
                                    </Fragment>
                                </Content>
                            </div>
                        </Fade>
                        <FapWrapper>
                            <Zoom in={this.state.showContent} UnmountOnExit MountOnEnter timeout={500}
                                  style={{transitionDelay: this.state.showContent ? 600 : 0}}>
                                <Button variant="fab" color={onCart ? "default" : "primary"}
                                        style={{color: onCart && green[700]}}
                                        onClick={() => addProductToCart(_id, onCart ? 0 : 1)}
                                >
                                    <Icon>add_shopping_cart</Icon>
                                </Button>
                            </Zoom>
                        </FapWrapper>
                    </div>
                </Hammer>
            </Wrapper>
            // on cart?

        }


        return (
            <Fragment>
                {
                    details
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        coordinates: state.animations.spring,
        headerHeight: state.animations.header.height,
        keyDown: state.events.keyDown,
        activeProduct: state.products.activeProduct,
        products: state.products.products,
        scroll: state.animations.scroll,
        cart: state.products.cart
    }
}
const dispatchToPorps = dispatch => ({
    setActiveProduct: id => dispatch(setActiveProduct(id)),
    addProductToCart: (id, count) => dispatch(addProductToCart(id, count))

})
export default connect(mapStateToProps, dispatchToPorps)(withTheme()(ItemDetails));


    
