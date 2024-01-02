// ----- slider model -----

var slider = require("../models/slider")


// ----- offer model -----

var offer = require("../models/offer")


// ----- recent model -----

var recent = require("../models/recent")


// ----- review model -----

var review = require("../models/review")


// ----- post model -----

var post = require("../models/post")


// ----- comment model -----

var comment = require("../models/comment")


// ----- category model -----

var category = require("../models/category")


// ----- sub category model -----

var subCat = require("../models/subCat")


// ----- contact model -----

var contact = require("../models/contact")


// ----- node mailer -----

var nodemailer = require("nodemailer")


// ----- home page -----

module.exports.home = async (req, res) => {
    try {
        var sliderData = await slider.find({ isActive: true })
        var offerData = await offer.find({ isActive: true })
        var recentData = await recent.find({ isActive: true })
        var reviewData = await review.find({ isActive: true })
        var postData = await post.find({ isActive: true })
        return res.render("user/home", {
            "sliderData": sliderData,
            "offerData": offerData,
            "recentData": recentData,
            "reviewData": reviewData,
            "postData": postData
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }
}


// ----- single post page -----

module.exports.singlePost = async (req, res) => {

    try {

        // single page 

        var singlePost = await post.findById(req.query.id);


        // comment on specific post 

        var commentData = await comment.find({ postId: req.query.id, isActive: true });


        // recent post data in desending

        var recentPostData = await post.find({ isActive: true }).sort({ "_id": -1 }).limit(3)


        // all post data

        var allPostData = await post.find({})
        var postIds = [];
        var next;

        allPostData.map((v, i) => {
            postIds.push(v.id)
        })

        for (var i = 0; i < postIds.length; i++) {
            if (postIds[i] == req.query.id) {
                next = i;
                break;
            }
        } 
        
        var search =""
        if(req.query.search){
            search = req.query.search
        }

        

        if (singlePost) {
            return res.render("user/singlePost", {
                singlePost: singlePost,
                commentData: commentData,
                recentPostData: recentPostData,
                postIds: postIds,
                cp: next
            })
        }
        else {
            console.log("data not found");
            return res.redirect("back")
        }


    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- add comment -----

module.exports.addComment = async (req, res) => {

    try {

        var imgPath = "";
        if (req.file) {
            req.body.isActive = false;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();
            imgPath = comment.commentImgPath + "/" + req.file.filename;
            req.body.commentImg = imgPath;

            var insert = await comment.create(req.body);
            if (insert) {
                console.log("comment Added");
                return res.redirect("back");
            } else {
                console.log("comment not added");
                return res.redirect("back");
            }
        } else {
            console.log("file not found");
            return res.redirect("back");
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- work 3 page -----

module.exports.work3 = async (req, res) => {

    try {
        var categoryData = await category.find({});
        var subCatData = await subCat.find({})
        if (subCatData) {

            return res.render("user/work3", {
                "subCatData": subCatData,
                "categoryData": categoryData
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- work 4 page -----

module.exports.work4 = async (req, res) => {

    try {
        var categoryData = await category.find({});
        var subCatData = await subCat.find({})
        if (subCatData) {

            return res.render("user/work4", {
                "subCatData": subCatData,
                "categoryData": categoryData
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- contact page-----

module.exports.contact = async (req, res) => {

    try {

        return res.render("user/contact")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert contact -----

module.exports.insertContact = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await contact.create(req.body)
        if (insert) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "nakaraniniraj87580@gmail.com",
                    pass: "lagqsepgtzjcshka",
                },
            });

            const info = await transporter.sendMail({
                from: 'nakaraniniraj87580@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Contact ✔", // Subject line
                attachments: [{
                    filename: "peron_1.jpg.webp",
                    path: "assets/images/person_1.jpg.webp",
                    cid: "img"
                }],
                html: `<div style="width:100px;height:100px">
                    <img src="cid:img" height="100" width="100">
                </div>`, // html body
            });

            if (info) {
                console.log("mail send")
                return res.redirect("back")
            }
            else {
                return res.redirect("back")
            }
        }
        else {
            console.log("not contact")
            return res.redirect("back")
        }




    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}