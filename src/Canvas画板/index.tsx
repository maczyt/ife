// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import './style.css'

type TypeLine = { start?: [number, number], nodes?: Array<[number, number]> };
const App = () => {
  const [bgColor, setBgColor] = useState('#fff');
  const [paintColor, setPaintColor] = useState('#000')
  const [paintWidth, setPaintWidth] = useState(10);
  const canvas = useRef<HTMLCanvasElement>()
  const historyNodes = useRef<TypeLine[]>([]);

  const getCtx = () => {
    return canvas.current?.getContext('2d')
  }

  const nodes = [];
  const handleClear = () => {
    historyNodes.current = [];
    nodes.length = 0;
    const ctx = getCtx()!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.style.backgroundColor = bgColor;
  }

  const handleRecoding = () => {
    historyNodes.current = [...nodes];
  }
  const handleShowRecorded = () => {    
    const ctx = getCtx()!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const next = (index: number) => {
      const newLines = historyNodes.current[index];
      if (!newLines) return;
      ctx.beginPath();
      ctx.moveTo(...newLines.start!);
      const newNodes = [...newLines.nodes!];
      let raf = window.requestAnimationFrame(function draw() {
        const node = newNodes.shift();
        ctx.lineTo(...node!);
        ctx.stroke();
        if (newNodes.length > 0) {
          raf = window.requestAnimationFrame(draw);
        } else {
          window.cancelAnimationFrame(raf);
          next(index + 1);
        }
      })
    }
    next(0);
  }
  const handleSave = () => {
    const a = document.createElement('a');
    const ctx = getCtx()!;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    a.href = canvas.current?.toDataURL('image/png');
    a.download = 'canvas画板.png';
    a.click();
  }

  // bind events
  useEffect(() => {
    let flag = false;
    const top = canvas.current?.offsetTop;
    const left = canvas.current?.offsetLeft;
    const canvasWidth = canvas.current?.offsetWidth;
    const canvasHeight = canvas.current?.offsetHeight;

    const getX = (x: number) => {
      const realX = x - left;
      return Math.min(Math.max(0, realX), canvasWidth)
    };
    const getY = (y: number) => {
      const realY = y - top;
      return Math.min(Math.max(0, realY), canvasHeight)
    }
    const ctx = getCtx();
    let newLines: TypeLine = {};
    const handleMouseDown = (event: MouseEvent) =>{
      flag = true;
      newLines = {
        nodes: [],
      };
      const x = getX(event.clientX);
      const y = getY(event.clientY);
      ctx.beginPath();
      ctx.moveTo(x, y);
      newLines.start = [x, y];
      ctx.strokeStyle = paintColor;
      ctx.lineWidth = paintWidth;
    }
    const handleMouseMove = (event: MouseEvent) => {
      if (!flag) return;
      const x = getX(event.clientX);
      const y = getY(event.clientY);
      newLines.nodes.push([x, y]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    const handleMouseUp = () => {
      if (!flag) return;
      flag = false;
      nodes.push(JSON.parse(JSON.stringify(newLines)));
      handleRecoding();
    }

    canvas.current.addEventListener('mousedown', handleMouseDown, false);
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
    
    return () => {
      canvas.current.removeEventListener('mousedown', handleMouseDown, false);
      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);
    }
  }, [paintColor, paintWidth])

  useEffect(() => {
    handleClear();
    const ctx = getCtx();
    ctx.canvas.width = canvas.current.offsetWidth;
    ctx.canvas.height = canvas.current.offsetHeight;
  }, [])

  useEffect(() => {
    const ctx = getCtx();
    ctx.canvas.style.backgroundColor = bgColor;
  }, [bgColor])
  return (
    <div className='container'>
      <header>
        <h1>canvas画板</h1>
        <div>
          <label htmlFor="bgcolor">背景颜色</label>
          <input value={bgColor} onChange={(e) => {
            setBgColor(e.target.value);
          }} id="bgcolor" type="color" />
          <label htmlFor="paintcolor">画笔颜色</label>
          <input value={paintColor} onChange={(e) => {
            setPaintColor(e.target.value);
          }} id="paintcolor" type="color" />
          <label htmlFor="paintwidth">画笔粗细</label>
          <input value={paintWidth} onChange={(e) => {
            setPaintWidth(Number(e.target.value))
          }} type="number" id='paintwidth' />
          <button onClick={handleClear}>清空画布</button>
          <button onClick={handleSave}>保存图像</button>
          <button onClick={handleShowRecorded}>展示画图路径</button>
        </div>
      </header>
      <canvas ref={canvas}></canvas>
    </div>
  )
}

export default App;