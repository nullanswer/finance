import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'
import './main.html';

Messages = new Mongo.Collection('messages');
Meteor.subscribe('messages');


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.messages.helpers({
    messages : messageFunc,
    time : timeFunc
});

Template.newMessage.events({
    "submit from" : createMessage
});

function messageFunc() {
    return Messages.find({},{sort: {'time': -1} });
}

function timeFunc(time) {
    return moment(time).format("HH:mm:ss");
}

function createMessage(evt) {
    Messages.insert({
        message : evt.target.message.value,
        time : new Date()
    });
    evt.target.message.value = "";
    return false;
}
