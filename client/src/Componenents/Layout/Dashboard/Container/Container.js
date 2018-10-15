import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
width: 100%;
`

const Content = styled.div`
margin-left: 80px;
width: 100%;
`;
const Container = props => {


    return (
        <Wrapper>
            <Content>
                {props.children}
            </Content>
        </Wrapper>
    )
}
export default Container

