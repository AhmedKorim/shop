import PropTypes from 'prop-types'
import {List} from "@material-ui/core";
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import styled from 'styled-components';
import NavigationLinkItem from './NavigatinListItem';

const EnhanceList = styled(List)`
display:flex;
width: 100%;
justify-content: flex-end;
align-items: center;
flex-direction: ${({flexDirection}) => flexDirection};
padding: 0;
margin: 0 auto;
`

class NavigationList extends Component {
    render() {
        let {
            direction,
            links,
            history,
            pathname,
            dark
        } = this.props;
        return (
            <EnhanceList
                flexDirection={direction === 'x' ? 'row' : 'column'}
            >
                {
                    links.map(({label, target}) => <NavigationLinkItem
                        compact={direction === "x"}
                        label={label}
                        target={target}
                        pathname={pathname}
                        key={label}
                        dark={dark}
                        push={history.push}
                    />)
                }
            </EnhanceList>
        )
    }
}

export default withRouter(NavigationList)

NavigationList.propTypes = {
    direction: PropTypes.oneOf(['x', 'y']).isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        pathname: PropTypes.string,
        target: PropTypes.target,
    })).isRequired
}