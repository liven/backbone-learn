App.Collections.Contacts = Backbone.Collection.extend({
    model: App.Models.Contact,
    url: '/server.php/contacts'
});