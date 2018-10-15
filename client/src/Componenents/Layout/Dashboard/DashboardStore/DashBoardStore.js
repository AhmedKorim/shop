import Grid from "@material-ui/core/Grid/Grid";
import React from 'react';
import styled from "styled-components";
import Container from "../Container/Container";


const Wrapper = styled.section`
display: flex;
`
const EnhancedGrid = styled(Grid)`
margin: .4rem;
`;

class DashBoardStore extends React.Component {


    render() {
        return (
            <Wrapper>
                <Container>
                </Container>
            </Wrapper>
        )
    }
}

export default DashBoardStore;