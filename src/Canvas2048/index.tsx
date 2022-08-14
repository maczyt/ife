import React, { useEffect, useRef, useState } from 'react';
import { drawRect } from './helper';
import './style.css'

import { DrawRegister } from './draw';
import { config2048 } from './config';

let timer: any = null;
const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const widthRef = useRef<number>(0);
  const drawRef = useRef<DrawRegister>();
  const scoreRef = useRef<HTMLSpanElement>(null);

  const values = useRef<Array<Array<number>>>(Array(4).fill(0).map(() => Array(4).fill(0)));
  const flush = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawRect(ctx, 20, 0, widthRef.current, widthRef.current, 10, '#bcada0')
    ctx.save();
    ctx.translate(20, 0);
    const len = values.current.length;
    const distance = 10;
    const width = (widthRef.current - (len + 1) * distance) / len;
    const getStart = (row: number, column: number) => {
      const x = distance + column * (distance + width);
      const y = distance + row * (distance + width);
      return [x, y];
    }
    values.current.forEach((arr, row) => {
      arr.forEach((value, column) => {
        const [x, y] = getStart(row, column);
        const draw = drawRef.current?.get(value)!;
        draw(x, y, width, width);
      })
    })
    ctx.restore()
    let score = 0;
    values.current.forEach((arr) => {
      arr.forEach((v) => score = Math.max(score, v))
    })
    if (scoreRef.current && score > 2) {
      scoreRef.current.textContent = score + '';
    }
    if (score === 2048) {
      window.confirm('You Win!')
    }
  }

  const merge = (direction: 'top' | 'bottom' | 'left' | 'right') => {
    clearTimeout(timer!);
    // @ts-ignore
    timer = setTimeout(() => {
      if (direction === 'bottom') {
        const len = values.current.length;
        let column = len - 1;
        while (column >= 0) {
          const newColumns = Array(len).fill(0);
          for (let i = len; i > 0; i --) {
            newColumns[i] = values.current[i - 1][column]
          }
          while (newColumns.includes(0)) {
            newColumns.splice(newColumns.indexOf(0), 1);
          }

          while (newColumns.length < len) {
            newColumns.unshift(0)
          }

          let i = 1;
          while (i < len) {
            if (newColumns[i - 1] === newColumns[i]) {
              newColumns[i - 1] = 0;
              newColumns[i] *= 2;
            }
            i += 2;
          }

          newColumns.forEach((v, index) => {
            values.current[index][column] = v;
          })
          column --;
        }
      } else if (direction === 'top') {
        const len = values.current.length;
        let column = len - 1;
        while (column >= 0) {
          const newColumns = Array(len).fill(0);
          for (let i = 0; i < len; i ++) {
            newColumns[i] = values.current[i][column]
          }
          while (newColumns.includes(0)) {
            newColumns.splice(newColumns.indexOf(0), 1);
          }

          while (newColumns.length < len) {
            newColumns.push(0)
          }

          let i = 1;
          while (i < len) {
            if (newColumns[i - 1] === newColumns[i]) {
              newColumns[i - 1] *= 2;
              newColumns[i] = 0;
            }
            i += 2;
          }

          newColumns.forEach((v, index) => {
            values.current[index][column] = v;
          })
          column --;
        }
      } else if (direction === 'left') {
        const len = values.current.length;
        let row = len - 1;
        while (row >= 0) {
          const newColumns = Array(len).fill(0);
          for (let i = 0; i < len; i ++) {
            newColumns[i] = values.current[row][i]
          }
          while (newColumns.includes(0)) {
            newColumns.splice(newColumns.indexOf(0), 1);
          }

          while (newColumns.length < len) {
            newColumns.push(0)
          }

          let i = 1;
          while (i < len) {
            if (newColumns[i - 1] === newColumns[i]) {
              newColumns[i - 1] *= 2;
              newColumns[i] = 0;
            }
            i += 2;
          }

          newColumns.forEach((v, index) => {
            values.current[row][index] = v;
          })
          row --;
        }
      } else {
        const len = values.current.length;
        let row = len - 1;
        while (row >= 0) {
          const newColumns = Array(len).fill(0);
          for (let i = len - 1; i >= 0; i --) {
            newColumns[i] = values.current[row][i]
          }
          while (newColumns.includes(0)) {
            newColumns.splice(newColumns.indexOf(0), 1);
          }

          while (newColumns.length < len) {
            newColumns.unshift(0)
          }

          let i = 1;
          while (i < len) {
            if (newColumns[i - 1] === newColumns[i]) {
              newColumns[i - 1] = 0;
              newColumns[i] *= 2;
            }
            i += 2;
          }
          newColumns.forEach((v, index) => {
            values.current[row][index] = v;
          })
          row --;
        }
      }
      flush();
      // @ts-ignore
      setTimeout(() => {
        random(1)
        flush();
      })
    }, 500);
  }

  const bindEvents = () => {
    let prevX = 0, prevY = 0;
    document.addEventListener('touchstart', (ev) => {
      prevX = ev.touches[0].pageX;
      prevY = ev.touches[0].pageY;
    })
    document.addEventListener('touchend', (ev) => {
      const x = ev.changedTouches[0].pageX;
      const y = ev.changedTouches[0].pageY;
      const xd = Math.abs(x - prevX);
      const yd = Math.abs(y - prevY);
      if (xd > yd) {
        // horizontal
        if (x > prevX) {
          // right
          merge('right')
        } else if (x < prevX) {
          // left
          merge('left')
        }
      } else {
        // vertical
        if (y > prevY) {
          // bottom
          merge('bottom')
        } else if (y < prevY) {
          // top
          merge('top')
        }
      }
    })
  }

  const random = (count: number) => {
    const emptyPoints: [number, number][] = [];
    values.current.forEach((arr, row) => {
      arr.forEach((v, column) => {
        if (v === 0) {
          emptyPoints.push([row, column])
        }
      })
    });
    if (!emptyPoints.length) return;
    for (let i = 0; i < count; i ++) {
      const randomIndex = Math.floor(Math.random() * emptyPoints.length)
      const point = emptyPoints[randomIndex]
      values.current[point[0]][point[1]] = 2;
    }
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const rect = wrapperRef.current?.getBoundingClientRect()!;
    ctx.canvas.width = rect.width;
    ctx.canvas.height = rect.height;
    widthRef.current = Math.min(rect.width, rect.height) - 40;
    drawRef.current = new DrawRegister();
    config2048(drawRef.current, ctx)
    bindEvents();

    // 随机生成
    random(2);
    flush();  
  }, [])

  const refresh = () => {
    values.current = Array(4).fill(0).map(() => Array(4).fill(0));
    random(2);
    flush()
  }
  return (  
    <div className='container'>
      <h2>2048</h2>
      <button onClick={refresh}>New Game</button>
      <p>Score: <span ref={scoreRef}>0</span></p>
      <div ref={wrapperRef} className='canvas'>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}

export default App