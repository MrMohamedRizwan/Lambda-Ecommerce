const express = require("express");

const {
	registeration,
	registerActivate,
	login,
	verifyToken,
	forgotPassword,
	resetPassword,
} = require("../controllers/auth");
const {
	userRegisterValidator,
	userLoginValidator,
	Forgotpassvalidator,
	resetPasswordValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const router = express.Router();

router.post("/register", userRegisterValidator, runValidation, registeration);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);
router.post(
	"/forgot-password",
	Forgotpassvalidator,
	runValidation,
	forgotPassword,
);
router.put(
	"/reset-password",
	resetPasswordValidator,
	runValidation,
	resetPassword,
);
/*#swagger.summary = 'Add a Group to be monitored'
  #swagger.description="Add a Group to be monitored"  
*/

/*
  #swagger.parameters['group_id'] = {
    in: 'query',
    description: 'Id of a Group',
    required: true,
    type: 'string'
  }
*/

/* #swagger.responses[200] = { 
     description: 'Details of the Group that is added to be monitored',
     schema: {
         type: 'object',
         properties: {
             MetaData: {
                 type: 'string',
                 description: "Details of the Group that is added to be monitored"
             }
         }
     },
     examples: {
         'application/json': {
             MetaData:{
                    "_id": "xxxxx",
                    "groupName": "xxxxxx",
                    "groupId": "xxxxxx@g.us",
                    "groupDescription": "xxxxxx",
                    "UserId": "xxxxx@c.us",
                    "createdAt": "2024-02-23T12:19:08.904Z",
                    "updatedAt": "2024-02-23T12:19:08.904Z",
                    "__v": 0
                    }
         }
     }
}
*/

/* #swagger.responses[400] = { 
     description: 'Missing Parameter',
     schema: {
         type: 'object',
         properties: {
             error: {
                 type: 'string',
                 description: 'Error message'
             }
         }
     },
     examples: {
         'application/json': {
             error: 'GroupId query parameter is required'
         }
     }
}
*/

/* #swagger.responses[500] = { 
     description: 'Internal Server Error',
     schema: {
         type: 'object',
         properties: {
             error: {
                 type: 'string',
                 description: 'Error message'
             }
         }
     },
     examples: {
         'application/json': {
             error: 'Internal Server Error'
         }
     }
}
*/

/* #swagger.responses[404] = { 
     description: 'Invalid GroupId',
     schema: {
         type: 'object',
         properties: {
             error: {
                 type: 'string',
                 description: 'Error message'
             }
         }
     },
     examples: {
         'application/json': {
             error: "Group is Missing/Invalid GroupId"
         }
     }
}
*/

// userLoginValidator,runValidation,
// router.get('/secret',verifyToken,(req,res)=>{
//     res.send("This can be accesed if token is present");
// })

module.exports = router;
