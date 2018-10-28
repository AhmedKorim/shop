import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components';
import {removeProductFromCart} from "../../../../Store/ProdcutsActions";
import {connect} from 'react-redux';

const Wrapper = styled(Paper)`
min-height: 5rem;
display:flex;
justify-content: center;
align-items: center;
margin: .3rem 0;
padding: .25rem;
`

const Image = styled.div`
background:#fff url('${({image}) => image}') center center no-repeat ;
background-size: contain;
width: 100%;
height: 100%;
`

const MiniIconButton = styled(IconButton)`
min-width: unset;
min-height:unset;
height: 30px;
width:30px;
padding: 0 !important;
`

const CheckOuTProduct = ({
                             name,
                             brand,
                             image,
                             pId: _id,
                             removeFromCart
                         }) => {
    return (
        <Wrapper elevation={2}>
            <div className="row w-100">
                <div className="col-3">
                    <Image image={window.location.origin + '/' + image} aria-label={name}/>
                </div>
                <div className="col-8 row align-items-center">
                    <div className="col-8">
                        <Typography className="font-weight-bold" variant="subheading">
                            {name}
                        </Typography>
                        <Typography className="font-weight-bold" variant="subheading">
                            {brand}
                        </Typography>
                    </div>
                    <div className="col-4">
                        count manger
                    </div>
                </div>
                <div className="col-1 m-auto">
                    <MiniIconButton color="secondary"
                                    onClick={() => removeFromCart(_id)}
                    ><Icon>remove</Icon></MiniIconButton>
                </div>
            </div>
        </Wrapper>
    )
}
const mapDispatchToProps = dispatch => ({
    removeFromCart: (id) => dispatch(removeProductFromCart(id))
})
export default connect(null, mapDispatchToProps)(CheckOuTProduct);

CheckOuTProduct.propTypes = {
    brand: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string
}