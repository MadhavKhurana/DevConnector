import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({
    name,
    placeholder,
    value,

    error,
    info,
    options,
    onChange
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select
                value={value}
                onChange={onChange}
                className="form-control form-control-lg"
                placeholder={placeholder}
                name={name}
            >
                {selectOptions}
            </select>
            {info && <small className="form-text form-muted">{info}</small>}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectListGroup;
