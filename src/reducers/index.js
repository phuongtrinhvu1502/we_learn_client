
import { combineReducers } from 'redux';

import utility from './utility';
import re_use_function from './reuse/reuse';
import bar_reducer from './bar_reducer';
import article from './article';
import img from './image';
import viewQA from './viewQA';
import qa from './qa';
import viewArticle from './viewArticle';
import home from './homepage';
import test from './test';
import topic from './topic';
import art from './art';
import user_test from './user_test';
const reducers = combineReducers({
	utility: utility,
	bar_reducer: bar_reducer,
	re_use_function: re_use_function,
	article: article,
	img: img,
	viewQA: viewQA,
	viewArticle: viewArticle,
	qa: qa,
	home: home,
	test: test,
	topic: topic,
	art: art,
	user_test: user_test,
});
export default reducers;