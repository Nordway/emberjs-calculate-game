/**
 * Модель уровней сложности
 */
App.Level = Ember.Object.extend({
	/** @type {number} Минимальное значение числа */
	min: 1,
	/** @type {number} Максимальное значение числа */
	max: 9,
	/** @type {Array} Доступные уровни сложности */
	levels: [
		{ name: 'Лёгкий', min: 1, max: 9 },
		{ name: 'Средний', min: 10, max: 99 },
		{ name: 'Сложный', min: 100, max: 999 },
		{ name: 'Божественный', min: 1000, max: 9999 },
		{ name: 'Что ты такое?!', min: 10000, max: 99999 },
		{ name: 'Ой, всё!', min: 100000, max: 999999 }
	],
	/**
	 * Установка минимального и максимального значения
	 * @param level
	 */
	setLevel: function(level) {
		this.min = this.levels[level].min;
		this.max = this.levels[level].max;
	},
	/**
	 * Получение случайного значения из установленного диапазона
	 * @returns {number}
	 */
	getRandom: function() {
		return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
	}
});