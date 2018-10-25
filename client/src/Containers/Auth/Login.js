import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import FromControl from "../../Componenents/UI/FormControl/FormControl";
import {login} from "../../Store/userAction";
import './forms.scss';

class Login extends React.Component {
    state = {
        controllers: {
            email: "",
            password: '',
        },
        errors: []
    }
    formControllers = [
        {type: 'text', value: '', label: "Email", name: "email"},
        {type: 'password', value: '', label: "Password", name: "password"},
    ]

    onChangeHandler = ({target: {value}}, name) => {
        // change data on the sourse
        this.formControllers = this.formControllers.map(controller => {
            if (controller.name !== name) return controller;
            return {
                ...controller,
                value: value
            }
        })

        // update state controllers
        this.setState({
            ...this.state,
            controllers: {
                ...this.state.controllers,
                [name]: value
            }
        })
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.login(this.state.controllers, this.props.history)
    }

    render() {
        const {
            formControllers,
            onChangeHandler,
            onSubmitHandler
        } = this;
        return (
            <div className="container auth">
                <div className="row">
                    <div className="col col-md-6 mx-auto">
                        <form onSubmit={onSubmitHandler}>
                            <Typography variant="headline">
                                Login
                            </Typography>
                            <Grid container>
                                {
                                    formControllers.map(controller => <Grid key={controller.name} item xs={12}>
                                        <FromControl payload={{...controller}}
                                                     changeHandler={onChangeHandler}
                                                     fullWidth
                                                     helperText="shit"
                                                     margin='normal'
                                                     variant="outlined"
                                        />
                                    </Grid>)
                                }
                                <Grid item xs={12}>
                                    <Button type="submit" className="submit-button" color="primary" variant="raised">login</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    login: (userData,history) => dispatch(login(userData,history))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));