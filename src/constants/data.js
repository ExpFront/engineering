export default {
	playlist: {
		memeSource: 'https://www.youtube.com/watch?v=NIy7bTMJ75M',
		question: 'Полноватая любительница припить слегка перебрала в местной рюмочной и не может найти дорогу домой. Помочь ей может только одно — плейлист из трех любимых песен. Перетащите их в плеер, но в идеологически верном порядке: ',
		textError: 'Ну чего ж вы так? Подпитая мадам совсем потерялась и проснулась утром в местном вытрезвителе. Теперь ее ждут штраф и исправительные работы. Ладно, про исправительные работы мы слегка приврали, но все равно ее очень жалко :-(',
		textSuccess: 'Сначала она хотела побыть с тобой. Потом — побыть одна. И только после этого она уехала домой на зеленоглазом такси. Но только благодаря вам, потому что вы справились :-)',
		buttonText: 'Сломать стекло',
		correctAnswers: [
			'Nautilus Pompilius — Я хочу быть с тобой',
			'Игорь Саруханов — Я хочу побыть один',
			'Михаил Боярский — Зеленоглазое такси',
		],
	},
	bear: {
		memeSource: 'https://www.youtube.com/watch?v=oz85fnVr27k',
		question: 'Одинокой медведице стало совсем скучно сидеть в клетке. К тому же, она жутко проголодалась. Чтобы развеселить и покормить милую медведицу, нажмите на нее, когда рука окажется рядом с ней.',
	},
	bells: {
		memeSource: 'https://youtu.be/rEQlHcl9vdk?t=8m49s',
		question: 'Почти все знают, как Макс +100500 начинает свои видосы. Но чтобы ответить на этот вопрос, нужно досмотреть хотя бы один из них до конца. Что он просит сделать вас в конце каждого выпуска?',
		buttonText: 'Ок',
		choices: [
			{
				id: 1,
				text: 'Херачить в Барабанцев',
				value: 'barabantsev',
				imageClassName: 'image_for_bell_1',
				description: 'Вы серьезно? Ну нет же! Е***ить надо в колокольцев!',
			},
			{
				id: 2,
				text: 'Е***ить в Колокольцев',
				value: 'kolokoltsev',
				imageClassName: 'image_for_bell_2',
				description: 'Всё так. Е***ить, а не херачить или фигачить. И только в колокольцев!',
			},
			{
				id: 3,
				text: 'Фигачить в Балалайцев',
				value: 'balalaitsev',
				imageClassName: 'image_for_bell_3',
				description: 'Так Макс точно никогда не говорил, но вариант неплохой. На самом деле, е***ить надо в колокольцев. Почему? Не знаем.',
			},
		],
		correctAnswerId: 2,
	},
	cucumber: {
		memeSource: 'https://www.youtube.com/watch?v=M7T0_xWKmTo',
		question: 'Как известно, самое лучшее лечение геморроя — живой огурец толщиной с большой палец. Если сделать всё правильно, огурец даст вашему сфинктеру прохладу, влажность и, скорее всего, силу земли! Перетащите этапы лечения на пунктир в нужном порядке.',
		textError: 'Где-то вы явно ошиблись. Ведь сперва нужно очистить огурец, откусить верхушечку, затем смочить слюной огурец и задний проход (и только так), а потом уже вставить огурец сами знаете куда, не отрывая при этом ботвы.',
		textSuccess: 'Сила земли ваша! И геморрой пройдет очень быстро — доктор Попов ручается.',
		buttonText: 'Дальше',
		correctAnswers: [
			'очистить огурец',
			'откусить верхушечку',
			'смочить слюной огурец',
			'смочить слюной задний проход',
			'вставить, не отрывая от ботвы',
		],
	},
}
