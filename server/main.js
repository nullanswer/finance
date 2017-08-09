import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Messages = new Mongo.Collection('messages');

Meteor.startup(() => {

});

Meteor.publish('messages', function taskPublication() {
    return Messages.find();
});