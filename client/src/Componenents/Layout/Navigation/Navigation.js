import PropTypes from 'prop-types'
import React from 'react'
import NavigationList from "../NavigationList/NavigatinList";
import {connect} from 'react-redux';

const Navigation = ({dir, dark,pathname}) => {
    return (
        <NavigationList
            direction={dir}
            dark={dark}
            pathname={pathname}
            links={[
                {
                    label: 'products',
                    target: '/products'
                },
                {
                    label: 'compared',
                    target: '/compared'
                },
                {
                    label: 'wish list',
                    target: '/wish_list'
                },
                {
                    label: 'checkout',
                    target: '/checkout'
                }
            ]}/>
    )
}
const mapStateToProps = state => ({
    pathname: state.router.history.location.pathname
})
export default connect(mapStateToProps)(Navigation)

Navigation.propTypes = {
  dark: PropTypes.bool,
  dir: PropTypes.string,
  pathname: PropTypes.string
}