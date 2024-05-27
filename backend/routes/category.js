const express = require("express");
const { categoryCreateValidator } = require("../validators/category");
const { runValidation } = require("../validators");
const {
	verifyToken,
	authMiddleware,
	adminMiddleware,
} = require("../controllers/auth");
const {
	create,
	list,
	read,
	update,
	remove,
} = require("../controllers/category");
const router = express.Router();

router.post(
	"/category",
	// categoryCreateValidator,runValidation, this works only for body data not for form data
	verifyToken,
	authMiddleware,
	create,
);
router.get("/categories", list);
router.post("/category/:slug", read);

router.get("/cat", (req, res) => {
	res.send("Category");
});

router.put("/category/:slug", verifyToken, authMiddleware, update);
router.delete("/category/:slug", verifyToken, adminMiddleware, remove);

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

module.exports = router;
