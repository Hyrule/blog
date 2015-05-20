$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("ldfim1DZbt6dJQ01EUXjqZWVTstmOr00UxcVnpaZ", "SdgQbILWScEOcyeiKm9iDRYyMwF9zrOpMyzA7Wi4");
 
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});