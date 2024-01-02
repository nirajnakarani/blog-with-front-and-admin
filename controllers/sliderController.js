// ----- model -----

var slider = require("../models/slider")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- add slider page -----

module.exports.add_slider = async (req, res) => {
    try {
        return res.render("slider/add_slider")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}

// ----- insert slider -----

module.exports.insertSlider = async (req, res) => {
    try {
        var imgPath = ""
        if (req.file) {
            imgPath = slider.sliderImgPath + "/" + req.file.filename
            req.body.sliderImg = imgPath
            req.body.isActive = true;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();

            var insert = await slider.create(req.body);
            if (insert) {
                return res.redirect("/admin/slider/view_slider")
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


// ----- view slider -----

module.exports.view_slider = async (req, res) => {

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


        var sliderData = await slider.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "link": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await slider.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "link": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()


        if (sliderData) {
            return res.render("slider/view_slider", {
                "sliderData": sliderData,
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
        var change = await slider.findByIdAndUpdate(req.query.id, {
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
        var change = await slider.findByIdAndUpdate(req.query.id, {
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


// ----- delete slider -----

module.exports.deleteSlider = async (req, res) => {
    try {
        var oldData = await slider.findById(req.query.id);
        if (oldData) {
            if (oldData.sliderImg) {
                var fullPath = path.join(__dirname, "..", oldData.sliderImg);

                var deleteImg = await fs.unlinkSync(fullPath);

                var deleteRecord = await slider.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record and img deleted ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted ...");
                    return res.redirect("back");
                }
            } else {
                var deleteRecord = await slider.findByIdAndDelete(req.query.id);
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


// ----- delete many slider -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await slider.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update slider page -----

module.exports.updateSlider = async (req, res) => {

    try {

        var sliderData = await slider.findById(req.query.id);
        if (sliderData) {

            return res.render("slider/update_slider", {
                "sliderData": sliderData
            })

        }
        else {
            console.log("slider Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update slider data -----

module.exports.updateSliderData = async (req, res) => {
    try {
        var oldData = await slider.findById(req.body.editId);

        if (oldData) {
            if (req.file) {
                if (oldData.sliderImg) {
                    var fullPath = path.join(__dirname, "..", oldData.sliderImg);
                    var deleteImg = await fs.unlinkSync(fullPath);

                    req.body.updatedDate = new Date().toLocaleString();
                    req.body.sliderImg = slider.sliderImgPath + "/" + req.file.filename;
                    var update = await slider.findByIdAndUpdate(req.body.editId, req.body);
                    if (update) {
                        console.log("update success");
                        return res.redirect("/admin/slider/view_slider");

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
                req.body.sliderImg = oldData.sliderImg;
                req.body.updatedDate = new Date().toLocaleString();

                var update = await slider.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    console.log("update success");
                    return res.redirect("/admin/slider/view_slider");
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
