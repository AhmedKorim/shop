import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import React from 'react';
import {Motion, spring} from 'react-motion';
import {withRouter} from "react-router-dom";
import styled from 'styled-components';

const Cover = styled.div`
position: fixed;
background: url(${props => props.img}) no-repeat center center;
background-size: contain ;
top:${props => props.y}px;
left:${props => props.x}px;
width:${props => props.width}px;
height:${props => {
    if (props.height > 300) {
        props.fire()
    }
    return props.height
}}px;

`;
const SButton = styled(Button)`
position:relative;
top: 1rem;
left:15%;
color: #000;
`

class SpringItem extends React.Component {
    state = {
        showContent: false,
        fired: false
    };
    fire = () => {
        this.props.fire();
    }


    componentDidMount() {
        setTimeout(() => {
                this.setState({showContent: true});

            }, 1000
        )
    }

    goBack = () => {
        this.props.close();
    }


    render() {
        const confg = {stiffness: 500, damping: 40};
        const {
            startingX,
            startingY,
            startingWidth,
            startingHeight,
            endingX,
            endingY,
            endingWidth,
            endingHeight,
        } = this.props;
        const {goBack} = this;
        return (
            <Motion
                defaultStyle={
                    {
                        x: startingX,
                        y: startingY,
                        width: startingWidth,
                        height: startingHeight,
                    }
                }
                style={{
                    x: spring(endingX, confg),
                    y: spring(endingY, confg),
                    width: spring(endingWidth, confg),
                    height: spring(endingHeight, confg),
                }}
            >
                {
                    style => (
                        <Cover
                            x={style.x}
                            y={style.y}
                            width={style.width}
                            height={style.height}
                            fire={this.fire}
                            img="http://www.bikesdirect.com/products/motobecane/images/elite_sport_silver_2100.jpg"
                        >
                            <Tooltip title="go back">
                                <SButton onClick={goBack}><Icon>keyboard_backspace</Icon></SButton>
                            </Tooltip>
                        </Cover>
                    )
                }
            </Motion>
        )
    }
}

export default withRouter(SpringItem);