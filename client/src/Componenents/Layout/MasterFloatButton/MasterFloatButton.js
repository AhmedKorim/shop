import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import {withTheme} from "@material-ui/core";
import React from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';

const Wrapper = styled.div`
position: fixed;
bottom: 2rem;
right: 2rem;
z-index: 55555;
.universalFab{
font-weight: bold;

background-color:${({styling, buttonColor}) => buttonColor ? buttonColor.main : styling.primary.main};
&:hover{
background-color:${({styling, buttonColor}) => buttonColor ? buttonColor.dark : styling.primary.main};

}
}
`

class MasterFloatButton extends React.Component {


    render() {
        console.log(this.props);
        const {
            fabState: {action, tip, color, key, mount, icon},
            theme: {palette}

        } = this.props;
        return (
            <Tooltip title={tip}>
                <Wrapper styling={palette} buttonColor={color}>
                    <Zoom in={mount} key={key} timeout={500} style={{transitionDelay: mount ? 120 : 0}} unmountOnExit mountOnEnter>
                        <Button variant="fab" color="primary" onClick={() => action && action()} className="universalFab">
                            <Icon>{icon}</Icon>
                        </Button>
                    </Zoom>
                </Wrapper>
            </Tooltip>


        )
    }
}

const mapStateToProps = state => {
    return {
        fabState: state.theme.universalFab

    }
}
export default connect(mapStateToProps)(withTheme()(MasterFloatButton));