//See all ramen images in the div with the id of ramen-menu.
//When the page loads, request the data from the server to get all the ramen objects.
//Then, display the image for each of the ramen using an an img tag inside the #ramen-menu div.
showRamenImg()
//GLOBAL VARIABLES
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector("#ramen-detail")
const ramenImage = document.querySelector(".detail-image")
const ramenName = document.querySelector("h2")
const ramenRest = document.querySelector(".restaurant")
const ramenRating = document.querySelector('#rating')
const ramenComment = document.querySelector('#comment')
const ramenForm = document.querySelector('#ramen-rating')


//EVENT LISTENERS
ramenForm.addEventListener('submit', updateInfo)

//FUNCTION
function showRamenImg() {
    fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(ramen => {
            ramen.forEach(ramenInfo => renderInfo(ramenInfo))
        })
}

function renderInfo(ramenObj) {
    const ramenImg = document.createElement('img')
    ramenImg.src = ramenObj.image
    ramenImg.alt = ramenObj.name
    ramenImg.dataset.id = ramenObj.id
    ramenMenu.append(ramenImg)
    ramenImg.addEventListener('click', function (event) {
        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(data => {
                ramenRating.value = data.rating
                ramenComment.value = data.comment
            })
        ramenImage.src = ramenObj.image
        ramenForm.dataset.id = ramenObj.id
        ramenName.innerText = ramenObj.name
        ramenRest.innerText = ramenObj.restaurant
    })
}

function updateInfo(event) {
    event.preventDefault()
    const newRating = ramenRating.value
    const newComment = ramenComment.value
    
    ramenObject = {
        rating: newRating,
        comment: newComment,
    }

    fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramenObject),
        })
        .then(response => response.json())
        .then(updatedObject => {
            renderInfo(updatedObject)
            ramenForm.dataset.id = updatedObject.id
            ramenName.innerText = updatedObject.name
            ramenRest.innerText = updatedObject.restaurant
            ramenRating.value = updatedObject.rating
            ramenComment.value = updatedObject.comment
        })
}
    
    // updateRamen(ramenObject.id, ramenObject)
// }

// function updateRamen(id, ramen){
    