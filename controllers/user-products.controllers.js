const userProductController = {};
const UserProducts = require("../models/user-products.model");

userProductController.getAll = async (req, res) => {
  let products;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    products = await UserProducts.paginate(merged, {
      offset: parseInt(start),
      limit: parseInt(length),
    });
    res.status(200).send({
      code: 200,
      message: "Successful",
      data: products,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.addProduct = async (req, res) => {
  try {
    console.log("here");
    const body = req.body;

    const product = new UserProducts(body);

    const result = await product.save();

    res.status(200).send({
      code: 200,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.getSingleProduct = async (req, res) => {
  let product;
  try {
    const user_id = req.params.user_id;
    product = await UserProducts.findOne({ user_id: user_id });
    res.status(200).send({
      code: 200,
      message: "Successful",
      data: product,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.getGoldProduct = async (req, res) => {
  let product;
  try {
    const user_id = req.params.user_id;
    product = await UserProducts.findOne({ user_id: user_id });
    res.status(200).send(product.gold);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.addGoldProduct = async (req, res) => {
  let product;
  try {
    const user_id = req.params.user_id;
    const result = await UserProducts.findOne({
      user_id: user_id,
    });

    const gold = result.gold;
    const testObj = {"carat":21,"item_name":"ringo","weight_type":"tola","weight":200}
    const final = [...gold, testObj]
    console.log('body', req.body)
    console.log('gold', result.gold)
    console.log('final', final)
    updates = {'gold': final};


    const response = await UserProducts.updateOne(
      {
        user_id: user_id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).send({message: 'success'});
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.deleteGoldProduct = async (req, res) => {
 
  try {
    const delete_index = req.params.delete_index;
    const user_id = req.params.user_id;

    const result = await UserProducts.findOne({
      user_id: user_id,
    });

    const gold = result.gold;
    
    gold.splice(delete_index, 1);


    updates = {'gold': gold};


    const response = await UserProducts.updateOne(
      {
        user_id: user_id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).send({message: 'success'});
 
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.deleteProduct = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: "ID missing",
    });
  }
  try {
    const _id = req.params._id;

    const result = await UserProducts.findOneAndDelete({
      _id: _id,
    });

    res.status(200).send({
      code: 200,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

userProductController.updateProduct = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: "ID missing",
    });
  }
  try {
    const _id = req.params._id;
    let updates = req.body;
    runUpdate(_id, updates, res);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

async function runUpdate(_id, updates, res) {
  try {
    const result = await UserProducts.updateOne(
      {
        _id: _id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: "Updated Successfully",
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: "Created Successfully",
        });
      } else {
        res.status(422).send({
          code: 422,
          message: "Unprocessible Entity",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
}
async function runUpdateById(id, updates, res) {
  try {
    const result = await books.updateOne(
      {
        id: id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: "Updated Successfully",
      });
    } else if (result.upserted) {
      res.status(200).send({
        code: 200,
        message: "Created Successfully",
      });
    } else {
      {
        res.status(200).send({
          code: 200,
          message: "Task completed successfully",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
}

module.exports = userProductController;
