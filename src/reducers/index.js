
import { combineReducers } from 'redux';

import utility from './utility';
import re_use_function from './reuse/reuse';
import bar_reducer from './bar_reducer';
import article from './article';
import img from './image';
const reducers = combineReducers({
	utility: utility,
	bar_reducer: bar_reducer,
	re_use_function:re_use_function,
	article: article,
	img: img,
});
export default reducers;