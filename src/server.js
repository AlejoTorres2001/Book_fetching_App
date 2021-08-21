const express = require('express')
const app = express()
const port = 8000
const url = require('url');
const querystring = require('querystring');
const getBook = require('./modules/get-book');
const exphbs = require("express-handlebars");
const path = require("path");
const avgTime=require("./modules/calc-reading")

//Sets handlebars configurations (we will go through them later on)
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      
    })
  );
app.set("view engine", ".hbs");
//Stattic files
app.use(express.static(path.join(__dirname, "public")));
//responses
var storagedBooks=[]
app.get('/', async (req, res) => {
    if (Object.entries(req.query).length !== 0){
        const code =req.query.code
        const book = await getBook.getBook(code)
        const title = book[code].title
        const number_of_pages = book[code].number_of_pages
        const subtitle = book[code].subtitle
        const publish_date = book[code].publish_date
        const img = await book[code].cover.large
        const avg = avgTime.avgTime(number_of_pages) 
        storagedBooks.push({
          title:title,
          subtitle:subtitle,
          number_of_pages:number_of_pages,
          publish_date:publish_date,
          img:img,
          avg:avg,
        })
        console.log(storagedBooks)
        res.render('main', 
        {layout : 'index',title:title,subtitle:subtitle,number_of_pages:number_of_pages,publish_date:publish_date,img:img,avg:avg,storagedBooks:storagedBooks});
    }
    else{
        res.render('main', {layout : 'index'});
        
    }
    
})
app.get('/StoragedBooks',(req,res)=>{
  if(storagedBooks.length > 0){
    res.render('StoragedBooks', {layout : 'index',books:storagedBooks});

  }
  else{
    res.render('StoragedBooks', {layout : 'index',ups:'ups'})
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// const code = req.query.code;
// const book = await fetchBook(code)