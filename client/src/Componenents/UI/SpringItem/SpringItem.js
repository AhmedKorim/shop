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

    render() {
        const confg = {stiffness: 600, damping: 30, precision: 1};
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
                            img={this.props.image}
                        >
                        </Cover>
                    )
                }
            </Motion>
        )
    }
}

export default withRouter(SpringItem);