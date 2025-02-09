import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
AOS.init({
    duration: 1000,  // Animation duration in ms
    easing: 'ease',  // Easing function
    once: true,      // Whether animation should happen once or every time the element comes into view
  });

//FAQ's -  ACCORDIANS
const accordians= document.querySelectorAll('.accordian');
accordians.forEach(accordian => // hr individual icon aur answer ko select kre ga because of For Each
{
    const icon= accordian.querySelector('.icon'); //ion icon
    const answer= accordian.querySelector('.answer'); //answer of question
    accordian.addEventListener('click',()=>
    {
        icon.classList.toggle('active');
        answer.classList.toggle('active');
    })
});
