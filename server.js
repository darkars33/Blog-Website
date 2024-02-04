const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./router/articles');

mongoose.connect('mongodb+srv://darshangarad:IFc75pKrNsXn6XKG@cluster0.i9gixdi.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'));

const app = express();
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.get('/', (req, res) =>{
          const articles= [{
                    title: 'test title 1',
                    createAt: new Date(),
                    description: 'test description'
          },
          {
                    title: 'test title 2',
                    createAt: new Date(),
                    description: 'test description'
          }]
          res.render('articles/index', {articles: articles});
})

app.use('/articles', articleRouter);

app.listen(3000);