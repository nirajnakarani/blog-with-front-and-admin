// ----- model -----

var category = require("../models/category");


// ----- add category page -----

module.exports.add_category = async (req, res) => {

    try {
        return res.render("category/add_category")
    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- insert category -----

module.exports.insertCategory = async (req, res) => {

    try {

        req.body.isActive = true;
        req.body.createdDate = new Date().toLocaleString();
        req.body.updatedDate = new Date().toLocaleString();

        var insert = await category.create(req.body)
        if (insert) {
            return res.redirect("/admin/category/view_category")
        }
        else {
            console.log("category not insert");
            return res.redirect("back")
        }


    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- view offer -----

module.exports.view_category = async (req, res) => {

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


        var categoryData = await category.find({
            "category": { $regex: ".*" + search + ".*", $options: "i" }
        })
            .limit(perPage)
            .skip(perPage * page)

        var totalDocument = await category.find({
            "category": { $regex: ".*" + search + ".*", $options: "i" }
        }).countDocuments()


        if (categoryData) {
            return res.render("category/view_category", {
                "categoryData": categoryData,
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
        var change = await category.findByIdAndUpdate(req.query.id, {
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
        var change = await category.findByIdAndUpdate(req.query.id, {
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


// ----- delete category -----

module.exports.deleteCategory = async (req, res) => {
    try {
        var oldData = await category.findById(req.query.id);
        if (oldData) {
            var deleteRecord = await category.findByIdAndDelete(req.query.id);
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


// ----- delete many category -----

module.exports.deleteMany = async (req, res) => {

    try {
  
      var abc = await category.deleteMany({ _id: { $in: req.body.deleteAll } });
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
  
  
// ----- update category page -----

module.exports.updateCategory = async (req, res) => {

    try {

        var categoryData = await category.findById(req.query.id);
        if (categoryData) {

            return res.render("category/update_category", {
                "categoryData": categoryData
            })

        }
        else {
            console.log("category Data not found")
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- update category data -----

module.exports.updateCategoryData = async (req, res) => {
    try {
        var oldData = await category.findById(req.body.editId);

        if (oldData) {
            req.body.updatedDate = new Date().toLocaleString();
            var update = await category.findByIdAndUpdate(req.body.editId, req.body);
            if (update) {
                console.log("update success");
                return res.redirect("/admin/category/view_category");
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