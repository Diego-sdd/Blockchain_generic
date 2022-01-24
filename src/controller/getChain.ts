import initBlockchain from "./initBlockchain";

class GetChain {

    async get_chain(req: any, res: any) {
        let response = {
            "chain": initBlockchain.chain,
            "length": initBlockchain.chain.length
        }

        return res.status(200).json(response)
    }

}
export default new GetChain();