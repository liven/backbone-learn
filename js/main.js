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

var PersonView = Backbone.View.extend({
    // Работает как конструктор класса - вызывается при создании обьекта данного типа
    initialize: function () {
       console.log(this.model);
    },
    tagName: 'li',
    className: 'person',
    id: 'some-person',
    render: function () {
        var model = this.model;
        //Антипаттерн, далее - шаблонизаторы
        this.$el.html(model.get('name') +'(' + model.get('age') + ' - '+ model.get('job') + ' )');
    }
});

var person = new Person;
// Прикрепляем моель к вьюхе
var view = new PersonView({model:person});




//В консоли необходимо создать обьект Person и назначить невалидные данные:  person.set({'name': ''}, {validate:true})
Person.prototype.on('invalid', function(model, error){
    console.log(error);
});