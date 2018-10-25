import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {green} from '@material-ui/core/colors'
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
 width:45px;
 height:45px;
 position: relative;
  .buttonSuccess {
    color: ${({green}) => green[500]} ;
    &:hover {
      color: ${({green}) => green[700]};
    }
  }
  .buttonProgress {
    color: ${({green}) => green[500]};
    position: absolute;
  }`

const ButtonProgress = styled(IconButton)`
width: 40px;
height: 40px;
min-width: unset;
min-height: unset;
position:absolute;
top: 2px;
z-index: 55;
left: 2px;
`
const Loader = styled(CircularProgress)`
position: absolute;
top: 0;
left: 0;
`;
const AsyncIconButton = ({
                             loading,
                             success,
                             mainIcon,
                             successIcon,
                             clickHandler,
                             successVariant
                         }) => {


    let color;

    color = "default"
    if (successVariant) {
        if (loading) {
            color = 'primary'
        }else if (success) {
            color = 'secondary'
        }
    } else {
        if (loading) {
            color = 'primary'
        }
    }
    if(success){
        color = 'secondary'
    }
    return (
        <Wrapper green={green}>
            <ButtonProgress
                color={color}
                className={success && !successVariant ? "buttonSuccess" : ""}
                onClick={clickHandler}
            >
                {success ? <Icon>{successIcon}</Icon> : <Icon>{mainIcon}</Icon>}
            </ButtonProgress>
            {loading && <Loader thickness={3} size={45}/>}
        </Wrapper>
    )
}
export default AsyncIconButton;

AsyncIconButton.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    mainIcon: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
    successIcon: PropTypes.string.isRequired
}