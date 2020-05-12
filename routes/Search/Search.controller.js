const Sequelize = require('sequelize');
const {Op} = Sequelize;
const {User, Tag} = require('../../database').models;

const  SearchController = {


    posts(req,res) {
        User.findAll({where: {
            username: {
                [Op.like]: `%${req.params.searchTerm}%`
            }
        }, attributes: {
            exclude: 'password'
        }}).then(searchResults => {
            if(searchResults.length === 0){
                res.json([]);
            } else {
                res.json(searchResults);
            }
            console.log(searchResults)
            
        })
    },

    tags(req,res){
        console.log('in tags search');
        Tag.findAll({where:{
            tag: {
                [Op.like]: `%${req.params.searchTerm}%`
            }
        }}).then(searchResults => {
            if(searchResults.length === 0){
                res.json([])
            } else {
                res.json(searchResults);
            }
        })
    }

};

module.exports = SearchController;