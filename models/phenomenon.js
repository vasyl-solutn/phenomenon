const mongoose = require('mongoose');

const phenomenonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  upwards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phenomenon'
  }],
  downwards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phenomenon'
  }]
});

module.exports = mongoose.model('Phenomenon', phenomenonSchema);
