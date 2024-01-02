// ----- comment model -----

var comment = require("../models/comment")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- view comment -----

module.exports.view_comment = async (req, res) => {

    try {
        // search 

        var search = "";

        if (req.query.search) {
            search = req.query.search
        }

        // pagination
        if (req.query.page) {
            page = req.query.page
        }
        else {
            page = 0
        }

        var perPage = 2

        var commentData = await comment.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).populate("postId").limit(perPage).skip(perPage * page).exec();


        var totalDocument = await comment.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()
        if (commentData) {

            return res.render("user_comment/view_comment", {
                commentData: commentData,
                search: search,
                totalDocument: Math.ceil(totalDocument / perPage)
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- deactive -----

module.exports.setDeactive = async (req, res) => {
    try {
        var change = await comment.findByIdAndUpdate(req.query.id, {
            isActive: false,
        });
        if (change) {
            console.log("deactivated...");
            return res.redirect("back");
        } else {
            console.log("not deactivated");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- active -----

module.exports.setActive = async (req, res) => {
    try {
        var change = await comment.findByIdAndUpdate(req.query.id, {
            isActive: true,
        });
        if (change) {
            console.log("activated...");
            return res.redirect("back");
        } else {
            console.log("not activated");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- delete comment -----

module.exports.deleteComment = async (req, res) => {
    try {
        var oldData = await comment.findById(req.query.id);
        if (oldData) {
            if (oldData.commentImg) {
                var fullPath = path.join(__dirname, "..", oldData.commentImg);

                var deleteImg = await fs.unlinkSync(fullPath);

                var deleteRecord = await comment.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record and img deleted ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted ...");
                    return res.redirect("back");
                }
            } else {
                var deleteRecord = await comment.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record deleted 2 ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted 2 ...");
                    return res.redirect("back");
                }
            }
        } else {
            console.log("record not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- delete many comment -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await comment.deleteMany({ _id: { $in: req.body.deleteAll } });
        if (abc) {
            return res.redirect("back")

        }
        else {
            console.log("data not delete");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}

