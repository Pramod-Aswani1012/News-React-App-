import React from 'react'
import spin from './Spinner-0.8s-231px.gif';

export default function Spinner(props) {
  return (
    <div className="text-center">
      <img src={spin} alt="Spinning" />
    </div>
  );
}

