const fastcsv = require('fast-csv');
const axios = require('axios');

const uploadCsv = async (data)=>{
    await axios.get(`http://localhost:8888/upload`)
}
  
process.on('message', async (message) => {
    if (message == 'START') {
        try {
            console.log('Child process received START message');
            
            // const newCsvFile = await fastcsv.writeToBuffer(rows)
            // const fileData = newCsvFile.toString();
            await uploadCsv()
            console.log('child process finished')
            process.send(message);
        } catch (e){
            console.log({e})
        }
    }
});