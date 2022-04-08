import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: relative;
  .checkbox{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }
  #toggle {
    border-radius: 100px;
    .layer{
      border-radius: 100px;
      width: 100%;
      border: 0px solid #d7e1e7;
      background-color: #EDEFF2;
      transition: 0.3s ease all;
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    position: relative;
    top: 50%;
    width: 40px;
    height: 24px;
    .knobs{
      &:before{
        content: '';
        position: absolute;
        top: 3px;
        left: 4px;
        width: 18px;
        height: 18px;
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        line-height: 1;
        background-color: #000;
        border-radius: 50%;
        transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
        z-index: 2;
      }
    }
    .checkbox:checked + .knobs:before{
      content: '';
      left: 18px;
      background-color: rgb(251, 41, 59);
    }
    .checkbox:checked ~ .layer{
      background-color: rgba(251, 41, 59, 0.1);
    }
    .knobs, .knobs:before, .layer{
      transition: 0.3s ease all;
    }
  }
`

const Toggle = ({
  value,
  onChange
}) => (
  <Wrapper>
    <div id="toggle">
      <input onChange={onChange} checked={value} type="checkbox" className="checkbox"/>
      <div className="knobs"></div>
      <div className="layer"></div>
    </div>
  </Wrapper>
)

export default Toggle
