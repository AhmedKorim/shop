import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react'

class CheckoutInfo extends Component {
    render() {
        return (
            <div>
                <Typography>
                    you have items in cart this cast you
                </Typography>
                <Button variant="raised">
                    checkout now
                </Button>
            </div>
        )
    }
}

export default CheckoutInfo