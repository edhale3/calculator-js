const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')


app.get("/", (req,res) => {
    res.send("hello world")
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'calculator.html'));
    });
  }

app.listen(port, () => {
    console.log(`listening on ${port}`)
})