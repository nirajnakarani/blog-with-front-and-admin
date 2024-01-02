// ----- models -----

var review = require("../models/review")


// ----- add review page -----

module.exports.add_review = async (req, res) => {

    try {
        return res.render("review/add_review")

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert review -----

module.exports.insertReview = async (req, res) => {

    try {
        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await review.create(req.body)
        if (insert) {
            return res.redirect("/admin/review/view_review")
        }
        else {
            console.log("review not insert");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view review -----

module.exports.view_review = async (req, res) => {

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

        var perPage = 3


        var reviewData = await review.find({
            "name": { $regex: ".*" + search + ".*", $options: "i" }

        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await review.find({
            "name": { $regex: ".*" + search + ".*", $options: "i" }
        }).countDocuments()


        if (reviewData) {
            return res.render("review/view_review", {
                "reviewData": reviewData,
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
        var change = await review.findByIdAndUpdate(req.query.id, {
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
        var change = await review.findByIdAndUpdate(req.query.id, {
            isActive: true,
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


// ----- delete review -----

module.exports.deleteReview = async (req, res) => {
    try {
        var oldData = await review.findById(req.query.id);
        if (oldData) {
            var deleteRecord = await review.findByIdAndDelete(req.query.id);
            if (deleteRecord) {
                console.log("record deleted  ...");
                return res.redirect("back");
            } else {
                console.log("record not deleted ...");
                return res.redirect("back");
            }
        }
        else {
            console.log("record not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- delete many review -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await review.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update review page -----

module.exports.updateReview = async (req, res) => {

    try {

        var reviewData = await review.findById(req.query.id);
        if (reviewData) {

            return res.render("review/update_review", {
                "reviewData": reviewData
            })

        }
        else {
            console.log("review Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update review data -----

module.exports.updateReviewData = async (req, res) => {
    try {
        var oldData = await review.findById(req.body.editId);

        if (oldData) {
            req.body.updatedDate = new Date().toLocaleString();
            var update = await review.findByIdAndUpdate(req.body.editId, req.body);
            if (update) {
                console.log("update success");
                return res.redirect("/admin/review/view_review");
            }
            else {
                console.log("update unsuccess");
                return res.redirect("back");
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