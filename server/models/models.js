const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MemberSchema = new Schema({
  login: {
    username: String,
    password: String
  },
  //made this an object to contain all name related info in case after we finish MVP want to add things like title, suffixes, pronouns, etc
  // firstName: String,
  // lastName: String,
  name: {
    first: String,
    last: String
  },
  email: String,
  picture: String,
  workspaces: [{type: Schema.Types.ObjectId, ref: "workspace"}]
});

//since we don't have a collection in the database specifically for login data I moved this inside the member schema
// const LoginSchema = new Schema({
//   username: { type: String, required: true},
//   password: { type: String, required: true}
// })

const WorkspaceSchema = new Schema({
  title: String,
  //can pull names from boardID, otherwise if a board name gets changed have to do two separate database updates
  // boards: [{
  //   name: String,
  //   boardsDetail: [{type: Schema.Types.ObjectId, ref: "board"}]
  // }],
  boards: [{type: Schema.Types.ObjectId, ref: "board"}],
  members: [{type: Schema.Types.ObjectId, ref: "member"}] 
})


const BoardSchema = new Schema({
  title: String,
  lists: [{type: Schema.Types.ObjectId, ref: "list"}],
  members: [{type: Schema.Types.ObjectId, ref: "member"}],
  labels: [{type: Schema.Types.ObjectId, ref: "label"}]
})


const ListSchema = new Schema({
  title: String,
  cards:[{type: Schema.Types.ObjectId, ref: "card"}]
})

const CardSchema = new Schema({
  title: String,
  description: String,
  commentCount: Number,
  members: [{type: Schema.Types.ObjectId, ref: "member"}],
  //changed to a ref because if the same label is applied to 2 cards and then renamed/recolored it will change for both cards, so want to do one database update to change the label to update everywhere
  // label: LabelSchema,
  labels: [{type: Schema.Types.ObjectId, ref: "lable"}],
  //I put currentList in the model in swagger, may end up realizing we don't need it. Trying to think through drag and drop targets, may be trackable just in list's card array
  currentList: String,
  activity: [{type: Schema.Types.ObjectId, ref: "activity"}], 
  workspace: {type: Schema.Types.ObjectId, ref: "workspace"}
})


const ActivitySchema = new Schema({
  //Changed this to object with first and last name because I realized that's what gets displayed in the activity. I just updated swagger to match 
  // member: String,
  member: {
    first: String,
    last: String
  },
  activityType: String,
  previousListId: String,
  targetListId: String,
  comment: {
    text: String,
    edited: Boolean
  },
  date: {type: Date}
})

const LabelSchema = new Schema({
  title: String,
  color: String
})

exports.Member = mongoose.model("member", MemberSchema);
exports.Workspace = mongoose.model("workspace", WorkspaceSchema);
exports.List = mongoose.model("list", ListSchema);
exports.Board = mongoose.model("board", BoardSchema);
exports.Card = mongoose.model("card", CardSchema);
exports.Activity = mongoose.model("activity", ActivitySchema);
exports.Label = mongoose.model("label", LabelSchema);



//Why have a listsId endpoint?
////The board will render a bunch of list components that will be mapped from the lists array retrieved by the board request, then each list will make a request by the ID it's passed down in that mapping to get all the cards in it