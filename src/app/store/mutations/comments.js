export const REQUEST_COMMENT_CREATION = 'REQUEST_COMMENT_CREATION'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const SHOW_POST_COMMENT_SUCCESS = 'SHOW_POST_COMMENT_SUCCESS'
export const HIDE_POST_COMMENT_SUCCESS = 'HIDE_POST_COMMENT_SUCCESS'

export const SHOW_POST_COMMENT_ERROR = 'SHOW_POST_COMMENT_ERROR'
export const HIDE_POST_COMMENT_ERROR = 'HIDE_POST_COMMENT_ERROR'


export const requestCommentCreation = (username, text) => ({
    type: REQUEST_COMMENT_CREATION,
    username,
    text
})
export const createComment = (username, date, text) => ({
    type: CREATE_COMMENT,
    username,
    date,
    text
})

export const showPostCommentSuccess = () => ({
    type: SHOW_POST_COMMENT_SUCCESS
})
export const hidePostCommentSuccess = () => ({
    type: HIDE_POST_COMMENT_SUCCESS
})

export const showPostCommentError = () => ({
    type: SHOW_POST_COMMENT_ERROR
})
export const hidePostCommentError = () => ({
    type: HIDE_POST_COMMENT_ERROR
})