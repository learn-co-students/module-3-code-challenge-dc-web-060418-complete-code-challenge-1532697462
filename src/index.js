const imageId = 13 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', function() {
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

function like() {
  let oldLikes = parseInt(document.querySelector("#likes").innerText)
  document.querySelector("#likes").innerText = oldLikes+1 
  saveLikes()
}

function saveLikes() {
  fetch(likeURL, {
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
  saveComment(commentText, newComment)
}

function saveComment(commentText, newComment) {
  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 13, content: commentText})
  }).then(r => r.json()).then(comment => {
    let deleteButton = document.createElement("button")
    newComment.appendChild(deleteButton)
    deleteButton.outerHTML = `<button data-commentId="${comment.id}" onclick="deleteComment(event)">x</button>`
  })
}

function deleteComment(event) {
  deleteCommentForReal(event.target.dataset.commentid)
  event.target.parentNode.remove()
}

function deleteCommentForReal(commentid) {
  console.log(commentid)
  fetch(`https://randopic.herokuapp.com/comments/${commentid}`, {
    method: "DELETE"
  }).then(r => r.json()).then(response => {
    alert(response.message)
  })
}

