/**
 * Модель хранения времени ответов
 */
App.Result = Ember.Object.extend({
    /** @type {number|float} Лучшее время вычисления */
    timeBest: 0.0,
    /** @type {number|float} Худшее время вычисления */
    timeWorst: 0.0,
    /** @type {number|float} Среднее время вычисления */
    avg: 0.0,
    /** @type {number|null} Время старта раунда */
    t_start: null,
    /** @type {number|null} Время получения ответа */
    t_finish: null,
    /** @type {Array} Времена ответов пользователя */
    times: [],
    /**
     * Сохранение времени ответа
     * @param t_diff
     */
    save: function(t_diff) {
        this.times.unshiftObject(t_diff);
    },
    /** Сбрасываем все результаты */
    reset: function() {
        this.set('timeBest', 0.0);
        this.set('timeWorst', 0.0);
        this.set('avg', 0.0);
        this.set('times', []);
    },
    /**
     * Получаем среднее время ответа пользователя
     * @param {number} limit количество последних ответов
     * @returns {number}
     */
    setAvg: function(limit) {
        var sum = 0;
        var count = 0;

        if (limit == 0) {
            limit = this.times.length;
        }

        for (var i = 0; i < limit; i++) {
            if (this.times[i]) {
                sum += this.times[i];
                count += 1;
            }
        }

        this.set('avg', this.prepareTime(sum / count));
    },
    /** Устанавливаем лучшее и худшее времена */
    setBestAndWorst: function() {
        var min = this.times[0];
        var max = 0;

        if (this.times.length == 1) {
            this.set('timeBest', this.prepareTime(min));
            return;
        }

        for (var i = 0; i < this.times.length; i++) {
            if (this.times[i] < min) {
                min = this.times[i];
            } else if (this.times[i] > max) {
                max = this.times[i];
            }
        }

        this.set('timeBest', this.prepareTime(min));
        this.set('timeWorst', this.prepareTime(max));
    },
    /**
     * Получаем время ответа пользвоателя
     * @returns {number}
     */
    getDiff: function() {
        this.t_finish = performance.now();
        return this.t_finish - this.t_start;
    },
    /**
     * Переводим время в удобный для чтения формат
     * @param {number} time
     * @returns {string}
     */
    prepareTime: function(time) {
        return (parseFloat(time) / 1000).toFixed(4);
    }
});