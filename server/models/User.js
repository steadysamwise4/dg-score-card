const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'email address invalid!']
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      // note use of virtual below if only want to list course names from rounds data
      courses: [
        {
          type: Schema.Types.ObjectId,
          ref:'Course'
        }
      ],
      rounds: [
        {
          type: Schema.Types.ObjectId,
          ref:'Round'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true
      }
    }
  );

  // set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

userSchema.virtual('coursesPlayed').get(function() {
  let coursesPlayed = this.rounds.map(course => {
    return course.courseName;
  });
  return coursesPlayed;
});

const User = model('User', userSchema);

module.exports = User;