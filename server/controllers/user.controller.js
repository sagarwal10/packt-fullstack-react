import User from '../models/user.model';
// import ... from 'lodash';
import errorHandler from './error.controller';

// POST - create a new user 
const create = (req, res, next) => { 
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
	error: errorHandler.getErrorMessage(err)
      });
    }

    res.status(200).json({
      message: "Successfully signed up!"
    });
  });
}; 

// GET - list all users
const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  }) 
};

// Find user by ID - called before any route that gets supplied a ID param
const userByID = (req, res, next, id) => {
   User.findById(id).exec((err, user) => {
     if (err || !user) {
       return res.status(400).json({
         error: "User not found"
       });
     }

     req.profile = user;
     next();
   });
};

// GET - Get an individual users details
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined; 
  return res.json(req.profile); 
};

// PUT - Update an individual users profile
const update = (req, res, next) => {
  let user = req.profile;;

  // merges both object into the first object
  user = _extend(user, req.body);
  user.updated = Date.now();

  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    user.hashed_password = undefined;
    user.salt = undefined;
   
    return user;
  });
} 

// DELETE - remove a users profile   
const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getError(err)
      });
    }

    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;

    return deletedUser;
  });
} 

export default { create, list, userByID, read, update, remove };

