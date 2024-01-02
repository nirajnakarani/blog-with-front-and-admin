// ----- sub category model -----

var subCat = require("../models/subCat")


// ----- category model -----

var category = require("../models/category")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- add post page -----

module.exports.add_subCategory = async (req, res) => {

    try {

        var categoryData = await category.find({ isActive: true });
        if (categoryData) {

            return res.render("sub_category/add_sub_category", {
                "categoryData": categoryData
            })
        }
        else {
            console.log("category not found");
            return res.redirect("back")

        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert sub category data -----

module.exports.insertSubCategory = async (req, res) => {

    try {
        var imgPath = ""
        if (req.file) {
            imgPath = subCat.subCategoryImgPath + "/" + req.file.filename;
            req.body.isActive = true;
            req.body.createdDate = new Date().toLocaleString();
            req.body.updatedDate = new Date().toLocaleString();
            req.body.subCategoryImg = imgPath;

            var insert = await subCat.create(req.body);


            if (insert) {
                return res.redirect("/admin/subCat/view_subCategory")
            }
            else {
                console.log("data not inserted");
                return res.redirect("back")
            }
        }
        else {
            console.log("file not found");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view sub category page -----

module.exports.view_subCategory = async (req, res) => {

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

        var subCatData = await subCat.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).populate("categoryId").limit(perPage).skip(perPage * page).exec()


        var totalDocument = await subCat.find({
            $or: [
                { "title": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()

        if (subCatData) {

            return res.render("sub_category/view_sub_category", {
                subCatData: subCatData,
                totalDocument: Math.ceil(totalDocument / perPage),
                search: search
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

// ----- deactive -----

module.exports.setDeactive = async (req, res) => {
    try {
        var change = await subCat.findByIdAndUpdate(req.query.id, {
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
        var change = await subCat.findByIdAndUpdate(req.query.id, {
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


// ----- delete sub category -----

module.exports.deleteSubCat = async (req, res) => {
    try {
        var oldData = await subCat.findById(req.query.id);
        if (oldData) {
            if (oldData.subCategoryImg) {
                var fullPath = path.join(__dirname, "..", oldData.subCategoryImg);

                var deleteImg = await fs.unlinkSync(fullPath);

                var deleteRecord = await subCat.findByIdAndDelete(req.query.id);
                if (deleteRecord) {
                    console.log("record and img deleted ...");
                    return res.redirect("back");
                } else {
                    console.log("record not deleted ...");
                    return res.redirect("back");
                }
            } else {
                var deleteRecord = await subCat.findByIdAndDelete(req.query.id);
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


// ----- delete many subcategory -----

module.exports.deleteMany = async (req, res) => {
    try {

        var abc = await subCat.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update sub category page -----

module.exports.updateSubCat = async (req, res) => {

    try {

        var subCatData = await subCat.findById(req.query.id).populate("categoryId").exec();
        var categoryData = await category.find({ isActive: true });


        if (subCatData) {

            return res.render("sub_category/update_sub_category", {
                "subCatData": subCatData,
                "categoryData": categoryData
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


// ----- update sub category data -----

module.exports.updateSubCategoryData = async (req, res) => {
    try {
        var oldData = await subCat.findById(req.body.editId);

        if (oldData) {
            if (req.file) {
                if (oldData.subCategoryImg) {
                    var fullPath = path.join(__dirname, "..", oldData.subCategoryImg);
                    var deleteImg = await fs.unlinkSync(fullPath);

                    req.body.updatedDate = new Date().toLocaleString();
                    req.body.subCategoryImg = subCat.subCategoryImgPath + "/" + req.file.filename;
                    var update = await subCat.findByIdAndUpdate(req.body.editId, req.body);
                    if (update) {
                        console.log("update success");
                        return res.redirect("/admin/subCat/view_subCategory");

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
                req.body.subCategoryImg = oldData.subCategoryImg;
                req.body.updatedDate = new Date().toLocaleString();

                var update = await subCat.findByIdAndUpdate(req.body.editId, req.body);
                if (update) {
                    console.log("update success");
                    return res.redirect("/admin/subCat/view_subCategory");
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