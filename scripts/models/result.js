/**
 * Модель хранения времени ответов
 */
App.Result = Ember.Object.extend({
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
    /**
     * Получаем среднее время ответа пользователя
     * @param {number} limit количество последних ответов
     * @returns {number}
     */
    getAvg: function(limit) {
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

        return this.prepareTime(sum / count);
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