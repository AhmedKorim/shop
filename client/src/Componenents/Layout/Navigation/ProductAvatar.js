import PropTypes from 'prop-types'
import Avatar from "@material-ui/core/Avatar/Avatar";
import React from 'react'
import styled from "styled-components";

const ItemAvatar = styled.div`
  position: absolute;
 height: 4rem;
 width: 4rem;
 border-radius: 50%;
 top: -2rem;
 display:flex;
 justify-content: center;
 align-items: center;
  z-index: 45;
  .Avatar{
  background-color:#FF6D00;
  width: 98%;
  height: 98%;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  font-size:1.3rem;
  }
`



/*
*
*
*
*
* */

const ProductAvatar = ({text}) => {
    return (
        <ItemAvatar>
            <Avatar className="Avatar">{text.trim().slice(0, 2)}</Avatar>
        </ItemAvatar>
    )
}
export default ProductAvatar

ProductAvatar.propTypes = {
    text: PropTypes.string.isRequired
}
