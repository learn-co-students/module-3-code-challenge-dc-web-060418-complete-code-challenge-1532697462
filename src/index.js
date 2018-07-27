document.addEventListener('DOMContentLoaded', function() {

  const imageId = 13 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
 
  showImage(imageURL)

})

function showImage(imageURL) {
  fetch(imageURL).then(r => r.json())
  .then(imageObj => {
    let newImage = new Image(imageObj.id, imageObj.url, imageObj.name, imageObj.like_count, imageObj.comments)
    newImage.render()
    document.querySelector("form").addEventListener("submit", newCommentHandling)
  })
}

function like(e) {
  let oldLikes = parseInt(document.querySelector("#likes").innerText)
  document.querySelector("#likes").innerText = oldLikes+1 
  saveLikes()
}

function saveLikes() {
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 13})
  })
}

function newCommentHandling(e) {
  e.preventDefault()
  let newComment = document.createElement("li")
  let commentText = e.target.querySelector("#comment_input").value
  newComment.innerText = commentText
  document.querySelector("#comments").appendChild(newComment)
  e.target.reset()
  saveComment(commentText)
}

function saveComment(commentText) {
  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 13, content: commentText})
  }).then(r => r.json()).then(console.log)
}