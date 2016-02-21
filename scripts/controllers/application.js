/**
 * Контроллер (по умолчанию)
 */
App.ApplicationController = Ember.Controller.extend({
    /** @type {Array|*|*[]} Модель с ответами */
    m_Answer: null,
    /** @type {Array|*|*[]} Модель с уровнями сложности */
    m_Level: null,
    /** @type {Array|*|*[]} Модель с результатами */
    m_Result: null,

    /** @type {number} Текущий уровень сложности */
    current_level: 0,
    /** @type {boolean} Состояние игры */
    game_pause: true,
    /** @type {string} Вычисляемое выражение */
    expression: 'Вы готовы?',

    /** @type {float} Среднее время вычисления */
    avg: 0.0,
    /** @type {string} Верный ответ (компьютера) */
    compResult: '',
    /** @type {string} Ответ пользователя */
    userResult: '',

    /** Список доступных экшенов лоя контроллера */
    actions: {
        /** Запускаем игру */
        startGame: function() {
            this.set('game_pause', false);
            this.m_Level.setLevel(this.current_level);
            this.startNewRound();
        },
        /** Останавливаем игру */
        stopGame: function() {
            this.set('game_pause', true);
            this.set('expression', 'Вы готовы?');
        },
        /**
         * Обрабатываем ответ пользователя
         * и запускаем новый раунд
         * @param result
         */
        addResult: function(result) {
            if (result != this.compResult) {
                return;
            }

            var t_diff = this.m_Result.getDiff();
            this.m_Result.save(t_diff);
            this.m_Answer.save(this.expression, result, this.m_Result.prepareTime(t_diff));
            this.set('avg', this.m_Result.getAvg(10));
            this.startNewRound();
        }
    },
    /** Новый раунд. Генерируем выражение для вычисления */
    startNewRound: function() {
        var value_a = this.m_Level.getRandom();
        var value_b = this.m_Level.getRandom();
        this.set('expression', value_a + ' + ' + value_b + ' = ');
        this.set('compResult', value_a + value_b);
        this.set('userResult', '');
        this.m_Result.t_start = performance.now();
    }
});