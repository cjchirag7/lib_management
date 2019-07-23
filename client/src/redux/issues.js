import * as ActionTypes from './ActionTypes';

const Issues = (state = { isLoading: true,
    errMess: null,
    issues:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ISSUES:
            return {...state, isLoading: false, errMess: null, issues: action.payload};

        case ActionTypes.ISSUES_LOADING:
            return {...state, isLoading: true, errMess: null, issues: []}

        case ActionTypes.ISSUES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_ISSUE:
            var issue = action.payload;
            return { ...state, issues: state.issues.concat(issue)};

        case ActionTypes.RETURN_ISSUE:
            var newissue = action.payload;
            return { ...state, issues: state.issues.map((issue)=>
                {
                if(issue._id===newissue._id)
                {
                    return newissue;
                }
            else {
                    return issue;
            }
                 })
                }

        default:
            return state;
    }
};
export default Issues;