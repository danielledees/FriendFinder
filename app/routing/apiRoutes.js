var friendData = require("../data/friends");

module.exports = function(app) {
    //shows list of possible friends when api/friends link is clicked
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    //takes in new survey and finds best match
    app.post("/api/friends", function(req, res) {
       console.log(req.body);
       const newFriend = req.body;
       let lowestDiffernce = null;
       let bestMatch
       friendData.forEach( ele => {
           let totalDifference = 0;
           ele.scores.forEach((s, i) => {
                let scoreDiff = Math.abs( parseInt(newFriend.scores[i])) - Math.abs(s);
                totalDifference += Math.abs(scoreDiff);

           })
           console.log(totalDifference)
           if( lowestDiffernce == null || totalDifference < lowestDiffernce){
               lowestDiffernce = totalDifference
               bestMatch = ele;
           }
       })
       console.log(bestMatch, "this is the best match")

       res.send(bestMatch);

//Determine the user's most compatible friend using the following as a guide:
// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
// With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
// The closest match will be the user with the least amount of difference.

    })
}