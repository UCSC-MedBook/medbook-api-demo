telescopeHost = "http://localhost:10000/";

if (Meteor.isClient) {
  // stateNumber starts at 0
  Session.setDefault("stateNumber", 0);

  Template.hello.helpers({
    stateNumber: function () {
      return Session.get("stateNumber") + 1;
    }
  });

  Template.hello.events({

    'click #testPostFromClient': function () {
        Session.set("stateNumber",     Session.get("stateNumber") + 1);
        var msg = "Client State Number=" + Session.get("stateNumber");

        var postObject = {
            userId: this.userId,
            collaboration:  ["Neuroendocrine"],
            title:  msg,
            content: msg,
            url: "",
            blobs: null,
            appStateId: null,
       };
       var authToken = Accounts && Accounts._storedLoginToken()

       MedBookPost(telescopeHost, authToken, postObject, function(err, ret) {
          console.log("err", err);
          console.log("ret", ret);
       })
    },

    'click #testPostFromServer': function () {
        Session.set("stateNumber",     Session.get("stateNumber") + 1);
        var msg = "Server State Number=" + Session.get("stateNumber");

        var postObject = {
            userId: this.userId,
            collaboration:  ["Neuroendocrine"],
            title:  msg,
            content: msg,
            url: "",
            blobs: null,
            appStateId: null,
        };
        var authToken = Accounts && Accounts._storedLoginToken()

        Meteor.call("ServerMedBookPost", telescopeHost, authToken, postObject, function(err, ret) {
            console.log("err", err);
            console.log("ret", ret);
        })
    }});
}
