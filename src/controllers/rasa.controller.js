const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { rasaService, tokenService } = require('../services');


const chat = catchAsync(async (req, res) => {
    const chatResponse = await rasaService.makeRasaRequest(req.body);
    //const tokens = await tokenService.generateAuthTokens(user);
    res.send(chatResponse);
});


module.exports = { chat }