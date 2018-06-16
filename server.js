const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

const port = process.env.PORT || 3000

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set("view engine", "hbs")


app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}, ${req.method}, ${req.url}`
  console.log(log)

  fs.appendFile('serverlog.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to write log file')
    }
  })
  next()
})

app.use(express.static(__dirname + "/public"))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About page",
  })
})

app.get('/abc', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "Homepage",
    welcomeMessage: "Welcome to my Homepage",
  })
})


app.listen(port, () => {
  console.log(`Server up on port ${port}`)
})
