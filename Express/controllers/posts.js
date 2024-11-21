const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.js');

let posts = []

const getPosts = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const savePosts = (posts) => {
    fs.writeFileSync(dbPath, JSON.stringify(posts, null, 4));
};


const show = (req, res) => {
    posts = getPosts();
    res.json(posts);
};

const store = (req, res) => {
    posts = getPosts();
    num = posts.length + ""

    const newPost = {
        id: num,
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags || []
    };

    posts.push(newPost);
    savePosts(posts);
    res.json(posts);
};

const update = (req, res) => {
    posts = getPosts();
    const postIndex = posts.findIndex((post) => post.id === req.params.id);

    if (postIndex === -1) {
        return res.status(404).json({ error: `No post found with the id: ${req.params.id}` });
    }

    posts[postIndex] = {
        id: req.body.id,
        nome: req.body.nome,
        eta: req.body.eta,
        colore: req.body.colore,
    };

    savePosts(posts);
    res.json(posts);
};

const destroy = (req, res) => {
    const posts = getPosts();
    const newPosts = posts.filter((post, i) => post.id !== req.params.id);

    savePosts(newPosts);
    res.json(newPosts);
};

module.exports = {
    show,
    store,
    update,
    destroy,
};
