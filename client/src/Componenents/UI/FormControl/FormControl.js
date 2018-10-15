import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styled from 'styled-components';

const StyledController = styled(TextField)`
width: 100%;
`

class FromControl extends React.Component {
    getFromControl = ({
                          type,
                          value,
                          label,
                          required,
                          placeholder,
                          name,
                          options = [],
                          multiline = false,
                          changeHandler,


                      }) => {
        switch (type) {

            case 'select':
                return <StyledController
                    label={label}
                    select
                    onChange={(e) => changeHandler(e, name)}
                    name={name}
                    required={required}
                    value={value || options[0]}
                >
                    {options.map(option => <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>)}
                </StyledController>
            default:
                return <StyledController
                    label={label}
                    type={type || "text"}
                    onChange={(e) => changeHandler(e, name)}
                    value={value}
                    name={name}
                    required={required}
                />
        }
    };


    render() {
        const {
            props: {
                payload,
                changeHandler
            }, getFromControl
        } = this;

        return (
            <Fragment>
                {getFromControl({...payload, changeHandler: changeHandler})}
            </Fragment>
        )
    }
}

export default FromControl;

FromControl.propTypes = {
    payload: PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
        required: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        options: PropTypes.string,
        multiline: PropTypes.string,
    }).isRequired,
    changeHandler: PropTypes.func.isRequired
}