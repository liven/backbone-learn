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

//В консоли необходимо создать обьект Person и назначить невалидные данные:  person.set({'name': ''}, {validate:true})
Person.prototype.on('invalid', function(model, error){
    console.log(error);
});