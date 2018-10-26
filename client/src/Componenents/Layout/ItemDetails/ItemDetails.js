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
  padding: 2rem 0;  
`;
const FapWrapper = styled.div`
position: fixed;
bottom: 3rem;
right: 3rem;
z-index: 555;
font-weight: bold;
`;

const ProductAvatar = styled.div`
  position: absolute;
 height: 4rem;
 width: 4rem;
 border-radius: 50%;
 top: -2rem;
 display:flex;
 justify-content: center;
 align-items: center;
  z-index: 45;
  .Avatar{
  background-color:#FF6D00;
  width: 98%;
  height: 98%;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  font-size:1.3rem;
  }
`
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
margin-left: auto;
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
                            <Content shadows={theme.shadows}>
                                <div className="container">
                                    <Zoom in={this.state.showContent} UnmountOnExit MountOnEnter timeout={300} mountOnEnter
                                          style={{transitionDelay: this.state.showContent ? 200 : 100}}>
                                        <ProductAvatar>
                                            <Avatar className="Avatar">{brand}</Avatar>
                                        </ProductAvatar>
                                    </Zoom>
                                </div>
                                <Fragment>
                                    {/*<Collapse timeout={100} in={this.state.showContent} mountOnEnter>*/}
                                    <div className="container">
                                        <RateWrapper>
                                            <div>
                                                <Rating rate={80}/>
                                            </div>
                                        </RateWrapper>
                                    </div>
                                    <div className="container">
                                        <Row>
                                            <div className="col-7">
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
                                        </Row>
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


    
