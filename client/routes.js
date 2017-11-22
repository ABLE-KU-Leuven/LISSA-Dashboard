import {Mongo} from 'meteor/mongo';
import '../imports/helpers/CSE.js';
import '../imports/helpers/courses.js';


rootRoute = Meteor.settings.public.rootroute == undefined ? "dev" : Meteor.settings.public.rootroute;

console.log("RouteRoot is " + rootRoute);
Router.route('/' + rootRoute + '/:_year/:_id',
  function () {
    var year = parseInt(Router.current().params._year);
    var yearString = year + "-" + (year + 1);
    Session.set("studentName", "");
    Session.set("student", parseInt(Router.current().params._id));
    Session.set("Year", yearString);
    Session.set("StartYear", year);

  }
);


Router.route('/' + rootRoute + '/:_year/',
  function () {
    Session.set("studentName", undefined);
    Session.set("student", undefined);
    Session.set("Year", "2016-2017");
    this.render("main")
    //reset();
  }
);

OwnBoekingen = new Meteor.Collection('own_boekingen');
ProgramBoekingen = new Meteor.Collection('program_boekingen');
