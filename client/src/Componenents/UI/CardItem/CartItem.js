import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react'
import Hammer from "react-hammerjs";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styled from 'styled-components';
import {getSpringCoordinates} from "../../../Store/ActionsTypes";

const Wrapper = styled.div`
  max-width:250px;
  min-width: 200px;
`;
const Image = styled.div`
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
    printLocation = (e) => {
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
        this.props.history.push('/products/details')

    };

    render() {
        const {
            props: {},
            printLocation,
        } = this;
        return (

                <div>
                    <Wrapper onClick={printLocation} innerRef={node => this.wrapper = node}>
                        <Paper elevation={1}>
                            <Image source="http://www.bikesdirect.com/products/motobecane/images/elite_sport_silver_2100.jpg">
                                <div></div>
                            </Image>
                            <Body>
                            <TextWrapper>
                                product name
                            </TextWrapper>
                            <Price>
                                <Grid container alignItems="center">
                                    <Grid item xs={4} className="priceWrapper">
                                        100$
                                    </Grid>
                                    <Grid item className="margin-left">
                                        <IconButton className="action-button" color="primary"><Icon>add_shopping_cart</Icon></IconButton>
                                        <IconButton className="action-button"><Icon>favorite</Icon></IconButton>
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
        updatedSpringCoordinates: (coordinates) => dispatch(getSpringCoordinates(coordinates))
    }
}

export default withRouter(connect(null, mapDispatchToPros)(CartItem));