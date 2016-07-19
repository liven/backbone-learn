$(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    App.Models.Task = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },
        urlRoot: function(){
            return "/server.php/tasks"
        }

    })
});
