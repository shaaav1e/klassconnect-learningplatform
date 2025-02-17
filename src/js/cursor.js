  // ________________ CURSOR DOT LOGIC____________________

document.addEventListener("DOMContentLoaded", () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener("mousemove", (e) => {
        if (dot && outline) { // Prevent errors if elements are missing
            const posx = e.clientX;
            const posy = e.clientY;

            dot.style.left = `${posx}px`;
            dot.style.top = `${posy}px`;
        }
    });

    // FAQ's - ACCORDIONS
    const accordions = document.querySelectorAll('.accordian');
    accordions.forEach(accordian => {
        const icon = accordian.querySelector('.icon'); // Ion icon
        const answer = accordian.querySelector('.answer'); // Answer of question

        accordian.addEventListener('click', () => {
            if (icon && answer) { // Prevent errors if elements are missing
                icon.classList.toggle('active');
                answer.classList.toggle('active');
            }
        });
    });
});
