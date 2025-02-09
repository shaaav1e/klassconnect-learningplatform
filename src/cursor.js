// ________________ CURSOR DOT LOGIC____________________
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener("mousemove", (e) => {
    const posx = e.clientX;
    const posy = e.clientY;

    dot.style.left = `${posx}px`;
    dot.style.top = `${posy}px`;

});
