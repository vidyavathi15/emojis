import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props

  const {id, name, comment, date, initialClassName, isLiked} = commentDetails

  const initial = name ? name[0].toUpperCase() : ''

  const likedTextClassName = isLiked ? 'button active' : 'button'

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onClickLikeButton = () => {
    const {toggleIsLiked} = props

    toggleIsLiked(id)
  }

  const onClickDeleteIcon = () => {
    const {deleteComment} = props

    deleteComment(id)
  }
  return (
    <li className="comment-item">
      <div className="comments-each-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="user-time-container">
            <p className="name">{name}</p>
            <p className="posted-time">{postedTime}</p>
          </div>
          <p className="comment-about">{comment}</p>
        </div>
      </div>

      <div className="button-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-img" />

          <button
            type="button"
            className={likedTextClassName}
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onClickDeleteIcon}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="icon"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
