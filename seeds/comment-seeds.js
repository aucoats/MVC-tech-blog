const { Comment } = require('../models');
const faker = require('@faker-js/faker');

const commentdata = [ 
    {
        comment_text: faker.datatype.string(),
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: faker.datatype.string(),
        user_id: 1,
        post_id: 1,
    },{
        comment_text: faker.datatype.string(),
        user_id: 1,
        post_id: 1,
    }
]

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;

