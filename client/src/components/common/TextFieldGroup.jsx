import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled,
    required
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="form-control form-control-lg"
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                required={required}
            />
            {info && <small className="form-text form-muted">{info}</small>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup;
