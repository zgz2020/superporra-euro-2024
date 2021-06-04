import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'


const commentsForm = (submitHandler, username, translations, postCommentSuccess, postCommentError) => (
    <form onSubmit={e => submitHandler(username, e)} className="mx-3 mb-3">

        {!username ?
            <input 
                className="form-control col-sm-6 col-md-5 col-lg-4 col-xl-3 mb-2" 
                name="username"
                placeholder={translations.comments.placeholderUsername}
                id="usernameInput"
            />
            : null
        }
        
        <textarea 
            className="form-control" 
            name="comment"
            placeholder={translations.comments.placeholderText}
            id="commentInput" rows="3" 
        />

        {postCommentSuccess &&  
            <p 
                className="text-success font-italic mt-2"
                data-automation={'comment-success'}
            >
                {translations.comments.success}
            </p>
        }

        {postCommentError &&  
            <p 
                className="text-danger font-italic mt-2"
                data-automation={'comment-error'}
            >
                {translations.comments.error}
            </p>
        }

        <button 
            type="submit" 
            className="form-control mt-2 btn btn-outline-secondary col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2"
        >
            {translations.accountPage.submit}
        </ button>
    </form>
)

const CommentsBox = ({ comments, submitHandler, username, postCommentSuccess, postCommentError, translations }) => (
    <div className="card mb-5">
        <div className="card-header bg-dark text-white">
            {translations.comments.title}
        </div>

        <div className="card-body">
            {comments.length > 10 ?
                commentsForm(submitHandler, username, translations, postCommentSuccess, postCommentError)
                : null
            }

            {comments.reverse().map((comment, index) => (
                <div key={index} className="card-body">
                    <div className="font-italic">
                        {comment.username} - {comment.date}
                    </div>
                    {comment.text}
                </div>
            ))}

            {comments.length <= 10 ?
                commentsForm(submitHandler, username, translations, postCommentSuccess, postCommentError)
                : null
            }
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { 
        comments,
        translations,
        session,
        predictions,
        postCommentSuccess,
        postCommentError
    } = state

    const usernameKey = session.id 
        ? predictions.allIds.length > 0 
            ? Object.keys(predictions.byId).filter(prediction => predictions.byId[prediction].owner == session.id) 
            : false
        : false
    
    const username = !usernameKey ? false : predictions.byId[usernameKey].username

    return { 
        translations,
        comments,
        username,
        postCommentSuccess,
        postCommentError
    }
}

const mapDispatchToProps = (dispatch) => {
    let commentUsername = (username, e) => username ? username : e.target['username'].value
    let comment = (e) => e.target['comment'].value

    return {
        submitHandler(username, e) {
            e.preventDefault()
            if (!commentUsername(username, e) || !comment(e)) {
                dispatch(mutations.showPostCommentError())

            } else {
                dispatch(mutations.hidePostCommentError())
                dispatch(mutations.requestCommentCreation(commentUsername(username, e), comment(e)))
                document.getElementById('commentInput').value = ''
            }
            
        }
    }
}

export const ConnectedCommentsBox = connect(mapStateToProps, mapDispatchToProps)(CommentsBox)
