//Модель человека
var Person = Backbone.Model.extend({
    defaults: {
        name: 'Dima',
        age: 23,
        job: 'Developer'
    },
    validate: function (attrs) {

        if (attrs.age <= 0) {
            return 'Возраст должен быть больше 0'
        }

        if (!attrs.name) {
            return 'Имя не должно быть пустым'
        }

    },
    walk: function () {
        return this.get('name') + ' is walking';
    }
});
//Список людей
var PeopleCollection = Backbone.Collection.extend({
     //Модель по умолчанию
      model: Person
});

// Вид представления одного человека
var PersonView = Backbone.View.extend({
    // Работает как конструктор класса - вызывается при создании обьекта данного типа
    initialize: function () {
       console.log(this.model);
    },
    tagName: 'li',
    template: '#person-id',
    className: 'person',
    id: 'some-person',
    render: function () {
        var model = this.model;
        var template = _.template($(this.template).html());
        this.$el.html(template(model.toJSON()));
    }
});

var person = new Person({name: 'Anna Putintseva'});
var person2 = new Person({name: 'Vasya Mazepin'});

// Прикрепляем модель к вьюхе
var view = new PersonView({model:person});
var view2 = new PersonView({model:person2});

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

//В консоли необходимо создать обьект Person и назначить невалидные данные:  person.set({'name': ''}, {validate:true})
Person.prototype.on('invalid', function(model, error){
    console.log(error);
});