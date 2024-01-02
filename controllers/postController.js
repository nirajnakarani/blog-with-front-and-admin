// ----- model -----

var post = require("../models/post")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- add post page -----

module.exports.add_post = async (req, res) => {

    try {

        return res.render("post/add_post")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert post -----

module.exports.insertPost = async (req, res) => {

    try {

        var imgPath = ""
        if (req.file) {
            imgPath = post.postImgPath + "/" + req.file.filename;
            req.body.username = req.user.name;
            req.body.postImg = imgPath;
            req.body.isActive = true;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();

            var insert = await post.create(req.body);
            if (insert) {
                return res.redirect("/admin/post/view_post")
            }
            else {
                return res.redirect("back");
            }

        }
        else {
            console.log("file not found");
            return res.redirect("back");
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view post -----

module.exports.view_post = async (req, res) => {

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

        var perPage = 2;


        var postData = await post.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "link": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await post.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "link": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()


        if (postData) {
            return res.render("post/view_post", {
                "postData": postData,
                "search": search,
                "totalDocument": Math.ceil(totalDocument / perPage)
            })
        }
        else {
            return res.redirect("back")
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
        var change = await post.findByIdAndUpdate(req.query.id, {
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
        var change = await post.findByIdAndUpdate(req.query.id, {
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


// ----- delete post -----

module.exports.deletePost = async (req, res) => {
    try {
        var oldData = await post.findById(req.query.id);
        if (oldData) {
            if (oldData.postImg) {
                var fullPath = path.join(__dirname, "..", oldData.postImg);

                var deleteImg = await fs.unlinkSync(fullPath);

                var deleteRecord = await post.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record and img deleted ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted ...");
                    return res.redirect("back");
                }
            } else {
                var deleteRecord = await post.findByIdAndDelete(req.query.id);
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


// ----- delete many post -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await post.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update post page -----

module.exports.updatePost = async (req, res) => {

    try {

        var postData = await post.findById(req.query.id);
        if (postData) {

            return res.render("post/update_post", {
                "postData": postData
            })

        }
        else {
            console.log("post Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update post data -----

module.exports.updatePostData = async (req, res) => {
    try {
        var oldData = await post.findById(req.body.editId);

        if (oldData) {
            if (req.file) {
                if (oldData.postImg) {
                    var fullPath = path.join(__dirname, "..", oldData.postImg);
                    var deleteImg = await fs.unlinkSync(fullPath);

                    req.body.updatedDate = new Date().toLocaleString();
                    req.body.postImg = post.postImgPath + "/" + req.file.filename;
                    var update = await post.findByIdAndUpdate(req.body.editId, req.body);
                    if (update) {
                        console.log("update success");
                        return res.redirect("/admin/post/view_post");

                    } else {
                        console.log("update unsuccess");
                        return res.redirect("back");
                    }
                } else {
                    console.log("old data img not found");
                    return res.redirect("back");
                }
            }
            else {
                req.body.postImg = oldData.postImg;
                req.body.updatedDate = new Date().toLocaleString();

                var update = await post.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    console.log("update success");
                    return res.redirect("/admin/post/view_post");
                }
                else {
                    console.log("update unsuccess");
                    return res.redirect("back");
                }
            }
        }
        else {
            console.log("update record not found");
            return res.redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};