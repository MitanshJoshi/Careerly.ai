"use client";

import React from 'react';
import styled from 'styled-components';

interface NormalButtonProps {
  children: string;
  href?: string;
}

const NormalButton: React.FC<NormalButtonProps> = ({ children, href = "#" }) => {
  const chars = children.split('');
  return (
    <StyledWrapper>
      <a href={href}>
        <button type="button">
        <span className="span-mother">
            {chars.map((char, i) => (
                <span key={`top-${i}`}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
            </span>
            <span className="span-mother2">
            {chars.map((char, i) => (
                <span key={`bottom-${i}`}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
            </span>
        </button>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  a {
    text-decoration: none;
  }
  button {
    font-weight: bold;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
    width: 120px;
    height: 42.66px;
    border: none;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
    transition: opacity 0.2s;
    opacity: 1;
  }

  button:hover .span-mother {
    position: absolute;
    opacity: 0;
  }

  button:hover .span-mother span {
    transform: translateY(1.2em);
  }

  button .span-mother span:nth-child(1) { transition: 0.2s; }
  button .span-mother span:nth-child(2) { transition: 0.3s; }
  button .span-mother span:nth-child(3) { transition: 0.4s; }
  button .span-mother span:nth-child(4) { transition: 0.5s; }
  button .span-mother span:nth-child(5) { transition: 0.6s; }
  button .span-mother span:nth-child(6) { transition: 0.7s; }
  button .span-mother span:nth-child(7) { transition: 0.8s; }
  button .span-mother span:nth-child(8) { transition: 0.9s; }
  button .span-mother span:nth-child(9) { transition: 1s; }
  button .span-mother span:nth-child(10) { transition: 1.1s; }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  button .span-mother2 span {
    transform: translateY(-1.2em);
  }

  button:hover .span-mother2 {
    opacity: 1;
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span:nth-child(1) { transition: 0.2s; }
  button .span-mother2 span:nth-child(2) { transition: 0.3s; }
  button .span-mother2 span:nth-child(3) { transition: 0.4s; }
  button .span-mother2 span:nth-child(4) { transition: 0.5s; }
  button .span-mother2 span:nth-child(5) { transition: 0.6s; }
  button .span-mother2 span:nth-child(6) { transition: 0.7s; }
  button .span-mother2 span:nth-child(7) { transition: 0.8s; }
  button .span-mother2 span:nth-child(8) { transition: 0.9s; }
  button .span-mother2 span:nth-child(9) { transition: 1s; }
  button .span-mother2 span:nth-child(10) { transition: 1.1s; }
`;

export default NormalButton;
