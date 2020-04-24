// const conn = require('./database').conn;
const {User, Conversation, Message, Post, FriendRequest, Friendship} = require('../../database').models;

const seedDb = async () => {
    // const user1 = await User.createUser('Clinnygee', 'clinton2', 10);
    // // console.log(user1);

    // const user2 = await User.createUser('Jason', 'clinton2', 10);

    // const user3 = await User.createUser('Joseph', 'clinton2', 10);

    const fire = await User.createUser('Fire', 'clinton2', 10, 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80');
    const water = await User.createUser('Water', 'clinton2', 10, 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    const earth = await User.createUser('Earth', 'clinton2', 10, 'https://images.unsplash.com/photo-1555465910-31f7f20a184d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1454&q=80')
    const wind = await User.createUser('Wind', 'clinton2', 10, 'https://images.unsplash.com/photo-1505672678657-cc7037095e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    const heart = await User.createUser('Heart', 'clinton2', 10, 'https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    console.log(await fire);
    const firePost = await Post.create({userId: fire.dataValues.id, text: '"Fire that is kept closest burns most of all" - William Shakespeare', contentUrl: 'https://images.unsplash.com/photo-1451224222030-cee2f5dbcd10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'});
    const waterPost = await Post.create({userId: water.dataValues.id, text: '"Thousands have lived without love, not one without water" - H. Auden', contentUrl: 'https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80'});
    const earthPost = await Post.create({userId: earth.dataValues.id,text: '"A true conservationist is a man who knows that the world is not given by his fathers, but borrowed from his children." - John James Audubon', contentUrl: 'https://images.unsplash.com/uploads/1412026095116d2b0c90e/3bf33993?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80'});
    const windPost = await Post.create({userId: wind.dataValues.id,text: '"The wind shows us how close to the edge we are" - Joan Didion', contentUrl: 'https://images.unsplash.com/photo-1456356627738-3a96db6e2e33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1358&q=80'});
    const heartPost = await Post.create({userId: heart.dataValues.id,text: '"Only from the heart can you touch the sky" - Rumi', contentUrl: 'https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'});

    const fireWater = await FriendRequest.findOrCreateRequest(fire, water);
    const fireEarth = await FriendRequest.findOrCreateRequest(fire, earth);
    const fireWind = await FriendRequest.findOrCreateRequest(fire, wind);
    const fireHeart = await FriendRequest.findOrCreateRequest(fire, heart);
    const waterEarth = await FriendRequest.findOrCreateRequest(water, earth);
    const waterWind = await FriendRequest.findOrCreateRequest(water, wind);
    const waterHeart = await FriendRequest.findOrCreateRequest(water, heart);
    const earthWind = await FriendRequest.findOrCreateRequest(earth, wind);
    const earthHeart = await FriendRequest.findOrCreateRequest(earth, heart);
    const windHeart = await FriendRequest.findOrCreateRequest(wind, heart);

    const fireWaterFriendship = await Friendship.createFriendship(fireWater);
    const fireEarthFriendship = await Friendship.createFriendship(fireEarth);
    const fireWindFriendship = await Friendship.createFriendship(fireWind);
    const fireHeartFriendship = await Friendship.createFriendship(fireHeart);
    const waterEarthFriendship = await Friendship.createFriendship(waterEarth);
    const waterWindFriendship = await Friendship.createFriendship(waterWind);
    const waterHeartFriendship = await Friendship.createFriendship(waterHeart);
    const earthWindFriendship = await Friendship.createFriendship(earthWind);
    const earthHeartFriendship = await Friendship.createFriendship(earthHeart);
    const windHeartFriendship = await Friendship.createFriendship(windHeart);

    // Promise.all([
    //     User.createUser('Red', 'clinton2', 10, 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80'),
    //     User.createUser('Blue', 'clinton2', 10, 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    //     User.createUser('Green', 'clinton2', 10, 'https://images.unsplash.com/photo-1555465910-31f7f20a184d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1454&q=80'),
    //     User.createUser('Wind', 'clinton2', 10, 'https://images.unsplash.com/photo-1505672678657-cc7037095e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
    //     User.createUser('Heart', 'clinton2', 10, 'https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    // ]).then(([fire, water, earth, wind, heart]) => {
    //     console.log(fire)
    // })
    // User.findOne({where: {username: 'Clinnygee'}}).then(user1 => {
    //     console.log(user1.dataValues)
    //     User.findOne({where: {username: 'Jason'}}).then(user2 => {
            
    //         console.log(user2.dataValues)
    //         Message.createMessage('a test message', user1.dataValues, user2.dataValues).then(message => {
    //             console.log(message);
    //         })
    //         console.log(user2.dataValues)
    //     })
    // })

    // Message.createMessage('a test message', )
    // await Promise.all([
        
    // ])

    // User.createUser('Clinnygee', 'clinton2', 10)
    // User.create()
    // Message.findAll({where: {user: {id: 3}}}).then(message => {
    //     console.log('------------------------------------')
    //     console.log(message);
    // })
}

module.exports = seedDb;