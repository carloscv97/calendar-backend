const mongoose = require("mongoose");

const dbConnection = async() => {

   try {
      
       await mongoose.connect( process.env.DB_CONNECTION,
         {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
         });

         console.log('Data Base Online');

   } catch (err) {
      console.log(err);
      throw new Error('Error a la hora de inicializar base de datos');
   }

}

module.exports = {
   dbConnection
}