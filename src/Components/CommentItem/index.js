// Write your code here
import './index.css'

const CommentItem = props => {
  const {
    eachCommentDetails,
    onToggleCommentIsLiked,
    onDeleteComment,
    initialContainerBackgroundClassNames,
  } = props
  const {
    userName,
    comment,
    commentId,
    isLiked,
    formattedDate,
    logoColorIndex,
    initialLetter,
  } = eachCommentDetails
  const onClickLikeButton = () => {
    onToggleCommentIsLiked(commentId)
  }
  const onClickDeleteButton = () => {
    onDeleteComment(commentId)
  }
  const changeLikeImageIcon = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeTextColor = isLiked ? 'liked-text' : 'like-text'

  return (
    <li>
      <div className="comment-container">
        <div className="comment-top-content-container">
          <div
            className={`comment-logo-container ${initialContainerBackgroundClassNames[logoColorIndex]}`}
          >
            <p className="logo-letter">{initialLetter}</p>
          </div>
          <div className="comment-name-time-comment-container">
            <div className="name-time-container">
              <p className="userName"> {userName} </p>
              <p className="comment-time"> {formattedDate} </p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="comment-bottom-container">
          <div className="like-image-container">
            <button
              className="like-buttton"
              type="button"
              onClick={onClickLikeButton}
            >
              <img src={changeLikeImageIcon} className="like-icon" alt="like" />
              <p className={likeTextColor}> Like </p>
            </button>
          </div>
          <button
            className="delete-icon-button"
            type="button"
            onClick={onClickDeleteButton}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              className="delete-icon"
              alt="delete"
            />
          </button>
        </div>
      </div>
      <hr color="#dee0e3" size="2" width="100%" className="horizantal-line" />
    </li>
  )
}

export default CommentItem