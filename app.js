var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
var session = require('client-sessions');

var app = express();

// all environments
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    
	activeDuration: 30 * 60 * 1000,  }));
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.welcome);
//app.post('/basicSignUp',home.basicSignUp);
app.post('/addrSignup',home.addrSignup);
app.post('/addrInterests',home.addrInterests);

//app.get('/', home.signin);
app.get('/showSignup',home.showSignup);

//app.get('/', home.signin);
app.get('/profile',home.profile);
app.get('/signin', home.signin);
app.post('/signUp',home.signUp);
app.post('/afterSignIn', home.afterSignIn);
app.post('/submitPost',home.submitPost);
app.post('/submitMessage', home.submitMessage);
app.get('/getPosts',home.getPosts);
app.get('/getAllPosts',home.getAllPosts);
app.post('/searchPosts', home.searchPosts);
app.post('/createGroup',home.createGroup);
app.get('/redirectToGrp', home.redirectToGrp);
app.get('/getUserGroups',home.getUserGroups);
app.get('/logout',home.logout);
app.get('/getUserProfile/:profileid',home.getUserProfile);
app.get('/getMessages', home.getMessages);
app.get('/getNeighbours', home.getNeighbours);
app.get('/getRecommendations',home.getRecommendations);
app.post('/getcatPosts',home.getcatPosts);
app.get('/getDetails',home.getDetails);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
