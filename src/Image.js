class Image {
  constructor(id, url, name, like_count, comments) {
      this.id = id
      this.url = url
      this.name = name
      this.like_count = like_count
      this.comments = comments
  }

  render() {
      document.querySelector("#image").src = this.url
      document.querySelector("#name").innerText = this.name
      document.querySelector("#likes").innerText = this.like_count
      let commentList = document.querySelector("#comments")
      this.comments.forEach(comment => {

          let newComment = new Comment(comment.id, comment.content)
          newComment.render() //will make new comment element, append it and add delete button
      })
      document.querySelector("#like_button").addEventListener("click", like)
  }

  deleteCommentButton(commentEl, commentId) {
    let deleteButton = document.createElement("button")
    commentEl.appendChild(deleteButton)
    deleteButton.outerHTML = `<button data-commentId="${commentId}" onclick="deleteComment(event)">x</button>`
  }

}