import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
position:relative;
width: 100%;
align-items: center;
background-color:${({theme}) => theme.palette.background.default};
flex-wrap: ${({wrap}) => wrap};
box-shadow: ${props => props.theme.shadows[10]};
transition:box-shadow .4s ease-in-out;
padding: ${ ({disablePadding}) => disablePadding ? "0" : "1rem 0"};
&:hover{
box-shadow: ${props => props.theme.shadows[22]};

}
`
const FabWrapper = styled.div`
position:absolute;
bottom: .5rem;
right: .5rem;
z-index: 89;
`
const ChardWrapper = styled.div`
  width:100%;
  height: 70%;
`;
const StatisticsCard = props => {
    let {styling, chart, disablePadding, action} = props;
    return (
        <Wrapper theme={styling} disablePadding={disablePadding}>
            {chart && <ChardWrapper>
                {chart()}
            </ChardWrapper>
            }
            {props.children}
            {(action || {}).func && <FabWrapper>
                <Tooltip title={action.tip || "add"}>
                    <Button variant="fab" color="primary" mini onClick={action.func}><Icon>{action.icon || 'add'}</Icon></Button>
                </Tooltip>
            </FabWrapper>}
        </Wrapper>
    )
}
export default StatisticsCard

StatisticsCard.propTypes = {
    action: PropTypes.any,
    chart: PropTypes.func,
    children: PropTypes.any.isRequired,
    disablePadding: PropTypes.any,
    styling: PropTypes.object.isRequired
}