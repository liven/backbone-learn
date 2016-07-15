// Хелпер шаблона
var template = function (id) {
    return _.template($('#' + id).html());
};

//Модель человека
var Person = Backbone.Model.extend({
    defaults: {
        name: 'Dima',
        age: 23,
        job: 'Developer'
    }
});
//Список людей
var PeopleCollection = Backbone.Collection.extend({
     //Модель по умолчанию
      model: Person
});

// Вид списка людей
var PeopleView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
        // console.log(this);
    },
    render: function () {
        // Пройтись по всему списку и срендерить PersonView
        this.collection.each(function (person) {
            var personView = new PersonView({model:person});
            //Обратите внимание на цепной метод
            this.$el.append(personView.render().el);
        }, this);
        return this;
    }
});

// Вид представления одного человека
var PersonView = Backbone.View.extend({
    // Работает как конструктор класса - вызывается при создании обьекта данного типа
    initialize: function () {
       // console.log(this.model);
    },
    tagName: 'li',
    template: template('person-id'),
    className: 'person',
    id: 'some-person',
    render: function () {
        var model = this.model;
        this.$el.html(this.template(model.toJSON()));
        // Возвращаем для цепного метода
        return this;
    }
});

// Можно указать в конструкторе модели как обьекты моделей, так и атрибуты, они применятся к модели
var peopleCollection = new PeopleCollection([
    {
        name: 'Иван',
        age: 20,
        job: 'Студент'
    },
    {
        name: 'Василий',
        age: 25,
        job: 'Developer'
    },
    {
        name: 'Анна',
        age: 23,
        job: 'Developer'
    }
]);

var peopleView = new PeopleView({collection: peopleCollection});
//Не забудьте Document.ready!!
$(function () {
    $(document.body).append(peopleView.render().el);
});
