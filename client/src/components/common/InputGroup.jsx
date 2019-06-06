import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
    name,
    placeholder,
    value,
    icon,
    error,
    required,
    type,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
                value={value}
                onChange={onChange}
                className="form-control form-control-lg"
                placeholder={placeholder}
                name={name}
                required={required}
            />
            
        </div>
    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,

    onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: "text"
};

export default InputGroup;
