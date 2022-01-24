import cryptoJs from 'crypto-js';

class BlockChain {
    public chain = [] as any;
    public created_block = {
        proof: 1,
        previous_hash: '0'
    }

    async Created_block(proof: any, previous_hash: any) {

        let block = {
            'index': this.chain.length,
            'timestamp': new Date(),
            'proof': proof,
            'previous_hash': previous_hash
        }
       
        this.chain.push(block)
        return block
    }

    async get_previous_block() {
        if(this.chain.length > 0){
            return this.chain[this.chain.length - 1] 
        }else{
            return [] 
        }
       
    }

    async proof_of_work(previous_proof: any) {
 
        let new_proof = 1;
        let check_proof = false;

        while (check_proof === false) {
            let hash_operation = cryptoJs.SHA256((new_proof ** 2 - previous_proof ** 2).toString())
                .toString(cryptoJs.enc.Hex)


            if (hash_operation.slice(0, 4) === '0000') {
                check_proof = true;
            } else {
                new_proof += 1
            }
        };

        return new_proof
    }

    async hash(block: any) {
        let encoded_block = JSON.stringify(block);
        let returnValue = cryptoJs.SHA256(encoded_block).toString(cryptoJs.enc.Hex)
        return returnValue;
    }
    async is_chain_valid(req: any, res: any) {
        let previous_block = this.chain[0];
        let block_index = 1;

        while (block_index < this.chain.length) {
            let block = this.chain[block_index];
            if (block['previous_hash'] !== this.hash(previous_block)) {
                return false;
            }
            let previous_proof = previous_block['proof'];
            let proof = block['proof'];
            let hash_operation = cryptoJs.SHA256((proof ** 2 - previous_proof ** 2).toString())
                .toString(cryptoJs.enc.Hex);
            if (hash_operation.slice(0, 4) === '0000') {
                return false;
            }
            previous_block = block;
            block_index += 1;
        }

        return res.status(200).json({ data: true })
    }

}
export default new BlockChain();