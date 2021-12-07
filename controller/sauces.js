const sauces = require('../models/sauces');
const fs = require('fs');
//get all sauces
exports.getAllSauces = (req,res,next)=>{
    sauces.find().then(
      (result) => {
        res.status(200).json(result);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );

  };
  //get one sauces by id 
  exports.getOnesauces = (req,res,next)=>{
    sauces.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );

  };
  // create the sauces
exports.createsauces = (req, res, next) => {
 var mysauce = JSON.parse(req.body.sauce);
  console.log("test: ",req.body.sauce);
 
  const url = req.protocol + '://' + req.get('host');
  
  const sauce = new sauces({
      userId: mysauce.userId,
      name: mysauce.name,
      imageUrl: url + '/images/' + req.file.filename,
      description: mysauce.description,
      heat: mysauce.heat,
      mainPepper: mysauce.mainPepper,
      manufacturer: mysauce.manufacturer,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
  });
  sauce.save().then(
    () => {
          res.status(201).json({
              message: 'New sauce added to database successfully!'
          }); 
      // created 
      }
  ).catch(
      (error) => {
          res.status(500).json({
              message: error
          });
      }
  );
};
// server error


exports.modifysauces = (req, res, next) => {
  console.log("test: ", req.body);
  var mysauce;
if (req.file) {
  const url = req.protocol + "://" + req.get("host");
  mysauce = JSON.parse(req.body.sauce);
  
  var sauce = new sauces ({
    _id: req.params.id,
    userId: mysauce.userId,
    name: mysauce.name,
    manufacturer: mysauce.manufacturer,
    description: mysauce.description,
    mainPepper: mysauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: mysauce.heat,
  });
} else {
  mysauce = req.body;
 var sauce = new sauces ({
    _id: req.params.id,
    userId: mysauce.userId,
    name: mysauce.name,
    manufacturer: mysauce.manufacturer,
    description: mysauce.description,
    mainPepper: mysauce.mainPepper,
    imageUrl: mysauce.imageUrl,
    heat: mysauce.heat,
  });
}
    sauces.updateOne({ _id: req.params.id }, sauce).then(
        () => {
    res.status(201).json({ message: "Sauce updated successfully¡" });
      })
      // created 
  .catch((error) => {
    res.status(404).json({ error: error });
  });
};
// Not Found


// delete the sauces
  exports.deletesauces = (req, res, next) => {
    sauces.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          sauces.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
            // ok
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  };
  //Bad Request



exports.likeSauces = (req, res, next) => {
   //  likes the sauce
    sauces.findOne({_id: req.params.id}).then((sauce) => {
          if (req.body.like == 1) {
          sauce.usersLiked.push(req.body.userId)
          sauce.likes += req.body.like
          }
     
//  is canceling their like or dislike
          else if (req.body.like == 0) {
            if (sauce.usersLiked.includes(req.body.userId)) {
               sauce.usersLiked = sauce.usersLiked.filter(like => like != req.body.userId);
          sauce.likes -= 1
            }
            if (sauce.usersDisliked.includes(req.body.userId)) {
              sauce.usersDisliked = sauce.usersDisliked.filter(dislikes => dislikes != req.body.userId);
              sauce.dislikes -= 1
           }
          }
      
        //dislikes the sauce    
          else if (req.body.like == -1) {
          sauce.usersDisliked.push(req.body.userId)
          sauce.dislikes += 1
          }
    
        sauce.save().then(
          () => {
              res.status(200).json({
                  message: "Sauce Like Updated!"
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
  });

    
  };