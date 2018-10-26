import {withTheme} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {getHeaderConfig} from "../../../Store/ActionsTypes";
import ProudctList from "../../UI/List/List";
import EnhancedMenu from "../../UI/Menu/EnhancedMenu";
import UserWidget from "../../UI/UserWidget/UserWidget";
import NavigationList from "../NavigationList/NavigatinList";

const AppHeader = styled(AppBar)`
position:relative !important;
z-index: 9999 !important;
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
        return (
            <header ref={node => this.$header = node}>
                <AppHeader component="div" position="relative" theme={this.props.theme} headerColor={this.props.headerColor}>
                    <Toolbar>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <NavigationList
                                        direction="y"
                                        pathname={this.props.pathname}
                                        links={[
                                            {
                                                label: 'products',
                                                target: '/products'
                                            },
                                            {
                                                label: 'admin area',
                                                target: '/admin_area'
                                            }
                                        ]}/>
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
    pathname: state.router.history.location.pathname

})
export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(MainHeader));