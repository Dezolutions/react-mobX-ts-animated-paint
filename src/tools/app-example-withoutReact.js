

const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
let inMouseDown = false;
const coords = [];

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

cvs.addEventListener('mousedown', () => inMouseDown = true);
cvs.addEventListener('mouseup', () => {
  inMouseDown = false;
  ctx.beginPath();
  coords.push('mouseup');
});

ctx.lineWidth = 10 * 2;
cvs.addEventListener('mousemove', (e) => {
  if (inMouseDown) {
    coords.push([e.clientX, e.clientY])
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});
const save = () => {
  localStorage.setItem('coords', JSON.stringify(coords))
}
//on func replay do - coords = JSON.pars(localStorage.getItem('coords'))
const replay = () => {
  let timer = setInterval(() => {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }
    let crd = coords.shift();
    let a = {
      clientX: crd['0'],
      clientY: crd['1']
    }
    ctx.lineTo(a.clientX, a.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(a.clientX, a.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(a.clientX, a.clientY);

  }, 30)
}
const clear = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cvx.width, cvs.height)

  ctx.beginPath();
  ctx.fillStyle = 'black';
}