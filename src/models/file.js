import mongoose from 'mongoose';
import crypto from 'crypto';
import assert from 'assert';

const fileSchema = new mongoose.Schema({
  data:[{
    dataIndex: { type: Number, max: 2000 },
	  urlSearch: { type: String },
	  totalSearch: { type: String },
    leadCount: { type: Number, max: 2000 },
	  profileVisit: { type: Array },
    searchName: { type: String },
    lastPage: { type: Number }
	}],
	meta:{
    username: { type: String },
    linkedin: {
      email: {type: String},
      password: {type: String}
    }
	}
});

const File = mongoose.model('File', fileSchema, 'file');

export const findFile = (params, cb) => {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, (err, file) => {
    console.log(file);
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};
