$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("ldfim1DZbt6dJQ01EUXjqZWVTstmOr00UxcVnpaZ", "SdgQbILWScEOcyeiKm9iDRYyMwF9zrOpMyzA7Wi4");
 	

    var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
		model: Blog
	});
	var blogs = new Blogs();
	blogs.fetch({
		success: function(blogs){
			var blogsView = new BlogsView({collection:blogs});
			blogsView.render();
			$('.main-container').html(blogsView.el);
			console.log(blogs);
		},
		error: function(blogs, error){
			console.log(error);
		}
	});

	var BlogsView =  Parse.View.extend({
    	template: Handlebars.compile($('#blogs-tpl').html()),
    	render: function(){ 
        	var collection = { blog: this.collection.toJSON() };
        	this.$el.html(this.template(collection));
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

