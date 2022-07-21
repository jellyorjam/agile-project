const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MemberSchema = new Schema({
  login: {
    username: String,
    password: String
  },
  name: {
    first: String,
    last: String
  },
  email: String,
  picture: String,
  workspaces: [{type: Schema.Types.ObjectId, ref: "workspace"}]
});

const WorkspaceSchema = new Schema({
  title: String,
  description: String,
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
  labels: [{type: Schema.Types.ObjectId, ref: "label"}],
  currentList: String,
  activity: [{type: Schema.Types.ObjectId, ref: "activity"}], 
  board: {type: Schema.Types.ObjectId, ref: "workspace"}
})


const ActivitySchema = new Schema({
  member: {type: Schema.Types.ObjectId, ref: "member"},

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


