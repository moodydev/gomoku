import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

Meteor.methods({
  createMessage: function(message) {
    Messages.insert({ text: message });
  },
});

export default Messages;
