App.Views.App = Backbone.View.extend({
    initialize: function () {
        var addContact = new App.Views.AddContact({collection: App.contacts});
    }
});

App.Views.AddContact = Backbone.View.extend({
    el: '#contact-form',
    events: {
       'submit': 'addContact'
    },
    addContact: function (event) {
        event.preventDefault();
        var newContact = this.collection.create({
            first_name: this.$('#first_name').val(),
            last_name: this.$('#last_name').val(),
            email: this.$('#email').val(),
            description: this.$('#description').val()
        }, { wait:true });
        console.log(newContact);
        console.log(this.collection.toJSON());
    }
});