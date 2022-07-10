const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MemberSchema = new Schema({
  login: LoginSchema,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  workspaces: [WorkspaceSchema]
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
  members: [{type: Schema.Types.ObjectId, ref: "member"}] // by ref because you only need to see members when you click on them
})



const BoardSchema = new Schema({
  lists: [ListSchema],
  members: [MemberSchema] // boards also needs a member property, not by refs because members will always be shown
})


const ListSchema = new Schema({
  title: String,
  cards: [{
    cardsDetail: [{type: Schema.Types.ObjectId, ref: "card"}],
    cardTitle: String,
    commentCount: Number
  }]
})

const CardSchema = new Schema({
  title: String,
  description: String,
  members: [MemberSchema],
  label: {
    color: String
  },
  currentList: String,
  activity: [ActivitySchema]

// why does card schema need workspace property?
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

const Member = mongoose.model("member", MemberSchema);
const Board = mongoose.model("board", BoardSchema)
const Card = mongoose.model("card", CardSchema)
