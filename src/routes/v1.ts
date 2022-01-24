import express from 'express';
const router = express.Router();

import MineBlockController from '../controller/mineBlock';
import GetChainController from '../controller/getChain';


router.get('/mine_block', MineBlockController.mine_block)
router.get('/get_chain', GetChainController.get_chain)


module.exports = (app: any) => app.use("/v1", router);
