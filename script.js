let cityInput = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    const city = cityInput.value;
    console.log(city);

})