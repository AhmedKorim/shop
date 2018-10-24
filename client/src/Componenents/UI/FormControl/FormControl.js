import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from 'prop-types'
import React, {Fragment} from 'react';

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
                          other
                      }) => {
        switch (type) {

            case 'select':
                return <TextField
                    label={label}
                    select
                    {...other}
                    onChange={(e) => changeHandler(e, name)}
                    name={name}
                    required={required}
                    fullWidth
                    value={value || options[0]}
                >
                    {options.map(option => <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>)}
                </TextField>
            default:
                return <TextField
                    label={label}
                    {...other}
                    type={type || "text"}
                    onChange={(e) => changeHandler(e, name)}
                    value={value}
                    name={name}
                    fullWidth
                    inputProps={
                        {className: "material__input-autoHeight"}
                    }
                    required={required}
                />
        }
    };


    render() {
        const {
            props: {
                payload,
                changeHandler,
                ...other
            }, getFromControl
        } = this;

        return (
            <Fragment>
                {getFromControl({...payload, changeHandler: changeHandler, other})}
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
    changeHandler: PropTypes.func.isRequired,
}