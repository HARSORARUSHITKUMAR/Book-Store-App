const express = require('express');
const router = express.Router();


// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book
router.post("/create-book", async (req, res) => {
    console.log(req.body);
})


module.exports = router;