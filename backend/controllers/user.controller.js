import { User } from "../models/user.model.js";

//me rcontroller
export const me = async (req, res) => {
  const loggedInUser = req.user._id;
  try {
    const user = await User.findById(loggedInUser);
    // console.log(user);
    res.status(201).json({
      success: true,
      message: "here is your profile",
      user,
    });
  } catch (error) {
    console.log("error in me controller ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFriends = async (req, res) => {
  // try {
  //   const loggedInUser = req.user._id;

  //   const user = await User.findById(loggedInUser).populate("friends");
  //   const friend = user.friends;
  //   res.status(201).json({
  //     success: true,
  //     message: "friends fetched",
  //     friend,
  //   });
  // } catch (error) {
  //   console.log("error in get friends controller ", error.message);
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
  // console.log("hitting this api");
  try {
    // console.log("code here");

    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      return res.status(404).json("No user found");
    }

    const filteredusers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    if (!filteredusers) {
      return res.status(404).json({
        error: "Somethig unexpected happened",
      });
    }

    const filteredusersSize = filteredusers.length;

    res.status(200).json({
      message: "All user fetched",
      filteredusers,
      filteredusersSize,
    });
  } catch (error) {
    console.log("error in getuser controller ", error.message);
    res.status(500).json({});
  }
};

export const getusers = async (req, res) => {
  // console.log("hitting this api");
  try {
    // console.log("code here");

    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      return res.status(404).json("No user found");
    }

    const filteredusers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    if (!filteredusers) {
      return res.status(404).json({
        error: "Somethig unexpected happened",
      });
    }

    const filteredusersSize = filteredusers.length;

    res.status(200).json({
      message: "All user fetched",
      filteredusers,
      filteredusersSize,
    });
  } catch (error) {
    console.log("error in getuser controller ", error.message);
    res.status(500).json({});
  }
};

//added new

export const sendOrUnsendRequest = async (req, res) => {
  console.log("Hitting send request route");
  const loggedInUser = req.user._id;
  const toAddUser = req.params.id;

  try {
    const userToSend = await User.findById(toAddUser);
    const userSending = await User.findById(loggedInUser);

    if (!userToSend) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
        // userSending,
      });
    } else {
      if (userToSend.receivedFriendRequest.includes(loggedInUser)) {
        const indexOfLoggedInUserInRecievedArray =
          userToSend.receivedFriendRequest.indexOf(loggedInUser);
        userToSend.receivedFriendRequest.splice(
          indexOfLoggedInUserInRecievedArray,
          1
        );

        const indexOfParamUserInSentArray =
          userSending.sentFriendRequest.indexOf(toAddUser);
        userSending.sentFriendRequest.splice(indexOfParamUserInSentArray, 1);

        await userToSend.save();
        await userSending.save();

        res.status(201).json({
          success: true,
          message: "Request unsent",
          userSending,
        });
      } else {
        userToSend.receivedFriendRequest.push(loggedInUser);
        userSending.sentFriendRequest.push(toAddUser);

        await userSending.save();
        await userToSend.save();

        res.status(201).json({
          success: true,
          message: "Request sent",
          userSending,
        });
      }
    }
  } catch (error) {
    console.log("error in getuser controller ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptRequest = async (req, res) => {
  const loggedInUser = req.user._id;
  const toAccept = req.params.id;

  try {
    const userToAccept = await User.findById(toAccept);
    const userAccepting = await User.findById(loggedInUser);

    if (!userToAccept) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    } else {
      const indexOfUserToAcceptInRecievedArray =
        userAccepting.receivedFriendRequest.indexOf(toAccept);
      userAccepting.receivedFriendRequest.splice(
        indexOfUserToAcceptInRecievedArray,
        1
      );

      const indexOfUserAcceptingSentArray =
        userToAccept.sentFriendRequest.indexOf(loggedInUser);
      userToAccept.sentFriendRequest.splice(indexOfUserAcceptingSentArray, 1);

      userAccepting.friends.push(toAccept);
      userToAccept.friends.push(loggedInUser);

      await userAccepting.save();
      await userToAccept.save();

      res.status(201).json({
        success: true,
        message: `${userToAccept.fullName} is now your friend`,
        userAccepting,
      });
    }
  } catch (error) {
    console.log("error in Accept request controller ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelRequest = async (req, res) => {
  const loggedInUser = req.user._id;
  const toCancel = req.params.id;

  try {
    const userToCancel = await User.findById(toCancel);
    const cancellingUser = await User.findById(loggedInUser);

    if (!userToCancel) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    } else {
      const indexOfUserToCancelInRecievedArray =
        cancellingUser.receivedFriendRequest.indexOf(toCancel);
      cancellingUser.receivedFriendRequest.splice(
        indexOfUserToCancelInRecievedArray,
        1
      );

      const indexOfCancellingUserInSentArray =
        userToCancel.sentFriendRequest.indexOf(loggedInUser);
      userToCancel.sentFriendRequest.splice(indexOfCancellingUserInSentArray);

      await userToCancel.save();
      await cancellingUser.save();

      res.status(201).json({
        success: true,
        message: "Request rejected",
        cancellingUser,
      });
    }
  } catch (error) {
    console.log("error in cancel request controller ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfriend = async (req, res) => {
  const loggedInUser = req.user._id;
  const IdofUnfriend = req.params.id;

  try {
    const userUnfriending = await User.findById(loggedInUser);
    const userToUnfriend = await User.findById(IdofUnfriend);

    if (!userToUnfriend) {
      return res.status(404).json({
        success: false,
        message: "User not exist",
      });
    } else {
      if (!userUnfriending.friends.includes(IdofUnfriend)) {
        return res.status(400).json({
          success: false,
          message: `${userToUnfriend.fullName} is not your friend, your cant unfriend a person who is not your friend`,
        });
      } else {
        const indexOfUnfriendingUser =
          userToUnfriend.friends.indexOf(loggedInUser);
        userToUnfriend.friends.splice(indexOfUnfriendingUser, 1);

        const indexOfUserToUnfriend =
          userUnfriending.friends.indexOf(IdofUnfriend);
        userUnfriending.friends.splice(indexOfUserToUnfriend, 1);

        await userToUnfriend.save();
        await userUnfriending.save();

        res.status(201).json({
          success: true,
          message: `${userToUnfriend.fullName} is unfriended`,
          userUnfriending,
        });
      }
    }
  } catch (error) {
    console.log("error in unfriend controller ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
