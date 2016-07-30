App.Views.App = Backbone.View.extend({
    initialize: function () {
        var addContact = new App.Views.AddContact({collection: App.contacts});
        var AllContacts = new App.Views.Contacts({collection: App.contacts }).render();
        $('#all-contacts-table').append(AllContacts.el);
        vent.on('contact:edit', this.editContact, this);
    },
    editContact: function(contact){
        var editContact = new App.Views.EditContact({model: contact});
        $('.contact-form-block').html(editContact.el);
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
    }
});

App.Views.EditContact = Backbone.View.extend({
    template: App.template('edit-contact'),
    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    initialize: function(){
        this.render();
        this.form = this.$('#edit_contact-form');
        this.firstName = this.form.find('#edit_first_name');
        this.lastName = this.form.find('#edit_last_name');
        this.email = this.form.find('#edit_email');
        this.description = this.form.find('#edit_description');
    },
    events: {
        'submit #edit_contact-form': 'submit',
        'click button.cancel': 'cancel'
    },
    cancel: function () {
        this.remove();
    },
    submit: function(e){
        e.preventDefault();
        var upContact = {
            first_name: this.firstName.val(),
            last_name: this.lastName.val(),
            email: this.email.val(),
            description: this.description.val()
        };
        this.model.save(upContact);
        this.remove();
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
        this.$el.append(contactView.render().el);
    }
});

App.Views.Contact = Backbone.View.extend({
    initialize: function(){
        this.model.on('destroy', this.unrender, this);
        this.model.on('change', this.render, this);
    },
    unrender: function(){
        this.remove();
    },
    events: {
        'click a.delete' :'removeContact',
        'click a.edit' :'editContact'
    },
    editContact: function(){
        vent.trigger('contact:edit', this.model);
    },
    removeContact: function(){
        this.model.destroy();
    },
    tagName: 'tr',
    template: App.template('single-contact'),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});