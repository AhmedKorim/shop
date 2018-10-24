import {withTheme} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {getHeaderConfig} from "../../../Store/ActionsTypes";
import ProudctList from "../../UI/List/List";
import EnhancedMenu from "../../UI/Menu/EnhancedMenu";
import UserWidget from "../../UI/UserWidget/UserWidget";

const AppHeader = styled(AppBar)`
position:relative !important;
z-index: 9999 !important;
background-color:${({theme,headerColor}) => headerColor || theme.palette.primary.main} !important;
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
                                </div>
                                <div className="col-md-4 col-sm-12 d-flex">
                                    <div className="ml-auto d-flex">
                                        <EnhancedMenu
                                            icon="shopping_cart"
                                            placement="bottom-end"
                                            floatLeft
                                            tip="notifications">
                                            <ProudctList
                                                listItems={[
                                                    {
                                                        name: 'name',
                                                        image: '//via.placeholder.com/300',
                                                        price: '100',
                                                        id: 'img1'
                                                    }, {
                                                        name: 'name',
                                                        image: '//via.placeholder.com/300',
                                                        price: '100',
                                                        id: 'img2'
                                                    }, {
                                                        name: 'name',
                                                        image: '//via.placeholder.com/300',
                                                        price: '100',
                                                        id: 'img3'
                                                    }, {
                                                        name: 'name',
                                                        image: '//via.placeholder.com/300',
                                                        price: '100',
                                                        id: 'img4'
                                                    },
                                                ]}
                                            />
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
    headerColor: state.animations.header.color
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(MainHeader));