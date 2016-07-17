(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    // Хелпер шаблона
    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    App.Models.Task = Backbone.Model.extend({
        validate: function (attrs) {
            if (! $.trim(attrs.title)) {
                return 'Имя задачи должно быть валидным'
            }
        }
    });
    App.Collections.Task = Backbone.Collection.extend({
        model: App.Models.Task
    });
    App.Views.Task = Backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: 'li',
        template: template('taskTemplate'),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        remove: function(){
            this.$el.remove();
        },
        events:{
            'click .edit': 'editTask',
            'click .delete': 'deleteTask'
        },
        editTask: function () {
            var newTaskTitle = prompt('Как переименуем задачу?', this.model.get('title'));
            this.model.set({title: newTaskTitle}, {validate:true});
        },
        deleteTask: function () {
            this.model.destroy();
        }
    });
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',
        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (task) {
            // Создавать новый вид
            var taskView = new App.Views.Task({model:task});
            // Добавлять его в корневой элемент
            this.$el.append(taskView.render().el)
        }
    });


    var tasksCollection = new App.Collections.Task([
        {
            title: 'Сходить в магазин',
            priority: 4
        },
        {
            title: 'Получить почту',
            priority: 3
        },
        {
            title: 'Сходить на работу',
            priority: 5
        }
    ]);
    var tasksView = new App.Views.Tasks({collection: tasksCollection});


    $(function () {
        $('div.tasks').html(tasksView.render().el);
    });
}());
