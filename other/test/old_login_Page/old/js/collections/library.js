var app = app || {};

app.Library = Backbone.Collection.extend({
	model: app.Book,
	url: 'http://localhost:4711/api/books'
});
