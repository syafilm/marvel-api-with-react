import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

const Input = ({
  type = 'text',
  placeholder,
  onBlur,
  onKeyUp,
  onFocus,
  value,
  label,
  ...rest
}) => {
  return(
    <>
      <span>{label}</span>
      <Wrapper
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        {...rest}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func
};

export default React.memo(Input);
