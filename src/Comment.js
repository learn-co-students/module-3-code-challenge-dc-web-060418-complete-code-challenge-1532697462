class Comment {
  constructor(id, content) {
      this.id = id,
      this.content = content
  }

  render() {
      let commentEl = document.createElement("li")
      commentEl.innerText = this.content
      this.deleteCommentButton(commentEl)
      document.querySelector("#comments").appendChild(commentEl)
  }

  deleteCommentButton(commentEl) {
    let deleteButton = document.createElement("button")
    commentEl.appendChild(deleteButton)
    deleteButton.outerHTML = `<button data-commentId="${this.id}" onclick="deleteComment(event)">x</button>`
  }
}
