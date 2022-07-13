const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MemberSchema = new Schema({
  login: LoginSchema,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  workspaces: [{type: Schema.Types.ObjectId, ref: "workspace"}]
});

const LoginSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
})

const WorkspaceSchema = new Schema({
  title: String,
  boards: [{
    name: String,
    boardsDetail: [{type: Schema.Types.ObjectId, ref: "board"}]
  }],
  members: [{type: Schema.Types.ObjectId, ref: "member"}] 
})


const BoardSchema = new Schema({
  title: String, //title not name
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
  label: LabelSchema,
  currentList: String,
  activity: [{type: Schema.Types.ObjectId, ref: "activity"}], 
  workspace: {type: Schema.Types.ObjectId, ref: "workspace"}
})


const ActivitySchema = new Schema({
  member: String,
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

const Member = mongoose.model("member", MemberSchema);
const Workspace = mongoose.model("workspace", WorkspaceSchema)
const Board = mongoose.model("board", BoardSchema)
const Card = mongoose.model("card", CardSchema)
const Label = mongoosem.model("label", LabelSchema)
const List = mongoose.model("list", ListSchema)
const Activity = mongoose.model("activity", ActivitySchema)

//Why have a listsId endpoint?