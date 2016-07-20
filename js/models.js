App.Models.Contact = Backbone.Model.extend({
    validate: function(attr){
        if (!attr.first_name || !attr.first_name )  {
            return 'Не заданы имя или фамилия'
        }
    },
    initialize: function(){
        this.on('invalid', function(error){
            alert(error.validationError);
        }
        )
    }

});