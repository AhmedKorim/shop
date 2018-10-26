import AppBar from "@material-ui/core/AppBar/AppBar";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from 'react'
import {connect} from 'react-redux';
import {TOGGLE_DRAWER} from "../../../Store/ActionsTypes";
import Navigation from "../../Layout/Navigation/Navigation";


const SideDrawer = ({open, toggleDrawer, pathname}) => {
    return (
        <Drawer open={open}
                anchor="left"
                PaperProps={{
                    classes: {
                        root: 'MainDrawerPaper'
                    }
                }}
                ModalProps={{
                    onEscapeKeyDown: toggleDrawer,
                    onBackdropClick: toggleDrawer,
                }
                }
        >
            <AppBar color="primary" component='div' position="static">
                <Toolbar component="div">
                </Toolbar>
            </AppBar>
            <Navigation
                dir="y"
                dark
            />
        </Drawer>
    )
}

const mapStateToProps = state => ({
    open: state.animations.drawer,
})
const mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch({type: TOGGLE_DRAWER})
})
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer)