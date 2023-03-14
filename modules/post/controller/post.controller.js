const postModel = require("../../../DB/post.model");
const userModel = require("../../../DB/user.model");

const addPost = async (req, res) => {
  let { desc, title , tagsLink } = req.body;
  let allPics = [];

  if (req.files.lenght > 0 || req.files) {
    for (let index = 0; index < req.files.length; index++) {
      let imageURL = `${req.protocol}://${req.headers.host}/${req.files[index].path}`;
      allPics.push(imageURL);

    }
  }

  let tagedEmail = ""
  let validId = []
  for (let index = 0; index < tagsLink.length; index++) {
    let findUser = await userModel.findOne({_id:tagsLink[index]})
    if(findUser){
        validId.push(tagsLink[index])
        if(tagedEmail.length){
            tagedEmail = tagedEmail +","+ findUser.email
        }else{
            tagedEmail = findUser.email
        }
    }
  }

  let addPost = new postModel({desc,title,tags:validId,images:allPics})
  let add = await addPost.save()
  res.status(200).json({massage:"done",add})

};

module.exports = { addPost };
