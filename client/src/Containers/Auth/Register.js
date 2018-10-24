import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import FromControl from "../../Componenents/UI/FormControl/FormControl";
import './forms.scss';

class Login extends React.Component {
    state = {
        controllers: {
            name: '',
            email: "",
            password: '',
            password2: ''
        },
        errors: []
    }
    formControllers = [
        {type: 'text', value: '', label: "Name", name: "name"},
        {type: 'text', value: '', label: "Email", name: "email"},
        {type: 'password', value: '', label: "Password", name: "password"},
        {type: 'password', value: '', label: "Confirm Password", name: "password2"},
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
                        <Typography variant="headline">
                            Create account
                        </Typography>
                        <form onSubmit={onSubmitHandler}>
                            <Grid container>
                                {
                                    formControllers.map(controller => <Grid key={controller.name} item xs={12}>
                                        <FromControl payload={{...controller}}
                                                     changeHandler={onChangeHandler}
                                        />
                                    </Grid>)
                                }
                                <Grid item xs={12}>
                                    <Button type="submit" className="submit-button" color="primary" variant="raised">register</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;