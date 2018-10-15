import {withTheme} from '@material-ui/core';
import Fade from "@material-ui/core/Fade/Fade";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import Hammer from "react-hammerjs";
import {Motion, spring} from "react-motion";
import {withRouter} from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.aside`
padding-top: ${({headerPadding}) => headerPadding}px;
position: fixed;
z-index: 20;
width: ${({width}) => width}px;
height: 100vh;
top: 0;
left: 0;
.bridge{
display: flex;
position: relative;
flex-direction: row;
flex-wrap: wrap;
height: 100%;
width: 100%;
}

display: flex;
flex-direction: row;
flex-wrap: wrap;
background-color:${ ({palette}) => palette.background.default};
box-shadow: ${({shadows, width, dia}) => shadows[Math.ceil((width / dia.maxWidth).toFixed(1) * 20)] };

${EnhancedListItem}{

}
& , &.IconWrapper{
color:${({palette: {text}}) => text.secondary};
}
.selectedEnhancedListItem{
background-color:${props => props.palette.primary.dark} !important;
.IconWrapper{
color:${({palette: {text}}) => text.primary};
}
}
`;
const EnhancedList = styled(List)`
width: 100%;

`;
const EnhancedListItem = styled(ListItem)`
padding:8px !important;
.IconWrapper{
max-width: 40px;
width: 100%;
text-align: center;
.sideBarIcon{
text-align: center;
}
}
.flex-nowrap{
overflow: hidden;
}
.EnhancedItemLabel{
    text-indent: .5rem;
    text-align: left;
    font-weight: 300;
    font-size: .82rem;
text-transform: uppercase !important;
}
`;

class ExpandedSideBar extends React.Component {
    state = {
        expanded: false,
    }

    config = {stiffness: 400, damping: 20}

    onChangeExpansion = (expanded, e) => {
        if (e || !(e || {key: ''}.key) === "Enter") return;
        this.setState({expanded})
    }
    onNavigateTo = (target) => {
        this.props.history.push("/admin_area/" + target)
    }

    componentWillUpdate(nextProps) {
        this.activePath = nextProps.location.pathname.substring(nextProps.location.pathname.lastIndexOf("/") + 1);
    }

    handelSwipe = (e) => {
        const expanded = e.velocityX > 0;
        if (this.state.expanded === expanded) return;
        this.setState({expanded});
    }

    getEnhancedList = (links, onNavigateTo, style, activePath, onChangeExpansion) => {
        return <EnhancedList component="ul">
            {
                links && links.map(({path, icon, name}) => {
                    path = path || name.replace(/ /g, '_');
                    const tooltipVis = style.width > 180;
                    return (
                        <EnhancedListItem component="li" button onClick={() => onNavigateTo(path)}
                                          onKeyDown={e => onChangeExpansion(path, e)}
                                          selected={path === activePath}
                                          classes={{
                                              selected: 'selectedEnhancedListItem'
                                          }}
                        >
                            <Grid container alignItems="stretch" justify="flex-start" className="flex-nowrap">
                                <Grid item xs className="IconWrapper">
                                    <Icon className="sideBarIcon">{icon}</Icon>
                                </Grid>
                                {/* TODO : configure this out to the max width value*/}
                                <Fade in={style.width >= 180} unmountOnExit mountOnEnter timeout={style.width >= 180 ? 300 : 10}>
                                    < Grid item xs container alignItems="center">
                                        <Typography component="div" className="EnhancedItemLabel">{name}</Typography>
                                    </Grid>
                                </Fade>
                            </Grid>
                        </EnhancedListItem>
                    )

                })
            }
        </EnhancedList>

    }


    render() {
        let {
            theme: {palette, shadows},
            dia,
            headerPadding,
            links,
            bottomLinks,
            isMobile

        } = this.props;
        dia = dia || {minWidth: 80, maxWidth: 240};
        headerPadding = headerPadding || 0;
        const {onChangeExpansion, config, onNavigateTo, activePath, handelSwipe} = this;
        return (
            <Motion
                defaultStyle={{
                    width: dia.minWidth,
                }}
                style={{
                    width: spring((this.state.expanded ? dia.maxWidth : dia.minWidth), config)
                }}>
                {(style) =>
                    <Wrapper palette={palette} shadows={shadows} {...style} headerPadding={headerPadding} dia={dia}
                    >
                        {isMobile ? <Hammer
                                onSwipe={handelSwipe}
                                options={{
                                    recognizers: {
                                        swipe: {enable: true}
                                    }
                                }}>
                                <div className="bridge">
                                    {this.getEnhancedList(links, onNavigateTo, style, activePath, onChangeExpansion)}
                                    <div className="align-self-end w-100">
                                        {this.getEnhancedList(bottomLinks, onNavigateTo, style, activePath, onChangeExpansion)}
                                    </div>
                                </div>
                            </Hammer> :
                            <div className="bridge"
                                 onMouseOver={_ => onChangeExpansion(true)}
                                 onMouseLeave={_ => onChangeExpansion(false)}
                            >
                                {this.getEnhancedList(links, onNavigateTo, style, activePath, onChangeExpansion)}
                                <div className="align-self-end w-100">
                                    {this.getEnhancedList(bottomLinks, onNavigateTo, style, activePath, onChangeExpansion)}
                                </div>
                            </div>

                        }
                    </Wrapper>
                }
            </Motion>
        )
    }
}

export default withRouter(withTheme()(ExpandedSideBar));

ExpandedSideBar.propTypes = {
    dia: PropTypes.shape({
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number
    }),
    headerPadding: PropTypes.number,
    links: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        path: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    bottomLinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        path: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    isMobile: PropTypes.bool.isRequired,

}