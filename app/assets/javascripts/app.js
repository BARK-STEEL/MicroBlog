console.log('...scripts loaded');

$(document).ready(function(){
  console.log('hi');
  $('#fontSelect').material_select();
  $('.profile-pic').on('click', function(){
    $this = $(this);
    $this.css({transform:'rotate(3600deg)'});
    setTimeout(function(){
      $this.attr('src', $('#pic2').val());
    }, 850);
  });
  $('#posting').on('mouseenter', function(){
    $(this).addClass('z-depth-2');
  });
  $('#posting').on('mouseleave', function(){
    $(this).removeClass('z-depth-2');
  });
  $('.profile-pic').on('mouseenter', function(){
    $(this).addClass('z-depth-2');
  });
  $('.profile-pic').on('mouseleave', function(){
    $(this).removeClass('z-depth-2');
  });
  $('#posts-container').css('font-family', $('#font').val());
  // $('body').css({backgroundColor: $('#color').val() , backgroundImage: "url('http://www.transparenttextures.com/patterns/white-diamond.png')"} );
  $('#posts-container').on('mouseenter', function(){
    $(this).addClass('z-depth-2');
  });
  $('#posts-container').on('mouseleave', function(){
    $(this).removeClass('z-depth-2');
  });

});

var token = $('#api-token').val();
$.ajaxSetup({
  headers: {
    "accept": 'application/json',
    "token": token
  }
});

var app = app || {};

// Backbone
app.Post = Backbone.Model.extend({
  defaults:{}
});

app.PostCollection = Backbone.Collection.extend({
  model: app.Post,
  url: '/api/posts'
});

app.PostView = Backbone.View.extend({
  tagName: 'article',
  className: 'post z-depth-1',
  template: _.template( $('#post-template').html() ),
  render: function(){
    this.$el.empty();
    var $html = $(this.template( this.model.toJSON() ));
    this.$el.append( $html );
  },
  events: {
    'click button#remove': 'removePost'
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
    var day;
    var date = new Date();
    var dateCustom = this.date || date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
    var posts = this.collection.models.filter(function(post){
      day = new Date(post.get("created_at"));
      return day.getMonth()+1 + '/' + day.getDate() + '/' + day.getFullYear() === dateCustom;
    });
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
  el: $('#posts-container'),
  date: null
});
app.posts.fetch();

// Post Creation
$('form#create-post').on('submit', function(e){
  e.preventDefault();
  var title = $('#title').val();
  var content = $('#content').val();
  var created_at = new Date();
  var dateFormat = created_at.toISOString();
  app.posts.create({title: title, content: content, created_at: dateFormat});
  $('#title').val("");
  $('#content').val("");
});

// Grabs date from datepicker and sends it to the ListView and the profile
$('#dateButton').on('click', function(){
  var date = $('.datepicker').val();
  console.log(date);
  $('#journalDate').html(date);
  app.postPainter.date=date;
  app.postPainter.render();
  $('.datepicker').val("");
});

// Datepicker initiator
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'm/d/yyyy'
  });
