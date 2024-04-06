import express from "express"
import { Book } from "../models/bookModel.js";

const router =  express.Router();

//create a new book entry

router.post('/', async (req,res)=>{
    try {

        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear
            ){
                return res
                .status(500)
                .send({message:"send a required fields, title author & publish year"});
            }

        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res
        .status(201)
        .send(book);
        
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .send({message:error.message});
    }
})


//get all books from database

router.get('/', async (req,res)=>{
    try {

        const books = await Book.find({});
        
        return res
        .status(201)
        .send({
            count: books.length,
            data:books
        });
        
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .send({message:error.message});
    }
})


//get a book from database by id

router.get('/:id', async (req,res)=>{
    try {

        const {id} = req.params;

        const book = await Book.findById(id);
        
        return res
        .status(201)
        .send(book);
        
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .send({message:error.message});
    }
})

//route for update a book
router.put('/:id' , async (req,res)=>{
try {

    if(!req.body.title||
        !req.body.author||
        !req.body.publishYear
        ){
            return res
            .status(500)
            .send({message:"send a required fields, title author & publish year"});
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404)
            .send({message:"book not found"})
        }

        return res
        .status(500)
        .send({message:"book updated succsessfully"})
    
} catch (error) {
    console.log(error);
    return res
    .status(500)
    .send({message:error.message});
}

})


//route for delete a book
router.delete('/:id', async (req,res)=>{
    try {
        
        const {id}= req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404)
            .send({message:"book not found"})
        }
        return res
        .status(500)
        .send({message:"book deleted succsessfully"})

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .send({message:error.message});
    }
})

export default router;