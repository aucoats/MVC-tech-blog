const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
          'id',
          'title',
          'content',
          'created_at',
        ],
        // include: [
        //   {
        //     model: Comment,
        //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //     include: {
        //       model: User,
        //       attributes: ['username']
        //     }
        //   },
        //   {
        //     model: User,
        //     attributes: ['username']
        //   }
        // ]
      })
        .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
           });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
   
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    } else {

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: [ 'username' ]
            }
        ]
    }).
    then(dbPostData => {
        if (!dbPostData) {
            res.render('dashboard');
          }
        
        // console.log(res.json(dbPostData));
          // serialize the data
          const post = dbPostData.map(post => post.get({ plain: true }));
    
          // pass data to template
          res.render('dashboard', { 
            post,
            loggedIn: req.session.loggedIn
           });
        })
}});


router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        const post = dbPostData.get({ plain: true });
  
        res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router; 