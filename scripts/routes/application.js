/**
 * Application - маршрут по умолчанию
 * Загружаем модели для этого маршрута и настраиваем соотв. контроллер
 */
App.ApplicationRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            m_Answer: App.Answer.create(),
            m_Level: App.Level.create(),
            m_Result: App.Result.create()
        });
    },
    setupController: function(controller, models) {
        controller.set('m_Answer', models.m_Answer);
        controller.set('m_Level', models.m_Level);
        controller.set('m_Result', models.m_Result);
    }
});