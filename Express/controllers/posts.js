const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.js');

const getPosts = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const savePosts = (posts) => {
    fs.writeFileSync(dbPath, JSON.stringify(posts, null, 4));
};


const show = (req, res) => {
    const posts = getPosts();
    res.json(posts);
};

const store = (req, res) => {
    const posts = getPosts();
    const newPost = {
        id: req.body.id,
        nome: req.body.nome,
        eta: req.body.eta,
        colore: req.body.colore,
    };

    posts.push(newPost);
    savePosts(posts);
    res.json(posts);
};

const update = (req, res) => {
    const posts = getPosts();
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
    const newPosts = posts.filter((post) => post.id !== req.params.id);

    savePosts(newPosts);
    res.json(newPosts);
};

module.exports = {
    show,
    store,
    update,
    destroy,
};
