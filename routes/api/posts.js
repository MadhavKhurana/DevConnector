const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post.js");
const Profile = require("../../models/Profile.js");

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get("/", (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: "No post found with that id" })
        );
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.body.id
        });
        newPost.save().then(post => res.json(post));
    }
);

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    

                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err =>
                    res.status(404).json({ postnotfound: "No post found" })
                );
        });
    }
);

router.post(
    "/like/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                        if (
                            post.likes.filter(
                                like => like.user.toString() === req.user.id
                            ).length > 0
                        ) {
                            return yes.status(400).json({
                                alreadyliked: "User already liked this post"
                            });
                        }
                    post.likes.unshift({ user: req.user.id });
                    post.save().then(post => res.json(post));
                })
                .catch(err =>
                    res.status(404).json({ postnotfound: "No post found" })
                );
        });
    }
);

router.post(
    "/unlike/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(
                            like => like.user.toString() === req.user.id
                        ).length === 0
                    ) {
                        return yes.status(400).json({
                            notliked: "You have not liked this post"
                        });
                    }
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post));
                })
                .catch(err =>
                    res.status(404).json({ postnotfound: "No post found" })
                );
        });
    }
);

router.post(
    "/comment/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };
                post.comments.unshift(newComment);

                post.save().then(post => res.json(post));
            })
            .catch(err =>
                res.status(404).json({ postnotfound: "No post found" })
            );
    }
);

router.delete(
    "/comment/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.comments.filter(
                        comment =>
                            comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: "Comment does not exist" });
                }

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err =>
                res.status(404).json({ postnotfound: "No post found" })
            );
    }
);

module.exports = router;
