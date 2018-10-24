import Button from "@material-ui/core/Button/Button";
import Fade from "@material-ui/core/Fade/Fade";
import Grow from "@material-ui/core/Grow/Grow";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component, Fragment} from 'react'
import './forms.scss'
import Login from "./Login";
import Register from "./Register";

class Auth extends Component {
    state = {
        form: "login"
    }
    navigateForms = (form) => {
        this.props.history.push('/auth/' + form)
    }

    componentDidMount() {
        const form = (this.props.match.params.form || 'login').toLowerCase();
        this.setState({form})
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.match.form !== this.state.form) {
            const form = (nextProps.match.params.form || 'login').toLowerCase();
            this.setState({form})
        }
    }

    render() {
        return (
            <div className="auth-component">
                <div className="container">
                    <Typography>
                        {
                            this.state.form === 'login' ?
                                <Fragment>Don't hav an account ? <Button
                                    onClick={() => this.navigateForms('register')}
                                    variant="text">create</Button></Fragment>
                                : <Button variant="text" onClick={() => this.navigateForms('login')}>Login now</Button>
                        }
                    </Typography>
                </div>
                <div className="form-Wrapper">
                    <div className="form-item">
                        <Grow timeout={200} unmountOnExit MountOnEnter in={this.state.form === 'login'}>
                            <Fade timeout={300} unmountOnExit MountOnEnter in={this.state.form}
                                  style={{transitionDelay: this.state.form === "login" ? 200 : 0}}>
                                <Login/>
                            </Fade>
                        </Grow>
                    </div>
                    <div className="form-item">
                        <Grow timeout={200} unmountOnExit MountOnEnter in={this.state.form === 'register'}>
                            <Fade timeout={300} unmountOnExit MountOnEnter in={this.state.form}
                                  style={{transitionDelay: this.state.form === "register" ? 200 : 0}}>
                                <Register/>
                            </Fade>
                        </Grow>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth