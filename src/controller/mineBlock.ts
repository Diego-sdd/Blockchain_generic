import initBlockchain from "./initBlockchain";

class MineBlock {

    async mine_block(req: any, res: any) {

        let previous_block = await initBlockchain.get_previous_block()

        const previous_proof = previous_block['proof']
         
        var proof: number = 0
        if (previous_proof !== undefined) {
            proof = await initBlockchain.proof_of_work(previous_proof)
        } else {
            proof = await initBlockchain.proof_of_work(0)
        }
     

        let previous_hash = await initBlockchain.hash(proof)
        let block = await initBlockchain.Created_block(proof, previous_hash)


        console.log(block)
        return res.status(200).json(block)
    }

}
export default new MineBlock();