const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./router/articles');
const methodoverride = require('method-override');

mongoose.connect('mongodb+srv://darshangarad:IFc75pKrNsXn6XKG@cluster0.i9gixdi.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'));

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(methodoverride('_method'));
app.set('view engine', 'ejs');
app.get('/', async(req, res) =>{
          const articles= await Article.find().sort({createAt: 'desc'});
          res.render('articles/index', {articles: articles});
})

app.use('/articles', articleRouter);

app.listen(3000);