import crypto from 'crypto'

const encrypt = {
  procEncryption: async (password: string, saltIng?: string): Promise<any> => {
    const salt:string = saltIng === undefined ? (await crypto.randomBytes(32)).toString('hex') : saltIng 
    return new Promise(async (resolve, reject) => {
        try {
            crypto.pbkdf2(password, salt, 125723, 12, 'sha512', (err, derivedKey) => {
                if(err) throw err;
                const hashed = derivedKey.toString('hex');
                resolve({salt, hashed});
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
  },
}

export default encrypt