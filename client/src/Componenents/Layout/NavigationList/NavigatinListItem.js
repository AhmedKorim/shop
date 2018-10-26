import {ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from "styled-components";

const LinkItem = styled(ListItem)`
&&{width: 100%;
span${LinkText}{
  color:${({dark}) => dark ? '#424242' : '#d2d2d2' }
}
&.selectedItem{
span${LinkText}{
  color:${({dark}) => dark ? '#131313' : '#ffffff' }

}
}
padding: 0.5rem .8rem !important;
max-width: ${({maxWidth}) => maxWidth};}
`
const LinkText = styled(Typography)`
&&{
font-weight: bold !important;
text-align: center;
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
            pathname,
            compact,
            dark

        } = this.props;

        return (
            <LinkItem
                button
                dark={dark}
                maxWidth={compact ? "200px" : '100%'}
                onClick={() => {
                    push(target)
                }}
                selected={pathname.indexOf(target) > -1}
                classes={{selected: "selectedItem"}}
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