async function findWithEmail(model, email) {
  return await model.findOne({ email });
}

module.exports = {
  findWithEmail,
};
