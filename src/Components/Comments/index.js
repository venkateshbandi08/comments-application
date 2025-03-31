// Write your code here
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = [
  //   {
  //     commentId: uuidv4(),
  //     userName: 'virat kohli',
  //     comment: 'ee sala cup namde .....',
  //     isLiked: false,
  //     formattedDate: formatDistanceToNow(new Date()),
  //     logoColorIndex: 2,
  //     initialLetter: 'v',
  //   },
]

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    userName: '',
    comment: '',
  }

  formatCommentedDate = () => formatDistanceToNow(new Date())

  logoBackgroundColor = () =>
    Math.ceil(Math.random() * initialContainerBackgroundClassNames.length - 1)

  onAddComment = event => {
    event.preventDefault()
    const {userName, comment} = this.state
    const newComment = {
      commentId: uuidv4(),
      userName,
      comment,
      isLiked: false,
      formattedDate: this.formatCommentedDate(),
      logoColorIndex: this.logoBackgroundColor(),
      initialLetter: userName.split('')[0],
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      userName: '',
      comment: '',
    }))
  }

  onChangeUsername = event => {
    this.setState({
      userName: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onToggleCommentIsLiked = commentId => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (commentId === eachComment.commentId) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = commentId => {
    const {commentsList} = this.state
    const filteredItems = commentsList.filter(
      eachComment => eachComment.commentId !== commentId,
    )
    this.setState({
      commentsList: filteredItems,
    })
  }

  render() {
    const {commentsList, userName, comment} = this.state
    return (
      <div className="bg-container">
        <div className="comments-app-container">
          <div className="comments-app-top-container">
            <div>
              <h1 className="comments-main-heading"> Comments </h1>
              <p className="description">
                Comment your thought!
              </p>
              <form className="form-container" onSubmit={this.onAddComment}>
                <div className="input-form-container">
                  <input
                    type="text"
                    value={userName}
                    className="name-input-container"
                    placeholder="Your name"
                    onChange={this.onChangeUsername}
                  />
                  <textarea
                    rows="12"
                    cols="40"
                    value={comment}
                    placeholder="Your comment"
                    className="comment-input-container"
                    onChange={this.onChangeComment}
                  />
                  <button className="add-comment-button" type="submit">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
            <div className="comments-top-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
          </div>
          <hr
            color="#dee0e3"
            size="2"
            width="100%"
            className="horizantal-line"
          />
          <ul className="comments-app-bottom-container">
            <p className="count-comments-heading">
              <span className="count-of-comments">{commentsList.length}</span>
              Comments
            </p>
            {commentsList.map(eachCommentDetails => (
              <CommentItem
                eachCommentDetails={eachCommentDetails}
                onToggleCommentIsLiked={this.onToggleCommentIsLiked}
                onDeleteComment={this.onDeleteComment}
                initialContainerBackgroundClassNames={
                  initialContainerBackgroundClassNames
                }
                key={eachCommentDetails.commentId}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments