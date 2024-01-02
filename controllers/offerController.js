// ----- offer  model -----

var offer = require("../models/offer");


// ----- path -----

var path = require("path")


// ----- add offer page -----

module.exports.add_offer = async (req, res) => {

    try {
        return res.render("offer/add_offer")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert offer -----

module.exports.insertOffer = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await offer.create(req.body)
        if (insert) {
            return res.redirect("/admin/offer/view_offer")
        }
        else {
            console.log("offer not insert");
            return res.redirect("back")
        }


    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view offer -----

module.exports.view_offer = async (req, res) => {

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


        var offerData = await offer.find({
            $or: [
                { "icon": { $regex: ".*" + search + ".*", $options: "i" } },
                { "title": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await offer.find({
            $or: [
                { "icon": { $regex: ".*" + search + ".*", $options: "i" } },
                { "title": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()


        if (offerData) {
            return res.render("offer/view_offer", {
                "offerData": offerData,
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
        var change = await offer.findByIdAndUpdate(req.query.id, {
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
        var change = await offer.findByIdAndUpdate(req.query.id, {
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


// ----- delete offer -----

module.exports.deleteOffer = async (req, res) => {
    try {
        var oldData = await offer.findById(req.query.id);
        if (oldData) {
            var deleteRecord = await offer.findByIdAndDelete(req.query.id);
            if (deleteRecord) {
                console.log("record deleted 2 ...");
                return res.redirect("back");
            } else {
                console.log("record not deleted 2 ...");
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


// ----- delete many offer -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await offer.deleteMany({ _id: { $in: req.body.deleteAll } });
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


// ----- update offer page -----

module.exports.updateOffer = async (req, res) => {

    try {

        var offerData = await offer.findById(req.query.id);
        if (offerData) {

            return res.render("offer/update_offer", {
                "offerData": offerData
            })

        }
        else {
            console.log("offer Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update offer data -----

module.exports.updateOfferData = async (req, res) => {
    try {
        var oldData = await offer.findById(req.body.editId);

        if (oldData) {
            req.body.updatedDate = new Date().toLocaleString();
            var update = await offer.findByIdAndUpdate(req.body.editId, req.body);
            if (update) {
                console.log("update success");
                return res.redirect("/admin/offer/view_offer");
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