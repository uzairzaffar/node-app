const Post = require('../model/post-model.js');

exports.getPosts = (req, res, next) => {
    let criteria = {}
    if (req.jwt.user_role === 'user') {
        criteria = {
            user: req.jwt.user_id
        };
    }
    Post.find(criteria, (err, posts) => {
        if (err) {
            res.json({
                status: "Error occured in getting posts",
                message: err,
            });
        }
        res.json({
            status: 200,
            data: posts,
        });
    });

};

exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.jwt.user_id,
    });
    if (!post.title) {
        res.status(400).json({
            message: 'Title is missing',
        });
        return;
    }
    if (!post.content) {
        res.status(400).json({
            message: 'Content is missing',
        });
        return;
    }

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'New Post is registered',
                result: result,
            });
        })
        .catch(err => {
            res.status(501).json({
                message: 'Error Creating new post',
                error: err,
            });
        });
};

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.json({
                status: "Error occured in getting post",
                message: err,
            });
        }
        res.json({
            status: 200,
            data: post,
        });
    });
};

exports.updatePostById = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.json({
                status: "Error occured in getting post",
                message: err,
            });
        }
        if (req.body.title) {
            post.title = req.body.title;
        }

        if (req.body.content) {
            post.content = req.body.content;
        }

        post.save()
            .then(result => {
                res.status(200).json({
                    message: 'Post is updated',
                    result: result,
                });
            })
            .catch(err => {
                res.status(501).json({
                    message: 'Error updating post',
                    error: err,
                });
            });

    });
};

exports.deletePostById = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
        if (err) {
            res.json({
                status: "Error occured in deleting post",
                message: err,
            });
        } else {
        res.status(200).json({
            message: 'Post is deleted',
        });
       }
    });
};