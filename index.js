const express = require('express')
const app = express()
const port = 3000


app.get("/", (req,res) => {
    res.send("hello world")
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'calculator.html'));
    });
  }

app.listen(port, () => {
    console.log(`listening on ${port}`)
})