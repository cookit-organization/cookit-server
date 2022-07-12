const Recipe = require('../schemes/recipe');
const sanitize = require('mongo-sanitize');

function newRecipe(req, res){

    //RSA for author_username 

    new Recipe({
        author_name: sanitize(req.body.author_name),
        author_username: sanitize(req.query.author_username),
        recipe: {
            name: sanitize(req.query.name),
            preparation_time: sanitize(req.query.preparation_time),
            description: sanitize(req.query.description),
            image: null,
            tags: sanitize(req.query.tags),
            meal_time: sanitize(req.query.meal_time),
            components: sanitize(req.query.components), 
            average_rate: 0,
            rates_number: 0,
            users_who_vote: null
        }
    }).save()
    .then((result) => {
        console.log("response :\n" + result)
        res.status(200).send(null)
    })
    .catch((error) => console.log("error : " + error))
}

function updateRecipe(req, res){}

// gets id parameter
function deleteRecipe(req, res){

    Recipe.findOneAndDelete(sanitize(req.body.id))
        .then((recipe) => {
            res.status(200).send({message: "Recipe has been deleted successfully!"})
            console.log(recipe)
        }).catch((error)=> console.log(error.message))    
}

//gets meal_time array and returns 30 recipes that has it
function randomRecipes(req, res){

    Recipe.find({
        meal_time: { $match: req.query.meal_time }
    }).limit(3).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

//gets tags and return list of 20 recipes that has this tags
function recipesByTag(req, res){
    
    Recipe.find({
        tags: sanitize(req.query.tags) 
    }).limit(20).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

function recipesByName(req, res){

    Recipe.find({ 
        name: sanitize(req.query.name)
    }).limit(20).then((recipes) => {
        res.status(200).send(recipes);
    }).catch((err) => res.status(500).send(err))
}

module.exports = {
    newRecipe,
    updateRecipe,
    deleteRecipe,
    randomRecipes,
    recipesByTag,
    recipesByName
}