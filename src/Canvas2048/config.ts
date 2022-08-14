import type { DrawRegister } from "./draw";
import { drawFont, drawRect } from "./helper";

export const config2048 = (draw2048: DrawRegister, ctx: CanvasRenderingContext2D) => {
  draw2048.register(0, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#cbc1b4')
  });
  draw2048.register(2, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#eee5db')
    drawFont(ctx, '2', 30, x + width / 2, y + height, '#756e63')
  });
  draw2048.register(4, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#ece1c6')
    drawFont(ctx, '4', 30, x + width / 2, y + height, '#756e63')
  });
  draw2048.register(8, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#f0b279')
    drawFont(ctx, '8', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(16, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#ec8d54')
    drawFont(ctx, '16', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(32, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#f27b66')
    drawFont(ctx, '32', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(64, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#f35c3d')
    drawFont(ctx, '64', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(128, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#ecd073')
    drawFont(ctx, '128', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(256, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#f1d04b')
    drawFont(ctx, '256', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(512, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#eac84f')
    drawFont(ctx, '512', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(1024, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#e3b912')
    drawFont(ctx, '1024', 30, x + width / 2, y + height, '#fff')
  });
  draw2048.register(2048, (x, y, width, height) => {
    drawRect(ctx, x, y, width, height, 10, '#e9c600')
    drawFont(ctx, '2048', 30, x + width / 2, y + height, '#fff')
  });
}