const model = require('../model/business.model');

async function findWithEmail(email) {
  return await model.findOne({ email });
}

module.exports = {
  findWithEmail,
};
