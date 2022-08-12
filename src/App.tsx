import React, { useEffect, useState } from 'react';
import { Link, Route } from 'wouter'
import clsx from 'clsx'
import './App.css';

import CanvasPaint from './Canvas画板';

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  }, [])
  return (
    <div className="App">
      <div className={clsx('menu-container', { 'open': open } )}>
        <ul className='menu'>
          <li>
            <Link href='/canvas-paint'>canvas画板</Link>
          </li>
          <li>
            <Link href='/canvas-paint'>canvas画板</Link>
          </li>
        </ul>
        <div className="toggle" onClick={() => {
          setOpen(!open);
        }} title={open ? '收起' : '展开'}></div>
      </div>

      <div className="container">
        <Route path='/canvas-paint' component={CanvasPaint} />
      </div>
    </div>
  );
}

export default App;
