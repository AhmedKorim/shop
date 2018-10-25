import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/Divider/Divider";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {logout} from "../../../Store/userAction";
import './UserWidget.scss';

const UserWidget = props => {
    const {
        user,
        logout
    } = props;

    const HIText = user ? `Welcome ${user.name}` : 'Login now'
    return (
        <div className="userWidget">
            <Grid container justify="center">
                <Grid item xs={12}>
                    <header>
                        <Grid container justify="center" alignItems="center" className="noWrapper">
                            <Grid item xs={3}>
                                <Avatar className="UserWidgetAvatar"
                                >{user ? (user.name).trim().slice(0, 2).toUpperCase() : "AN"}</Avatar>
                            </Grid>
                            <Grid item container alignItems="center" justify="center" xs={7} className="userMetaData">
                                <Grid item xs={12}><Typography className="typo1">{user ? user.name : "Anonymous"}</Typography></Grid>
                                <Grid item xs><Tooltip title={HIText}><Typography className="typo2">{HIText}</Typography></Tooltip></Grid>
                            </Grid>
                            <Grid item xs>
                                <Button className="smallButton" size="small"><Icon>settings</Icon></Button>
                            </Grid>
                        </Grid>
                    </header>
                    <Divider/>
                </Grid>
                <Grid item xs>
                    <div>
                        <List component="ul" className="userListItem">
                            <ListItem component="li" button className="userListItem" onClick={() => props.history.push('/admin_area')}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item xs={4}>
                                        <div><Icon className="iconCol">security</Icon></div>
                                    </Grid>
                                    <Grid item xs><Typography className="typo2">Admin Area</Typography></Grid>
                                </Grid>
                            </ListItem>
                            {!user ? <ListItem component="li" button className="userListItem" onClick={() => props.history.push('/auth/login')}>
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={4}>
                                            <div><Icon className="iconCol">lock</Icon></div>
                                        </Grid>
                                        <Grid item xs><Typography className="typo2"
                                        > Log In</Typography></Grid>
                                    </Grid>
                                    <Divider/>
                                </ListItem> :
                                <ListItem component="li" button className="userListItem" onClick={logout}>
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={4}>
                                            <div><Icon className="iconCol">power_settings_new</Icon></div>
                                        </Grid>
                                        <Grid item xs><Typography className="typo2"> Log Out</Typography></Grid>
                                    </Grid>
                                </ListItem>}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};
const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logout: _ => dispatch(logout())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserWidget));