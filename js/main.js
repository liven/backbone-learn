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

    });
    App.Collections.Tasks = Backbone.Collection.extend({
        model: App.Models.Task,
        url: "/server.php/tasks"
    });
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',
        initialize: function () {
           this.collection.on('add', this.addOne, this)
        },
        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task){
            var taskView = new App.Views.Task({model:task});
            this.$el.append(taskView.render().el);
        }
    });
    App.Views.Task = Backbone.View.extend({
        tagName: 'li',
        initialize: function () {
            this.model.on('destroy', this.remove, this)
        },
        render: function() {
            this.$el.html(this.model.get('title'));
            return this;
        }
    })
});
