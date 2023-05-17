import express, { Request, Response } from 'express'; 
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { createDailyNotices, getDailyNoticesByUserId, updateDailyNotices, getAllDailyNotices, getOne, deleteDailyNoticesById } from '../service/dailyNotices.service';
import { createDailyNoticesSchema, updateDailyNoticesSchema, getDailyNoticesByIdSchema, getDailyNoticesSchema } from '../schema/dailyNotices.schema';
const dailyNoticesHandler = express.Router();
let gameId: number;
let currentPlayer: string

dailyNoticesHandler.get("/", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    const userId = req.userId
    try{
        const dn = await getAllDailyNotices();
        return res.status(200).send(dn);
    }catch (err) {
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.post("/", validateSchema(createDailyNoticesSchema), async (req: Request, res: Response) => {
    const r = req.body
        const newDailyNotice = await createDailyNotices(r)
        return res.status(200).send(newDailyNotice)
 })

dailyNoticesHandler.get("/:_id", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    try{
        const oneDoc = await getOne(id);
        return res.status(200).send(oneDoc);
    }catch (err) {
        return res.status(500).send(err);
    } 
});


dailyNoticesHandler.put("/", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    try{
        const result = await updateDailyNotices(req.body)
        res.status(200).send(result)
        console.log(result)
    }catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
});

dailyNoticesHandler.delete("/:noticeId", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    try{
        console.log("in del handler")
        const noticeId = req.params.noticeId
        console.log(noticeId)
        const result = await deleteDailyNoticesById(noticeId)
        res.status(200).send(result)
    }catch (err) {
        return res.status(500).send(err)
    }
});

dailyNoticesHandler.get("/:userId/:gameId", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const g_Id = req.params.gameId
    const userId = req.params.userId
    try{
        const oneGame = await getOne({ gameId: { $eq: g_Id }, userId: { $eq: userId }} );
        return res.status(200).send(oneGame);
    }catch (err) {
        return res.status(500).send(err);
    }
});

//  dailyNoticesHandler.delete("/:userId/:gameId", validateSchema(updateDailyNoticesSchema), async (req: Request, res: Response) => {
//      const gameId = req.params.gameId as unknown as number
//      const userId = req.params.userId
//      const deleteGameUpdate = await deleteDailyNoticesByUserId({gameId: { $eq: gameId}, userId: {$eq: userId}})
//      return res.status(200).send(deleteGameUpdate)
//  })

export default dailyNoticesHandler;