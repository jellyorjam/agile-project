const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Models with subdocs

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
  boards: [BoardSchema],
  members: [MemberSchema]
})

const BoardSchema = new Schema({
  lists: [ListSchema]
})

const ListSchema = new Schema({
  title: String,
  cards: [CardSchema]
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