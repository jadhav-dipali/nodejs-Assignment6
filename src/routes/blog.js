const router = require('express').Router();
const { render } = require('../app');
const Blog = require('../models/Blog')

// Your routing code goes here

router.get("/" , (req, res)=>{
    res.send("hello world")
})

// ************create a blog**************
router.post("/blog",async(req, res)=>{
      try{
      let blog1 = new Blog( req.body);//we write //get data here
      let createBlog =await blog1.save();
      res.status(201).send(createBlog);
      }catch(err){
        res.status(400).send(err);
      }
})

// ****************read Blog******************
router.get("/blog" , async(req, res)=>{
    try{
        let page = req.query.page;//
        let serachTitle = await  Blog.find({topic:new RegExp(req.query.search, "i")});//10[{},{}]
        if(serachTitle.length){//10 //
            let pagination = serachTitle.slice((page-1)*5 , page*5);//0-4//5
            if(pagination.length){
                res.json(pagination);
            }else{
                res.status(400).send("no such result found");
            }
        }else{
            res.status(400).send("no such result found");  
        }
    }catch(err){
        res.status(404).send(err);
    }
})


// *******************Read All*************************

router.get("/blog/all" , async(req, res)=>{
    try{
      let readData = await Blog.find();
      res.send(readData)
    }
    catch(err){
        res.status(400).send(err);
    }
})




// ******************update blog**********************

router.put("/blog/:id", async(req, res)=>{
    try{
        let _id = req.params.id;//getting id
        let updatedData = await Blog.findByIdAndUpdate(_id,req.body,{new:true} );
        res.send(updatedData)
    }catch(err){
        res.status(400).send(err);
    }
})

// ******************Deleted blogs*******************************

router.delete("/blog/:id" , async(req, res)=>{
    try{
       let deletedData =await Blog.findByIdAndDelete(req.params.id);
       res.send(deletedData)
    }
    catch(err){
        res.status(400).send(err);
    }
})


router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
})


module.exports = router;

