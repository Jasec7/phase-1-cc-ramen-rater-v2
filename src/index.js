//import { JsonReporter } from "vitest/reporters.js";

//import { name } from "happy-dom/cjs/PropertySymbol.cjs";

//import { defaultInclude } from "vitest/config.js";
// index.js
const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  addSubmitListener
  displayRamens()
}

document.addEventListener('DOMContentLoaded',main)
  
// Callbacks
/* on handleClick I grabbed "ramen-detail" then use it with querySelector
for accessing its elements and update them */
const handleClick = (ramen) => {
  // Add code
  const ramenDetail = document.querySelector('#ramen-detail')
  ramenDetail.querySelector('.detail-image').src = ramen.image;
  ramenDetail.querySelector('h2').textContent = ramen.name;
  ramenDetail.querySelector('h3').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment
};
/* I prevented the form to default, then I grabbed new-ramen and assigned the value
plus I invoked handleClick */
// Add code
const addSubmitListener = (e) => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

  let newRamen = {
  name: form.querySelector('#new-name').value, 
  restaurant: form.querySelector('#new-restaurant').value,
  image: form.querySelector('#new-image').value,
  rating: parseInt(form.querySelector('#new-rating').value) || 0, // ✅ Convert to number
  comment: form.querySelector('#new-comment').value,
  };
  console.log('new ramen:', newRamen);

  let newImg = document.createElement('img');
  newImg.src = newRamen.image;
  newImg.alt = newRamen.name
  newImg.addEventListener('click', () => handleClick(newRamen));

  console.log('new img:', newImg)

  document.querySelector('#ramen-menu').appendChild(newImg)
  form.reset()
});
}
/*created the img element for displaying the ramen pics and used forEach for rendering each img on
loading and added an eventListener to img*/
const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramenData =>{
    console.log("Fetched ramen data:", ramenData);
     ramenData.forEach(ramen =>{
  let img = document.createElement('img');
  img.src= ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click',() => handleClick(ramen))
  document.querySelector('#ramen-menu').appendChild(img)
     })
    })
};
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
