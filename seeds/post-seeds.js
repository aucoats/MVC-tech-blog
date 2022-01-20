const { Post } = require('../models');
const faker = require('@faker-js/faker');

const postdata= [ 
    {
        title: faker.datatype.string(),
        content: faker.hacker.phrase(),
        user_id: 1
    },
    {
        title: faker.datatype.string(),
        content: faker.hacker.phrase(),
        user_id: 1
    }, {
        title: faker.datatype.string(),
        content: faker.hacker.phrase(),
        user_id: 1
    }, {
        title: faker.datatype.string(),
        content: faker.hacker.phrase(),
        user_id: 1
    }, {
        title: faker.datatype.string(),
        content: faker.hacker.phrase(),
        user_id: 1
    },
]

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts; 