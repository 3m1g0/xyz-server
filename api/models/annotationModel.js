'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnotationsSchema = new Schema({
    type: {type: String},
    'geometry' : {
        type: {
            type: String
        },
        'coordinates' : {
            'type' : [[[Number]]],
            'required' : true
        }
    },
    'properties' : {
        'title' : String,
        'description' : String,
        'date' : { 
            type: Date, 
            default: Date.now 
        },
        'extras' : String
    }
});

module.exports = mongoose.model('Annotations', AnnotationsSchema);