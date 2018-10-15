import {createMuiTheme} from "@material-ui/core";
import {pink} from "@material-ui/core/colors";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styled from 'styled-components';
import {setHeaderColor, setMainColor, universalFab} from "../../../Store/ActionsTypes";
import ExpandedSideBar from "../../UI/ExpandedSideBar/ExpandedSideBar";
import DashboardHome from "./DashboardHome/DashboardHome";
import DashBoardStore from "./DashboardStore/DashBoardStore";

const Heading = styled.h1`
text-align: center;
display:block;
width: 100%;
position: absolute;
top: 0;
left: 0;

`

const Wrapper = styled.div`
padding: 1rem;
`
const themeMeta = {
    shape: {
        borderRadius: .4
    },
    palette: {
        type: "dark",
        primary: {
            main: pink[500],
            light: pink[400],
            dark: pink.A700
        },
        background: {
            default: "#2E2E2E",
        },
    },
    props: {
        backgrounds: {
            deepDark: "#252525"
        }
    }
}
const theme = createMuiTheme(themeMeta);


class Dashboard extends React.Component {


    componentDidMount() {
        this.props.setHeaderColor(themeMeta.palette.background.default);
        this.props.setMainColor(themeMeta.props.backgrounds.deepDark);
        const activePath = this.props.location.pathname.replace(/\/admin_area\//g, "");
        this.props.mangeFab(this.getFabConfig(activePath));
    }

    componentWillUnmount() {
        this.props.setHeaderColor(null)

    }

    getFabConfig = (activePath) => {
        switch (activePath) {
            case'home':
                return {
                    mount: true,
                    tip: 'View Watches',
                    color: {...themeMeta.palette.primary},
                    icon: "remove_red_eye"
                }
            case"store":
                return {
                    mount: true,
                    tip: 'Add new Product',
                    color: {...themeMeta.palette.primary},
                    icon: "add"
                }
            case"admins":
                return {
                    mount: true,
                    tip: 'mange privileges',
                    color: {...themeMeta.palette.primary},
                    icon: "security"
                }
            case"plans":
                return {
                    mount: true,
                    tip: 'Add New Events',
                    color: {...themeMeta.palette.primary},
                    icon: "edit"
                }
            case"statistics":
                return {
                    mount: true,
                    tip: 'print',
                    color: {...themeMeta.palette.primary},
                    icon: "print"
                }
            default:
                return false
        }

    }


    componentWillUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const activePath = nextProps.location.pathname.replace(/\/admin_area\//g, "");
            this.props.mangeFab(this.getFabConfig(activePath));
        }

    }

    render() {
        const {
            headerHeight,
            isMobile
        } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Fragment>
                    <ExpandedSideBar
                        headerPadding={headerHeight}
                        dia={{maxWidth: 200, minWidth: 60}}
                        links={[
                            {icon: 'home', name: 'home'},
                            {icon: 'trending_up', name: 'statistics'},
                            {icon: 'store', name: 'store'},
                            {icon: 'date_range', name: 'plans'},
                            {icon: 'security', name: 'admins'},
                        ]}
                        bottomLinks={[
                            {icon: 'message', name: 'support'},
                            {icon: 'payment', name: 'payment'},
                            {icon: 'settings', name: 'settings'},
                        ]}
                        isMobile={isMobile}
                    />
                    <Wrapper>
                        <Route
                            path="/admin_area"
                            exact
                            render={_ => <Redirect to={'/admin_area/home'}/>}/>
                        <Route
                            path="/admin_area/:section"
                            render={({location}) => <TransitionGroup>
                                <CSSTransition classNames="fading" timeout={300} key={location.pathname}>
                                    <Switch location={location}>
                                        <Route path="/admin_area/home" render={_ => <DashboardHome/>}/>
                                        <Route path="/admin_area/statistics" render={_ => <Heading>statistics</Heading>}/>
                                        <Route path="/admin_area/store" render={_ => <DashBoardStore/>}/>
                                        <Route path="/admin_area/plans" render={_ => <Heading>plans</Heading>}/>
                                        <Route path="/admin_area/security" render={_ => <Heading>security</Heading>}/>
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>}
                        />
                    </Wrapper>
                </Fragment>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    headerHeight: state.animations.header.height,
    isMobile: state.theme.isMobile
})
const mapDispatchToProps = dispatch => {
    return {
        setHeaderColor: (color) => dispatch(setHeaderColor(color)),
        setMainColor: (color) => dispatch(setMainColor(color)),
        mangeFab: (config) => dispatch(universalFab(config))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
