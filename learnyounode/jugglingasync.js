 // ## JUGGLING ASYNC (Exercise 9 of 13)  
   
 //  This problem is the same as the previous problem (HTTP COLLECT) in that  
 //  you need to use http.get(). However, this time you will be provided with  
 //  three URLs as the first three command-line arguments.  
   
 //  You must collect the complete content provided to you by each of the URLs  
 //  and print it to the console (stdout). You don't need to print out the  
 //  length, just the data as a String; one line per URL. The catch is that you  
 //  must print them out in the same order as the URLs are provided to you as  
 //  command-line arguments.  
   
 // ─────────────────────────────────────────────────────────────────────────────  
   
 // ## HINTS  
   
 //  Don't expect these three servers to play nicely! They are not going to  
 //  give you complete responses in the order you hope, so you can't naively  
 //  just print the output as you get it because they will be out of order.  
   
 //  You will need to queue the results and keep track of how many of the URLs  
 //  have returned their entire contents. Only once you have them all, you can  
 //  print the data to the console.  
   
 //  Counting callbacks is one of the fundamental ways of managing async in  
 //  Node. Rather than doing it yourself, you may find it more convenient to  
 //  rely on a third-party library such as [async](https://npmjs.com/async) or  
 //  [after](https://npmjs.com/after). But for this exercise, try and do it  
 //  without any external helper library.  



//Solution

const http = require('http');
const url = require('url');

for(var i = 2; i <= process.argv.length-1; i ++) {
  printMessages(process.argv[i]);
}


function printMessages(url){
  http.get(url, function(response) {
    var body = "";
    response.setEncoding('utf8');
    response.on('data', function(data){
      body += data.toString();
    });
    response.on("end", function(){
      console.log(body);
    });

    response.on('error', console.error)
    }).on('error',console.error)
}


//Official Solution Provided by NodeSchool
    var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0
    
    function printResults () {
      for (var i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }
    
    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }
    
          results[index] = data.toString()
          count++
    
          if (count === 3) {
            printResults()
          }
        }))
      })
    }
    
    for (var i = 0; i < 3; i++) {
      httpGet(i)
    }
