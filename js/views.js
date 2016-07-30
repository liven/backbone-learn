App.Views.App = Backbone.View.extend({
    initialize: function () {
        var addContact = new App.Views.AddContact({collection: App.contacts});
        var AllContacts = new App.Views.Contacts({collection: App.contacts }).render();
        $('#all-contacts-table').append(AllContacts.el);
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
        this.clearInps();
    },
    clearInps: function(){
        this.$el[0].reset();
        // console.log(this.$el);
    }
});

App.Views.Contacts = Backbone.View.extend({
    initialize: function(){
        this.collection.on('add', this.addOne, this)
    },
    tagName: 'tbody',
    render: function(){
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne: function (contact) {
        var contactView = new App.Views.Contact({model: contact});
        console.log(contactView.render().el);
        this.$el.append(contactView.render().el);
    }
});

App.Views.Contact = Backbone.View.extend({
    tagName: 'tr',
    template: App.template('single-contact'),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});