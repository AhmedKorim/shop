import PropTypes from 'prop-types'
import {ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {connect} from 'react-redux';

const LinkItem = styled(ListItem)`
width: 100%;
`
const LinkText = styled(Typography)`
&&{
font-weight: bold !important;
text-align: center;
color: #fff;
display:block;
width: 100%;
text-transform:uppercase;
}
`

class NavigationLinkItem extends Component {
    render() {
        const {
            push,
            match,
            label,
            target,
            pathname

        } = this.props;

        return (
            <LinkItem
                button
                onClick={() => {
                    push(target)
                }}
                selected={pathname.indexOf(target) > -1}
            >
                <LinkText component="span">
                    {label}
                </LinkText>
            </LinkItem>
        )
    }
}


export default NavigationLinkItem

NavigationLinkItem.propTypes = {
    push: PropTypes.func,
    target: PropTypes.string,
    label: PropTypes.string,
    pathname: PropTypes.string,

}