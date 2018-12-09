
const initialState = {
    testItem: {
        results: [],
        total: 0,
    },
    lstTest: [],
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    countFetchById: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const test = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_ALL_TEST':
            return {
                ...state, lstTest: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'VIEW_TEST_BY_ID':
            return {
                ...state, testItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'USER_DO_TEST':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        default:
            return state;
    }
}
export default test