"use client";


import React from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  .button1 {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid transparent;
    background-color: #000;
    color: #fff;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button1__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: #000;
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button1:hover {
    background-color: #fff;
    border: 1px solid #000;
    color: black;
  }

  .button1:hover .button1__icon-wrapper {
    color: #fff;
    background-color: #000;
  }

  .button1__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button1:hover .button1__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button1:hover .button1__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }`;

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href = "#" }) => {
  return (
    <StyledWrapper>
      <a
        href={href}
        className="button1"
        style={{ '--clr': '#7808d0' } as React.CSSProperties}
      >
        <span className="button1__icon-wrapper">
          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button1__icon-svg" width={10}>
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button1__icon-svg button1__icon-svg--copy">
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
        </span>
        {children}
      </a>
    </StyledWrapper>
  );
}

export default Button;