const errorHandler = (err,req,res,next) =>{
  let code = 500;
  let message = err;

  if (
  err.name === `SequelizeValidationError` ||
  err.name === `SequelizeUniqueConstraintError` 
  ) {
  code = 400;
  message = err.errors.map(el => el.message);
  } else if (
  err.name === `invalid` 
  ){
  code = 401;
  message = `Invalid`;
  } else if (
  err.name === `Food not found` ||
  err.name === `Table not found` ||
  err.name === `Customer not found`
  ) {
  code = 404;
  message = `Error not found`;
  } else if (
  err.name === "Forbidden"
  ) {
  code = 403; 
  message = "You do not have access";
  } else if (
  err.name === "BadRequest"
  ) {
  code = 400; 
  message = "Params id must an integer";
  } else if (
  err.name === "NotFound" || 
  err.name === "Not Found The Book"
  ) {
  code = 404;
  message = "Not Found";
  } else if (
  err.name === "InvalidToken" || 
  err.name === "JsonWebTokenError"
  ) {
  code = 401;
  message = "Access Token is Invalid";
  } else if (
  err.name === `Email has been registered`
  ) {
  code = 401;
  message = `Email has been registered`;      
  } else if (
  err.name === `Email has been registered`
  ) {
  code = 400; 
  message = `Email has been registered`;
  } else if (
  err.name === `Book has been registered`
  ) {
  code = 400; 
  message = `Book has been registered`; 
  } else if (
  err.name === `Book is already Booked`
  ) {
  code = 400; 
  message = `Book is already Booked`; 
  } else if (
  err.name === `Already Borrowed`
  ) {
  code = 400; 
  message = `Already Borrowed`; 
  } else if (err.name === `Format file yang diizinkan hanya JPG dan PNG`){
    code = 500;
    message = `Format file yang diizinkan hanya JPG dan PNG`
  } else if (
  err.name === `Data Rental not found`
   ) {
  code = 404; 
  message = `Data Rental not found(Tidak meminjam)`; 
  }
      res.status(code).json({
      statusCode: code,
      error: {
      message
  }
  });
}

module.exports = errorHandler