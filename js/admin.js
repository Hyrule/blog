$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("ldfim1DZbt6dJQ01EUXjqZWVTstmOr00UxcVnpaZ", "SdgQbILWScEOcyeiKm9iDRYyMwF9zrOpMyzA7Wi4");
 	
 	/*$('.form-signin').on('submit', function(e){
 		//Prevent default submint event
 		e.preventDefault();
 		//Get the data from the form and put them into variables
 		var data = $(this).serializeArray(),
 			username = data[0].value,
 			password = data[1].value;
 		//Call parse login function with those variables
 		Parse.User.logIn(username, password, {
 			//if the username and password matches
 			success: function(user){
 				alert("Welcome!");
 			},
 			error: function(user, error){
 				console.log(error);
 			}
 		});

 	});
*/
 	var LoginView = Parse.View.extend({
	 		template: Handlebars.compile($('#login-tpl').html()),
	 		events: {
	 			'submint .form-signin': 'login'
	 		},
	 		login: function(e){
	 			e.preventDefault();
	 			var data=$(e.target).serializeArray(),
	 				username = data[0].value,
	 				password = data[1].value;

	 			Parse.User.logIn(username,password,{
	 				success:function(user){
	 					alert('Welcome!');
	 				},
	 				error: function(user, error){
	 					console.log(error);
	 				}
	 			});
	 		},
	 		render:function(){
	 			this.$el.html(this.template());
	 		}
 		}),
 		WelcomeView = Parse.View.extend({
 			template: Handlebars.compile($('welcome-tpl').html()),
 			render: function(){
 				var attributes = this.model.toJSON();
 				this.$el.html(this.template(attributes));
 			}
 	});

	

    /*
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });

	

	*/
 
});

