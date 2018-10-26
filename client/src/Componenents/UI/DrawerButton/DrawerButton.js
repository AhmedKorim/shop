import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Zoom from "@material-ui/core/Zoom/Zoom";
import React from 'react'
import {TOGGLE_DRAWER} from "../../../Store/ActionsTypes";
import {connect} from 'react-redux';

import styled from 'styled-components';

const Button = styled(IconButton)`
&&{
top: ${({headerHeight}) => (headerHeight - 48) / 2}px;
position:fixed;
color: #fff;
left: 40px;
z-index: 9999999!important;
}
`

const DrawerButton = ({toggleDrawer, open, headerHeight}) => {
    return (
        <Button onClick={toggleDrawer} headerHeight={headerHeight}>
            <Zoom in={true} key={open.toString()} timeout={200}>
                <Icon>{open ? 'close' : 'menu'}</Icon>
            </Zoom>
        </Button>
    )
}

const mapStateToProps = state => ({
    open: state.animations.drawer,
    headerHeight: state.animations.header.height
})

const mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch({type: TOGGLE_DRAWER})
})
export default connect(mapStateToProps, mapDispatchToProps)(DrawerButton)