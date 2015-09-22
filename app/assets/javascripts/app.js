console.log('...scripts loaded');

var token = $('#api-token').val();
$.ajaxSetup({
  headers: {
    "accept": 'application/json',
    "token": token
  }
});

var app = app || {};

app.Post = Backbone.Model.extend({
  defaults:{
    title: 'tbd',
    content: 'tbd'
  }
});

app.PostCollection = Backbone.Collection.extend({
  model: app.Post,
  url: '/api/posts'
});

app.PostView = Backbone.View.extend({
  tagName: 'article',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  render: function(){
    this.$el.empty();
    var $html = $(this.template( this.model.toJSON() ));
    this.$el.append( $html );
  },
  events: {
    'click button.remove': 'removePost'
  },
  removePost: function(){
    this.model.destroy();
    this.$el.remove();
  }
});

app.PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.collection, 'add', this.render );
  },
  render: function(){
    this.$el.empty();
    var posts = this.collection.models;
    var view;
    for (var i = 0; i < posts.length; i++){
      view = new app.PostView( { model:posts[i] } );
      view.render();
      this.$el.append( view.$el );
    }
  }
});

app.posts = new app.PostCollection();
app.postPainter = new app.PostListView({
  collection: app.posts,
  el: $('#posts-container')
});
app.posts.fetch();

$('form#create-post').on('submit', function(e){
  e.preventDefault();
  var title = $(this).find('#title').val();
  var content = $(this).find('#content').val();
  app.posts.create({title: title, content: content});
  $('#title').val("");
  $('#content').val("");
});
