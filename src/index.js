//import { JsonReporter } from "vitest/reporters.js";

//import { name } from "happy-dom/cjs/PropertySymbol.cjs";

//import { defaultInclude } from "vitest/config.js";
// index.js
const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  addSubmitListener()
  displayRamens()
  editRamen()
  deleteRamen()
}

document.addEventListener('DOMContentLoaded',main)
  
// Callbacks
/* on handleClick I grabbed "ramen-detail" then use it with querySelector
for accessing its elements and update them. Added cureentRamen to update the DOM after modifying a ramen */
let currentRamen = ''
const handleClick = (ramen) => {
  // Add code
  currentRamen = ramen;
  const ramenDetail = document.querySelector('#ramen-detail')
  ramenDetail.querySelector('.detail-image').src = ramen.image;
  ramenDetail.querySelector('h2').textContent = ramen.name;
  ramenDetail.querySelector('h3').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment

  console.log('currentRamen:',currentRamen)
};

const deleteRamen = () => {
const deleteBtn =  document.querySelector('#delete-ramen');
  deleteBtn.addEventListener('click',()=>{
    if (!currentRamen) {
      console.error(" No ramen selected to delete!");
      return;
    }
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
  
  .then(res => res.JSON())
  .then(ramen => console.log(ramen))
})

  const allRamens = document.querySelectorAll("#ramen-menu img");
  allRamens.forEach((img) => {
      if (img.getAttribute('src') === currentRamen.image) {
        img.remove();  
     }
   })
   document.querySelector('.detail-image').src = "./assets/image-placeholder.jpg";
   document.querySelector('#rating-display').textContent = "";
   document.querySelector('#comment-display').textContent = "";
   
   //Reset `currentRamen`
   currentRamen = null;
   
   console.log("Ramen deleted!"); 
  }


/* I prevented the form from default, then I grabbed new-ramen and assigned the values
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
};


const editRamen = () => {
  const form2 = document.getElementById('edit-ramen');

  form2.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentRamen) {
      console.error("No ramen selected!");
      return;
    }
    // Get the new values from the form
    const newRating = form2.querySelector('#edit-rating').value;
    const newComment = form2.querySelector('#edit-comment').value;

    // Send PATCH request to update the backend
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: newRating,
        comment: newComment
      })
    })
    .then(res => res.json())
    .then(updatedRamen => {
      // If successful, update the displayed data
      document.getElementById('rating-display').textContent = updatedRamen.rating;
      document.getElementById('comment-display').textContent = updatedRamen.comment;

      // Also update `currentRamen` object
      currentRamen.rating = updatedRamen.rating;
      currentRamen.comment = updatedRamen.comment;

      console.log(" Ramen updated in backend:", updatedRamen);
    })
    .catch(error => console.error("Error updating ramen:", error));

    // Clear form input fields after submission
    form2.reset();
  });
};


/*created the img element for displaying the ramen pics and used forEach for rendering each img on
loading and added an eventListener to img. plus I defined firstRamen in order to show as soon as the pics load */
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
  const firstRamen = ramenData[0]; //Added this in order to show the first ramen after DOM loaded
  handleClick(firstRamen) //Called handleClick w firstRamen cuz handleClick shows the pictures
     })
    })
  
};
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
