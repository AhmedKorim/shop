import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import React, {Fragment} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ProductEditor from "../../Componenents/Layout/ProdcutEditor/ProductEditor";
import DataTable from "../../Componenents/UI/DataTable/DataTable";
import styled from 'styled-components';

const Wrapper = styled.div`
max-width: 1200px;
margin: auto;
`
const FapWrapper = styled.div`
position:fixed;
bottom: 2rem;
right: 2rem;
z-index: 234;
display:flex;
justify-content: center;
align-items: center;
`

class AdminDashboard extends React.Component {
    base = this.props.match.url

    render() {
        console.log(this.props.match);
        return (
            <Fragment>
                <Wrapper>
                    <Grid container>
                        <Route
                            path="/"
                            render={({location}) => <Fragment>
                                <Grid item xs>
                                    <TransitionGroup>
                                        <CSSTransition classNames="fade" timeout={300} key={location.pathname}>
                                            <Switch location={location}>
                                                <Route
                                                    path={this.base + "/products/:id"}
                                                    component={ProductEditor}
                                                />
                                                <Route
                                                    path={this.base + "/products"}
                                                    render={() => <DataTable
                                                        labels={["Name", "Price", "Rate", "Sales"]}
                                                        action={(item) => <Grid container justify="center">
                                                            <Grid><Button color="primary" variant="fab" mini><Icon>edit</Icon></Button></Grid>
                                                            <Grid><Button color="default" variant="fab" mini><Icon>remove_red_eye</Icon></Button></Grid>
                                                        </Grid>}
                                                        data={[{name: "adfad", price: 213e4, rate: 23, sales: 23, id: 2342341}]}
                                                    />}
                                                />
                                            </Switch>
                                        </CSSTransition>
                                    </TransitionGroup>
                                </Grid>
                            </Fragment>}
                        />
                    </Grid>
                </Wrapper>
                <FapWrapper>
                    <Tooltip title="add new product">
                        <Button variant="fab" color="primary" component={Link} to="/Admin_area/products/new/sajdkf"><Icon>add</Icon></Button>
                    </Tooltip>
                </FapWrapper>
            </Fragment>

        )
    }
}

export default AdminDashboard;