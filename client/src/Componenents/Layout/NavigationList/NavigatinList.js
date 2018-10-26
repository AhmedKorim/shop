import PropTypes from 'prop-types'
import {List} from "@material-ui/core";
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import styled from 'styled-components';
import NavigationLinkItem from './NavigatinListItem';

const EnhanceList = styled(List)`
display:flex;
width: 100%;
justify-content: center;
align-items: center;
padding: 0;
margin: 0;
`

class NavigationList extends Component {
    render() {
        let {
            direction,
            links,
            history,
            pathname
        } = this.props;
        return (
            <EnhanceList
            >
                {
                    links.map(({label, target}) => <NavigationLinkItem
                        label={label}
                        target={target}
                        pathname={pathname}
                        key={label}
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