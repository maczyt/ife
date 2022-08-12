import React, { useEffect, useState } from 'react';
import { Route, Router } from 'wouter'
import clsx from 'clsx'
import './App.css';

import CanvasPaint from './Canvas画板';
import { useHashLocation } from './hooks/useHashLocation';

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  }, [])
  return (
    <div className="App">
      <div className={clsx('menu-container', { 'open': open } )}>
        <ul className='menu'>
          <li>
            <a href='#/canvas-paint'>canvas画板</a>
          </li>
        </ul>
        <div className="toggle" onClick={() => {
          setOpen(!open);
        }} title={open ? '收起' : '展开'}></div>
      </div>

      <div className="container">
        <Router hook={useHashLocation as any}>
          <Route path='/canvas-paint' component={CanvasPaint} />
        </Router>
      </div>
    </div>
  );
}

export default App;
