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
	var Blog = Parse.Object.extend('Blog', {
		create : function(title, content){
			var cd = new Date();
			var t = cd.getUTC
			var d= cd.getDate();
			var m=cd.getMonth()+1;
			var y=cd.getFullYear();
			var ajuste = -1*cd.getTimezoneOffset()/60;
			var h=cd.getUTCHours();
			var min=cd.getUTCMinutes();
			var sec=cd.getUTCSeconds();
			var tiempo = ( h + ajuste)+":"+min+":"+sec;
			var fecha = d+"/"+m+"/"+y+" at "+( h + ajuste)+":"+min;
			this.save({
				'title' : title,
				'content' : content,
				'author' : Parse.User.current(),
				'authorName' : Parse.User.current().get('username'),
				'time' : fecha//new Date().toDateString()
			},{
				success : function(blog){
					alert("You added a new post: " + blog.get('title'));
				},
				error : function(blog, error){
					console.log(blog);
					console.log(error);
				}
			});
		}
	});

	var AddBlogView = Parse.View.extend({
		template : Handlebars.compile($('#add-tpl').html()),
		events : {
			'submit .form-add' : 'submit'
		},
		submit : function(e){
			//submit new post
			e.preventDefault();
			var data = $(e.target).serializeArray(),
				//Create a new isntace of blog
				blog = new Blog();
				//call .create()
				blog.create(data[0].value,data[1].value);
		},
		render : function(){
			this.$el.html(this.template());
		}
	});

	var WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        events : {
			'click .add-blog' : 'add'
		},
		add : function(){
			var addBlogView = new AddBlogView();
		    addBlogView.render();
		    $('.main-container').html(addBlogView.el);
		},
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    });


	var LoginView = Parse.View.extend({
    	template: Handlebars.compile($('#login-tpl').html()),
    	events: {
        	'submit .form-signin': 'login'
    	},
    	login: function(e) {
 
        	// Prevent Default Submit Event
        	e.preventDefault();
 
       		// Get data from the form and put them into variables
	        var data = $(e.target).serializeArray(),
	            username = data[0].value,
	            password = data[1].value;
 
	        // Call Parse Login function with those variables
	        Parse.User.logIn(username, password, {
	            // If the username and password matches
	            success: function(user) {
	                //alert('Welcome!');
	                var welcomeView = new WelcomeView({ model: user });
				    welcomeView.render();
				    $('.main-container').html(welcomeView.el);
	            },
	            // If there is an error
	            error: function(user, error) {
	                console.log(error);
	            }
	        });
    	},
	        render: function(){
	        this.$el.html(this.template());
	    }
	})
	
	

	var loginView = new LoginView();
	loginView.render();
	$('.main-container').html(loginView.el);

	


	/*
	var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        render: function(){
            this.$el.html(this.template());
        }
    }),
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    });

	*/

    /*
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
	*/
 
});

