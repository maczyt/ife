export const drawRect = (
  ctx: CanvasRenderingContext2D, 
  x: number, y: number,
  width: number, height: number,
  radius: number, 
  fillColor: string,
  strokeWidth: number = 0, strokeColor: string = 'transparent',
  ) => {
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(x + width - radius, y);
  ctx.arc(x + width - radius, y + radius, radius, Math.PI * 3 / 2, 0);
  ctx.lineTo(x + width, y + height - radius); 
  ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
  ctx.lineTo(x + radius, y + height);
  ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
  ctx.closePath();
  ctx.save();
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export const drawFont = (
  ctx: CanvasRenderingContext2D, value: string,
  size: number,
  x: number, y: number,
  color: string
) => {
  ctx.font = `bold ${size}px/1 Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif`
  ctx.save()
  ctx.fillStyle = color;
  ctx.fillText(value, x - size / 2, y - size / 2);
  ctx.restore()
}