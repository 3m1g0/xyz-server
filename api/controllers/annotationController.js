'use strict';

require('../models/annotationModel');
var mongoose = require('mongoose'),
 Annotation = mongoose.model('Annotations');
 var setter = require('../utils/jsonSetter');

exports.list_all_annotations = function(req, res) {
  Annotation.find({}, function(err, annotation) {
    if (err)
      res.send(err);
    var response = {
        'type': 'FeatureCollection',
        'features': annotation
    };
    res.json(response);
  });
};


exports.create_a_annotation = function(req, res) {
  var new_annotation = new Annotation(req.body);
  new_annotation.save(function(err, annotation) {
    if (err)
      res.send(err);
    res.json(annotation);
  });
};


exports.read_a_annotation = function(req, res) {
  Annotation.findById(req.params.annotationId, function(err, annotation) {
    if (err)
      res.send(err);
    res.json(annotation);
  });
};


exports.update_a_annotation = function(req, res) {
  Annotation.findOneAndUpdate({_id : req.params.annotationId}, req.body, {
    new: true
  }, function(err, annotation) {
    if (err)
      res.send(err);
    res.json(annotation);
  });
};


exports.delete_a_annotation = function(req, res) {
  Annotation.remove({
    _id: req.params.annotationId
  }, function(err, annotation) {
    if (err)
      return res.send(err);
    res.json({
      message: 'Annotation successfully deleted'
    });
  });
};