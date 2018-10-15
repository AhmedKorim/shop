import React from 'react';
import styled from 'styled-components';
import CartItem from "../../Componenents/UI/CardItem/CartItem";

const Wrapper = styled.section`
width:90%;
margin:auto;
display: flex;
justify-content: center;
flex-wrap: wrap;

`;
const GridItem = styled.div`
padding: .3rem;
`

class ProductsWrapper extends React.Component {
    render() {
        return (

            <Wrapper>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map(i => <GridItem><CartItem/></GridItem>)
                }
            </Wrapper>

        )
    }
}

export default ProductsWrapper;