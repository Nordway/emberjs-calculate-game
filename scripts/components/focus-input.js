/**
 * Компонент для фокуса поля ввода после старта игры
 */
App.FocusInputComponent = Ember.TextField.extend({
    becomeFocused: function() {
        this.$().focus();
    }.on('didInsertElement')
});