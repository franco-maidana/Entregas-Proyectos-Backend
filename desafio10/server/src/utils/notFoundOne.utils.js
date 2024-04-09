function notFoundOne(one) {
  if (!one) {
    const error = new Error("there arent's documents");
    error.statusCode = 404;
    throw error;
  }
  return one;
}

export default notFoundOne;
