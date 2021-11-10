import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentList: []}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  renderCommentsList = () => {
    const {commentList} = this.state

    return commentList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  addComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state

    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="main-heading">Comments</h1>
          <div className="comments-input-container">
            <form className="form" onSubmit={this.addComment}>
              <p className="comment-description">
                Say something about 4.0 Technologies
              </p>

              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="comment-input"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="comment-btn">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <hr className="hr-line" />
          <p className="heading">
            <span className="comments-count">{commentList.length}</span>Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
