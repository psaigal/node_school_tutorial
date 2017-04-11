//  JSON ME
//  Exercise 8 of 8

// Write a server that reads a file, parses it to JSON and outputs the content
// to the user.

// The port is passed in process.argv[2].  The file name is passed in process.argv[3].

// Respond with:

//     res.json(object)

// Everything should match the '/books' resource path.

// -------------------------------------------------------------------------------

// ## HINTS

// For reading, there's an fs module, e.g.,

//     fs.readFile(filename, callback)

// While the parsing can be done with JSON.parse:

//     object = JSON.parse(string)


//Solution

app.get('/books', function(req, res){
    fs.readFile(process.argv[3],'utf8', function(err,data){
        if (err) {
            throw err;
        }
        var jsonObj = JSON.parse(data);
        res.json(jsonObj);
    })
});

app.listen(process.argv[2])