import * as mutations from '../mutations'

export const comments = (comments = [], action) => {
    switch (action.type) {
        case mutations.SET_STATE:
            return action.state.comments
        case mutations.CREATE_COMMENT:
            return [
                {
                    username: action.username,
                    date: action.date,
                    text: action.text
                },
                ...comments
            ]
    }
    return comments
}

export const postCommentSuccess = (postCommentSuccess = false, action) => {
    switch (action.type) {
        case mutations.SHOW_POST_COMMENT_SUCCESS:
            return true
        case mutations.HIDE_POST_COMMENT_SUCCESS:
            return false
    }
    return postCommentSuccess
}
export const postCommentError = (postCommentError = false, action) => {
    switch (action.type) {
        case mutations.SHOW_POST_COMMENT_ERROR:
            return true
        case mutations.HIDE_POST_COMMENT_ERROR:
            return false
    }
    return postCommentError
}
