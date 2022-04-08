import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.button`
  background: #fb293b;
  border: 1px solid #fb293b;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus,
  &:hover,
  &:focus:hover {
    background: #fb293b;
    color: #fff;
  }
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  height: 46px;
`

const Button = ({
  loading = false,
  label,
  children,
  disable,
  onClick,
  ...rest
}) => {
  return (
    <Wrapper
      className="btn"
      disabled={loading || disable}
      onClick={onClick}
      {...rest}>
      {loading && 'loading...'}
      {(!loading && label) || (!loading && children)}
    </Wrapper>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  disable: PropTypes.bool,
  appearance: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Button);
