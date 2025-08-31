import express from 'express';
import { check_userOK } from '../middleware/isValidUser';
import { addNote, deleteContent, getNotes } from '../Controller/content.crud.controller';

export const contentRouter = express.Router();

contentRouter.post('/add' , check_userOK ,addNote);
contentRouter.get('/get_note' , check_userOK , getNotes);
contentRouter.delete('/delete',check_userOK, deleteContent);