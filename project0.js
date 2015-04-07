// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'cwolf.cs.sonoma.edu',
    user     : 'mmorrow',
    password : '4013131'
});

var app = module.exports = express.createServer();

// Database setup

connection.query('USE mmorrow', function (err) {
    if (err) throw err;
});

// Configuration

app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu

var htmlHeader = '<html><head><title>Video Game Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

function buildUserView(result) {

    // Build the HTML table from the data in the Games table
    var responseHTML = htmlHeader + '<h1>Game Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Game Title: ' + result[i].GameTitle + '</li>' +
            '<li>Game ID Number: ' + result[i].GameID + '</li>' +
            '<li>Publisher: ' + result[i].Publisher + '</li></ul>'
    }
    responseHTML += htmlFooter;

    // Build the HTML table from the data in the Student table
    var responseHTML = htmlHeader + '<h1>Developer Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Developer: ' + result[i].Developer + '</li></ul>'
    }
    responseHTML += htmlFooter;

    // Build the HTML table from the data in the Student table
    var responseHTML = htmlHeader + '<h1>User Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Username: ' + result[i].Username + '</li>' +
            '<li>Email: ' + result[i].Email + '</li></ul>'
    }
    responseHTML += htmlFooter;

    // Build the HTML table from the data in the Student table
    var responseHTML = htmlHeader + '<h1>Reviews</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Username: ' + result[i].Username + '</li>' +
            '<li>GameID: ' + result[i].GameID + '</li>' +
            '<li>Review: ' + result[i].Review + '</li></ul>'
    }
    responseHTML += htmlFooter;

    // Build the HTML table from the data in the Student table
    var responseHTML = htmlHeader + '<h1>Ratings</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Username: ' + result[i].Username + '</li>' +
            '<li>GameID: ' + result[i].GameID + '</li>' +
            '<li>Rating: ' + result[i].Rating + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

app.get('/', function(req, res) {
    req.query.name
    res.send('<html><head><title>Video Games!</title></head><body>' +
            '<a href="/games/add">Add a Game</a><br />' +
            '<a href="/games/view/table">View Games HTML Table</a>' +
            '<br />' +
            '<a href="/games/update">Update Games</a>' +
            '</body>' +
	    ',a href="/games/delete">Delete Games</a><br />' +
	    '<a href="/developers/add">Add a Developer</a><br />' +
	    '<a href="/developers/view/table">View Developers HTML Table</a><br />' +
	    '<a href="/developers/update">Update Developers</a><br />' +
	    '<a href="/developers/delete">Delete Developers</a><br />' +
	    '<a href="/user/add">Add a User</a><br />' +
	    '<a href="/user/view/table">View Users HTML table</a><br />' +
	    '<a href="/user/update">Update Users</a><br />' +
	    '<a href="/user/delete">Delete Users</a><br />' +
	    '<a href="/reviews/add">Write Review</a><br />' +
	    '<a href="/reviews/view/table">View Reviews HTML Table</a><br />' +
	    '<a href="/reviews/update">Update Reviews</a><br />' +
	    '<a href="/reviews/delete">Delete Reviews</a><br />' +
	    '<a href="/ratings/add">Leave a Rating</a><br />' +
	    '<a href="/ratings/view/table">View Ratings HTML Table</a><br />' +
	    '<a href="/ratings/update">Update Ratings</a><br />' +
	    '<a href="/ratings/delete">Delete Ratings</a><br />' +
	    '</html>'
    );
});

// HTML Example with data populated from the Games table

app.get('/games/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Games';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Games table
                var responseHTML = '<h1>Video Games!</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th></th>' +
                    '<th>Video Game</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].GameID + '</td>' +
                        '<td>' + result[i].GameTitle + '</td>' +
                        '<td><a href="/games/?GameTitle=' + result[i].GameTitle + '">more info</a>' +
                        '<td><a href="/games/edit?GameTitle=' + result[i].GameTitle + '">edit</a>' +
                        '<td><a href="/games/delete?GameTitle=' + result[i].GameTitle + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the Developer table

app.get('/developer/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Developers';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Developers</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>GameID</th>' +
                    '<th>Name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].GameID + '</td>' +
                        '<td>' + result[i].Developer + '</td>' +
                        '<td><a href="/developer/?gameid=' + result[i].GameID + '">more info</a>' +
                        '<td><a href="/developer/edit?gameid=' + result[i].GameID + '">edit</a>' +
                        '<td><a href="/developer/delete?gameid=' + result[i].GameID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the User table                                                                                                                       

app.get('/user/view/table', function (req, res) {

    var myQry = 'SELECT * FROM User';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the User table                                                                                                       
                var responseHTML = '<h1>Users!</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th></th>' +
                    '<th>Users</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned                                                                                                            
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Username + '</td>' +
                        '<td>' + result[i].Email + '</td>' +
                        '<td><a href="/user/?username=' + result[i].Username + '">more info</a>' +
                        '<td><a href="/user/edit?username=' + result[i].Username + '">edit</a>' +
                        '<td><a href="/user/delete?username=' + result[i].Username + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the Reviews table                                                                                                                       

app.get('/reviews/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Reviews';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Reviews table                                                                                                       
                var responseHTML = '<h1>Game Reviews!</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th></th>' +
                    '<th>Reviews</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned                                                                                                            
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].GameID + '</td>' +
                        '<td>' + result[i].Username + '</td>' + '<td>' + result[i].Review + '</td>' +
                        '<td><a href="/reviews/?Review=' + result[i].Review + '">more info</a>' +
                        '<td><a href="/reviews/edit?Review=' + result[i].Review + '">edit</a>' +
                        '<td><a href="/reviews/delete?Review=' + result[i].Review + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the Ratings table                                                                                                                       

app.get('/ratings/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Ratings';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Ratingss table                                                                                                       
                var responseHTML = '<h1>Game Ratings!</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th></th>' +
                    '<th>Rating</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned                                                                                                            
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].GameID + '</td>' +
                        '<td>' + result[i].Username + '</td>' + '<td>' + result[i].Rating + '</td>' + 
                        '<td><a href="/ratings/?rating=' + result[i].Rating + '">more info</a>' +
                        '<td><a href="/ratings/edit?Rating=' + result[i].Rating + '">edit</a>' +
                        '<td><a href="/ratings/delete?Rating=' + result[i].Rating + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// Display a form that allows user to enter games
app.get('/games/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Game</h1>' +
        '<form action="/games/insert" method="GET">' +
        '<input type="hidden" name="GameID" id="GameID" />' +
        '<label for="title">Title</label> <input type="text" name="title" id="title" /><br />' +
        '<label for="publisher">Publisher</label><br /><textarea name="publisher" id="publisher"></textarea><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter developers                                                                                                                              
app.get('/developers/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Developer</h1>' +
        '<form action="/developers/insert" method="GET">' +
        '<input type="hidden" name="GameID" id="GameID" />' +
        '<label for="developer">Developer</label><br /><textarea name="developer" id="developer"></textarea><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter users                                                                                                           
                                                                                                                                                                           
app.get('/user/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a User</h1>' +
        '<form action="/user/insert" method="GET">' +
        '<input type="text" name="Username" id="Username" />' +
	'<input type="text" name="Email" id="Email" />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/reviews/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Write a Review</h1>' +
        '<form action="/reviews/insert" method="GET">' +
        '<input type="text" name="Username" id="Username" />' +
	'<input type="text" name="GameID" id="GameID" />' +
        '<input type="text" name="Review" id="Review" />'+
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/ratings/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Leave a Rating</h1>' +
        '<form action="/ratingss/insert" method="GET">' +
        '<input type="text" name="Username" id="Username" />' +
	'<input type="text" name="GameID" id="GameID" />' +
        '<input type="text" name="Rating" id="Rating" />'+
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter developers
app.get('/games/insert', function(req, res){

    var myQry = 'INSERT INTO Games (GameTitle, Publisher) VALUES (' +
        '\'' + req.query.gameid + '\', ' +
        '\'' + req.query.publisher + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Games WHERE GameID = ' + result.insertId,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No game found for that GameID.');
                        }
                    });
            }
        }
    );
});

// Display a form that allows user to enter developers                                                                                                                    
app.get('/developers/insert', function(req, res){

    var myQry = 'INSERT INTO Developers (GameID, Developer) VALUES (' +
        '\'' + req.query.gameid + '\', ' +
        '\'' + req.query.developer + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Developers WHERE GameID = ' + result.insertId,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No game found for that GameID.');
                        }
                    });
            }
        }
    );
});

// Display a form that allows user to enter developers                                                                                                                    
app.get('/user/insert', function(req, res){

    var myQry = 'INSERT INTO User (Username, Email) VALUES (' +
        '\'' + req.query.username + '\', ' +
        '\'' + req.query.email + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM User WHERE Username = ' + result.username,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('User already exists.');
                        }
                    });
            }
        }
    );
});

// Display a form that allows user to enter review
                                                                                                                    
app.get('/reviews/insert', function(req, res){

    var myQry = 'INSERT INTO Reviews (Username, GameID, Review) VALUES (' +
        '\'' + req.query.username + '\', ' +
        '\'' + req.query.gameid + '\'' +
	'\'' + req.query.review + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Reviews WHERE Username= ' + result.username + ' AND GameID = ' + result.gameid,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('Review from that user for that game already exists.');
                        }
                    });
            }
        }
    );
});

// Display a form that allows user to enter developers                                                                                                                    
app.get('/reviews/insert', function(req, res){

    var myQry = 'INSERT INTO Reviews (GameID, Username, Rating) VALUES (' +
        '\'' + req.query.gameid + '\', ' +
        '\'' + req.query.username + '\'' +
	'\'' + req.query.rating + '\'' +
        ')';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Ratings WHERE GameID = ' + result.gameid, + ' AND Username = ' + result.username,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('Rating from that user for that game already exists.');
                        }
                    });
            }
        }
    );
});

// Display information about a game when given their gameID and allow them to edit it.
app.get('/games/edit', function (req, res) {

    var myQry = 'SELECT * FROM Games WHERE GameID=' + req.query.gameid;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the game table
                var responseHTML = htmlHeader + '<h1>Edit Game Information</h1>';

                responseHTML += '<form action="/games/update" method="GET">';

                //Dynamic populating rows from the records returned
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null
                    //will appear in the input field
                    var location = (result[0].Location == null) ? '' : result[0].Location;

                    responseHTML += 'Name: <input type="text" name="name" id="name" value="' + result[0].GameTitle + '" /><br />' +
                        'Publisher: <input type="text" name="publisher" id="Publisher" value="' + result[0].Publisher + '" /><br />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a developer when given their gameID and allow them to edit it.                                                                                    
app.get('/developers/edit', function (req, res) {

    var myQry = 'SELECT * FROM Developers WHERE GameID=' + req.query.gameid;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the game table                                                                                                   
                var responseHTML = htmlHeader + '<h1>Edit Developer Information</h1>';

                responseHTML += '<form action="/developers/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                                                       
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                                                  
                    //will appear in the input field                                                                                                                      
                    var location = (result[0].Location == null) ? '' : result[0].Location;

                    responseHTML += 'Developer: <input type="text" name="developer" id="name" value="' + result[0].Developer + '" /><br />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a user when given their Username and allow them to edit it.                                                                                    
app.get('/user/edit', function (req, res) {

    var myQry = 'SELECT * FROM User WHERE Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the game table                                                                                                   
                var responseHTML = htmlHeader + '<h1>Edit User Information</h1>';

                responseHTML += '<form action="/user/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                                                       
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                                                  
                    //will appear in the input field                                                                                                                      
                    var location = (result[0].Location == null) ? '' : result[0].Location;

                    responseHTML += 'Userame: <input type="text" name="username" id="username" value="' + result[0].Username + '" /><br />' +
                        'Email: <input type="text" name="email" id="email" value="' + result[0].Email + '" /><br />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a review when given their gameID and username and allow them to edit it.                                                                                    
app.get('/reviews/edit', function (req, res) {

    var myQry = 'SELECT * FROM Reviews WHERE Username=' + req.query.username + ' AND GameID=' + req.query.gameid;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the game table                                                                                                   
                var responseHTML = htmlHeader + '<h1>Edit Review</h1>';

                responseHTML += '<form action="/reviews/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                                                       
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                                                  
                    //will appear in the input field                                                                                                                      
                    var location = (result[0].Location == null) ? '' : result[0].Location;

                    responseHTML += 'Userame: <input type="text" name="username" id="username" value="' + result[0].Username + '" /><br />' +
                        'GameID: <input type="text" name="gameid" id="gameid" value="' + result[0].GameID + '" /><br />' +
			'Review: <input type="text" name="review" id="review" value="' + result[0].Review + '" /><br />' +
			'<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a review when given their gameID and username and allow them to edit it.                                                                    \
                                                                                                                                                                          
app.get('/ratings/edit', function (req, res) {

    var myQry = 'SELECT * FROM Ratings WHERE GameID=' + req.query.gameid + ' AND Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the game table                                                                                                                                                                                                                                                                         
                var responseHTML = htmlHeader + '<h1>Edit Rating</h1>';

                responseHTML += '<form action="/ratings/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                                                      
                                                                                                                                                                         
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                                                
                                                                                                                                                                         
                    //will appear in the input field 
                                                                                                                                                                          
                    var location = (result[0].Location == null) ? '' : result[0].Location;

                    responseHTML += 'Userame: <input type="text" name="username" id="username" value="' + result[0].Username + '" /><br />' +
                        'GameID: <input type="text" name="gameid" id="gameid" value="' + result[0].GameID + '" /><br />' +
			'Rating: <input type="text" name="review" id="review" value="' + result[0].Review + '" /><br />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});


// Update a game's title and publisher given their GameID
app.get('/games/update', function (req, res) {

    var myQry = 'UPDATE Games SET GameTitle="' + req.query.gametitle + '", Publisher="' + req.query.publisher + '" WHERE GameID=' + req.query.GameID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Games WHERE GameID = ' + req.query.gameid,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No game found for that GameID.');
                        }
                    });
            }
        }
    );
});

// Update a game's developer given their GameID                                                                                                        
app.get('/developers/update', function (req, res) {

    var myQry = 'UPDATE Developers SET Developer="' + req.query.developer + '" WHERE GameID=' + req.query.gameid;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Developers WHERE GameID = ' + req.query.gameid,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No game found for that GameID.');
                        }
                    });
            }
        }
    );
});

// Update a user's email and username given their username
                                                                                                        
app.get('/user/update', function (req, res) {

    var myQry = 'UPDATE User SET Username="' + req.query.username + '", Email="' + req.query.email + '" WHERE Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM User WHERE Username = ' + req.query.username,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No user found for that Username.');
                        }
                    });
            }
        }
    );
});

// Update a review given their Username and GameID                                                                                                        
app.get('/reviews/update', function (req, res) {

    var myQry = 'UPDATE Reviews SET Review="' + req.query.review + '" WHERE GameID=' + req.query.gameid + '" AND Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Reviews WHERE GameID = ' + req.query.gameid + ' AND Username = ' + req.query.username,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No review of that game found for that user.');
                        }
                    });
            }
        }
    );
});

// Update a games's rating given their GameID and Username
                                                                                                       
app.get('/ratings/update', function (req, res) {

    var myQry = 'UPDATE Ratings SET Rating="' + req.query.rating + '" WHERE GameID=' + req.query.GameID + '" AND Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Ratings WHERE GameID = ' + req.query.gameid + ' AND Username = ' + req.query.username,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No rating of that game found for that User.');
                        }
                    });
            }
        }
    );
});

// Route for deleting a game record from the database.

app.get('/games/delete', function (req, res) {

    var myQry = 'DELETE FROM Games WHERE GameID=' + req.query.gameid;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('GameID ' + req.query.gameid + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a developer record from the database.                                                                                                               
app.get('/developers/delete', function (req, res) {

    var myQry = 'DELETE FROM Developers WHERE Developer=' + req.query.developer;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Developer ' + req.query.developer + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a User record from the database. 
                                                                                                              
app.get('/user/delete', function (req, res) {

    var myQry = 'DELETE FROM User WHERE Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('User ' + req.query.username + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a Review from the database.
                                                                                                               
app.get('/reviews/delete', function (req, res) {

    var myQry = 'DELETE FROM Reviews WHERE GameID=' + req.query.gameid + ' AND Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Review of ' + req.query.gameid + ' by ' +req.query.username + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a Rating from the database.                                                                                                                       

app.get('/ratings/delete', function (req, res) {

    var myQry = 'DELETE FROM Ratings WHERE GameID=' + req.query.gameid + ' AND Username=' + req.query.username;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Rating of ' + req.query.gameid + ' by ' +req.query.username + ' successfully deleted.');
            }
        }
    );
});



// Begin listening

app.listen(8031);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
