//Handles async middleware errors to prevent server from crashing
/*
  @params
    delegate - async middleware to be executed
    defaultStatus(optional) - integer that represents the http response status if delegate causes error
  @returns
    middleware to execute the given function and handle errors
 */
function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
      Promise.resolve()
        .then(() => delegate(request, response, next))
        .catch((error = {}) => {
          const { status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;