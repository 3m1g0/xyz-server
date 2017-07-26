'use strict';
module.exports = function(app) {
  var annotationList = require('../controllers/annotationController');


  // annotation Routes
  app.route('/annotations')
    .get(annotationList.list_all_annotations)
    .post(annotationList.create_a_annotation);


  app.route('/annotations/:annotationId')
    .get(annotationList.read_a_annotation)
    .put(annotationList.update_a_annotation)
    .delete(annotationList.delete_a_annotation);
};