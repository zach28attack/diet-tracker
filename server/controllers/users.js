const User = require("../models/user");

exports.signup = async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  if (user.email && user.username && user.password && user.password === req.body.passwordConfirmation) {
    try {
      await user.saveNew();
      res.status(200).json({
        username: user.username,
        id: user.id,
        token: user.token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json();
    }
  } else {
    res.status(400).json();
  }
};

exports.login = async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  try {
    const success = await user.validateUser();
    if (success) {
      res.status(200).json({
        username: user.username,
        name: user.name,
        id: user.id,
        token: user.token,
      });
    } else {
      res.status(401).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};

exports.logout = async (req, res) => {
  try {
    const user = req.user;
    const success = await user.revokeToken();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getLogs = async (req, res) => {
  try {
    const user = req.user;
    const logs = await user.getLogs();
    if (logs && logs.length >= 1) {
      res.status(200).json({
        logs: logs,
      });
    } else if (logs && logs.length === 0) {
      res.status(200).json({
        logs: [],
      });
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveNewLog = async (req, res) => {
  try {
    const user = req.user;
    user.log = req.body.log;
    const success = await user.saveNewLog();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const user = req.user;
    user.log = req.body.log;
    const success = await user.deleteLog();
    if (success) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveLikedPostId = async (req, res) => {
  try {
    const user = req.user;
    user.likedPostId = req.body.postId;
    const success = await user.saveLikedPostId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.removeLikedPostId = async (req, res) => {
  try {
    const user = req.user;
    user.likedPostId = req.params.postId;
    const success = await user.removeLikedPostId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getLikedPostIds = async (req, res) => {
  const ids = await req.user.getLikedPostIds();
  res.status(200).json({
    likedPostIds: ids,
  });
};

exports.saveCommunityId = async (req, res) => {
  try {
    req.user.communityId = req.body.communityId;
    const success = await req.user.saveCommunityId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.removeCommunityId = async (req, res) => {
  try {
    req.user.communityId = req.body.communityId;
    const success = await req.user.removeCommunityId();
    if (success) {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
  }
};
