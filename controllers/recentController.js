// ----- model -----

var recent = require("../models/recent")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- add recent page -----

module.exports.add_recent = async (req, res) => {

    try {
        return res.render("recent/add_recentPhoto")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert recent -----

module.exports.insertRecent = async (req, res) => {

    try {

        var imgPath = ""
        if (req.file) {
            imgPath = recent.recentImgPath + "/" + req.file.filename
            req.body.recentImg = imgPath
            req.body.isActive = true;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();

            var insert = await recent.create(req.body);
            if (insert) {
                return res.redirect("/admin/recent/view_recent")
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
        console.log(err); l
        return res.redirect("back")
    }

}


// ----- view recent -----

module.exports.view_recent = async (req, res) => {

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

        var perPage = 3;


        var recentData = await recent.find({
            "title": { $regex: ".*" + search + ".*", $options: "i" }
        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await recent.find({

            "title": { $regex: ".*" + search + ".*", $options: "i" }

        }).countDocuments()


        if (recentData) {
            return res.render("recent/view_recent", {
                "recentData": recentData,
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
        var change = await recent.findByIdAndUpdate(req.query.id, {
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
        var change = await recent.findByIdAndUpdate(req.query.id, {
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


// ----- delete Recent -----

module.exports.deleteRecent = async (req, res) => {
    try {
        var oldData = await recent.findById(req.query.id);
        if (oldData) {
            if (oldData.recentImg) {
                var fullPath = path.join(__dirname, "..", oldData.recentImg);

                var deleteImg = await fs.unlinkSync(fullPath);

                var deleteRecord = await recent.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record and img deleted ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted ...");
                    return res.redirect("back");
                }
            } else {
                var deleteRecord = await recent.findByIdAndDelete(req.query.id);
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


// ----- delete many recent -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await recent.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update recent page -----

module.exports.updateRecent = async (req, res) => {

    try {

        var recentData = await recent.findById(req.query.id);
        if (recentData) {

            return res.render("recent/update_recent", {
                "recentData": recentData
            })

        }
        else {
            console.log("recent Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update recent data -----

module.exports.updateRecentData = async (req, res) => {
    try {
        var oldData = await recent.findById(req.body.editId);

        if (oldData) {
            if (req.file) {
                if (oldData.recentImg) {
                    var fullPath = path.join(__dirname, "..", oldData.recentImg);
                    var deleteImg = await fs.unlinkSync(fullPath);

                    req.body.updatedDate = new Date().toLocaleString();
                    req.body.recentImg = recent.recentImgPath + "/" + req.file.filename;
                    var update = await recent.findByIdAndUpdate(req.body.editId, req.body);
                    if (update) {
                        console.log("update success");
                        return res.redirect("/admin/recent/view_recent");

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
                req.body.recentImg = oldData.recentImg;
                req.body.updatedDate = new Date().toLocaleString();

                var update = await recent.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    console.log("update success");
                    return res.redirect("/admin/recent/view_recent");
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
