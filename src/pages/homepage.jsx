import React, { useEffect, useState, useRef } from 'react';

const HomePage = () => {
  const wrapperRef = useRef(null);
    useEffect(() => {
  console.log("caleed")
    }, []);

  const [currTab, setCurrTab] = useState('Stake');
  return (
    <div>
        <h1>home</h1>
    </div>
  );
};

export default HomePage;
