// Steps
import IntroStep from '../components/Steps/Intro'
import TestStep from '../components/Steps/Test' // Step for all tests with multiple choices
import BearStep from '../components/Steps/Bear'
import PlaylistStep from '../components/Steps/Playlist'
import BellsStep from '../components/Steps/Bells'
import CucumberStep from '../components/Steps/Cucumber'
import DoneStep from '../components/Steps/Done'
import AuthStep from '../components/Steps/Auth'

import testQuestions from './test-questions'
import data from './data'

const steps = [
	{
		type: 'intro',
		component: IntroStep,
		params: {},
	},
	{
		type: 'kandibober',
		component: TestStep,
		params: {
			data: testQuestions['kandibober'],
			progressQuestion: 'Ибрагим вам что-нибудь говорит?',
		},
	},
	{
		type: 'playlist',
		component: PlaylistStep,
		params: {
			data: data['playlist'],
			progressQuestion: 'Я ломааааал стеклооооо!',
		},
	},
	{
		type: 'flag',
		component: TestStep,
		params: {
			data: testQuestions['flag'],
			progressQuestion: 'Конечно, мы знаем, что сегодня день флага Российской Федерации',
		},
	},
	{
		type: 'cucumber',
		component: CucumberStep,
		params: {
			data: data['cucumber'],
			progressQuestion: 'И геморрой проходит очень быстро!',
		},
	},
	{
		type: 'escobar',
		component: TestStep,
		params: {
			data: testQuestions['escobar'],
			progressQuestion: 'У нас, так сказать, свое мировоззрение',
		},
	},
	{
		type: 'bear',
		component: BearStep,
		params: {
			data: data['bear'],
			progressQuestion: 'Не лезь, она тебя сожрет!',
		},
	},
	{
		type: 'bike',
		component: TestStep,
		params: {
			data: testQuestions['bike'],
			progressQuestion: 'Вотафак мазафака!',
		},
	},
	{
		type: 'bells',
		component: BellsStep,
		params: {
			data: data['bells'],
			progressQuestion: 'Это было +100500. Меня зовут Максим. Пока!',
		},
	},
	{
		type: 'done',
		component: DoneStep,
		params: {},
	},
	{
		type: 'auth',
		component: AuthStep,
		params: {},
	},
]

export default steps
