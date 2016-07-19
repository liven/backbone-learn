(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    // Хелпер шаблона
    window.template = function (id) {
        return _.template($('#' + id).html());
    };
    App.Router = Backbone.Router.extend({
        routes: {
            ''                : 'index',
            'page/:id/*simbo' : 'page',
            'search/:query'   : 'search',
            '*other'          : 'default'
        },
        index: function () {
            console.log('Всем привет от индексного роута');
        },
        page: function (id, simbo) {
            console.log('Это роут page ' + id + ' !!!!!');
            console.log(simbo);
        },
        search: function (query) {

        },
        default: function (other) {
            alert('Страница не найдена');
        }

    });
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
        },
        initialize: function () {
            this.collection.on('add', this.addOne, this);
        }
    });
    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',

        events: {
            'submit': 'submit'
        },
        submit: function (event) {
            event.preventDefault();
            var newTaskTitle = $(event.currentTarget).find('input[type=text]').val();
            var task = new App.Models.Task({title:newTaskTitle});
            this.collection.add(task);
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
        var addTaskView = new App.Views.AddTask({collection: tasksCollection});

        new App.Router;
        Backbone.history.start(); //Чтобы Backbone отслеживал историю
    });
}());
