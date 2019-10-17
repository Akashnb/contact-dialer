import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import './render-input.scss';

const RenderInput = ({
  input, name, placeholder, type, className, meta: { touched, error }, readonly,
}) => (
  <>
    <Input
      name={name}
      value={input.value}
      onBlur={() => input.onBlur(input.value)}
      onChange={e => input.onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      readOnly={readonly}
      className={`${className} ${touched && error ? 'input-error' : ''}`}
    />
    {touched && error && (
    <p className="text-error m-0">
      *
      {error}
    </p>
    )}
  </>
);

RenderInput.propTypes = {
  className: PropTypes.string,
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readonly: PropTypes.bool,
};

RenderInput.defaultProps = {
  className: '',
  input: {},
  meta: {},
  name: '',
  placeholder: '',
  type: '',
  readonly: false,
};

export default RenderInput;
