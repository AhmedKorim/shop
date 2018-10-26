import {withTheme, withWidth} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React, {Fragment} from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {getHeaderConfig} from "../../../Store/ActionsTypes";
import ProudctList from "../../UI/List/List";
import EnhancedMenu from "../../UI/Menu/EnhancedMenu";
import UserWidget from "../../UI/UserWidget/UserWidget";
import Navigation from "../Navigation/Navigation";

const AppHeader = styled(AppBar)`
position:relative !important;
z-index: 1250 !important;
background-color:${({theme, headerColor}) => headerColor || theme.palette.primary.main} !important;
box-shadow: ${({theme: {shadows}}) => shadows[3]} !important;

`

class MainHeader extends React.Component {
    updataHeader = () => {
        if (this.$header) {
            this.props.setHeaderHeight(this.$header.offsetHeight)
        }
    }


    componentDidMount() {
        window.addEventListener('resize', this.updataHeader)
        this.updataHeader();
    }

    render() {
        const {width} = this.props;
        return (
            <header ref={node => this.$header = node}>
                <AppHeader component="div" position="relative" theme={this.props.theme} headerColor={this.props.headerColor}>
                    <Toolbar>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    {!(width === 'xs' || width === 'sm') &&
                                    <Navigation
                                        dir="x"
                                    />}
                                </div>
                                <div className="col-md-4 col-sm-12 d-flex">
                                    <div className="ml-auto d-flex">
                                        <EnhancedMenu
                                            icon="shopping_cart"
                                            placement="bottom-end"
                                            floatLeft
                                            tip="notifications">
                                            <ProudctList/>
                                        </EnhancedMenu>
                                        <EnhancedMenu
                                            icon="account_circle"
                                            placement="bottom-end"
                                            floatLeft
                                            tip="notifications">
                                            <UserWidget/>
                                        </EnhancedMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppHeader>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setHeaderHeight: (height) => dispatch(getHeaderConfig({height}))
    }
}
const mapStateToProps = state => ({
    headerColor: state.animations.header.color,

})
export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withTheme()(MainHeader)));