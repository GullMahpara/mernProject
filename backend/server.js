const app=require('./app');


const dotenv = require('dotenv');
const connectDatabase=require('./config/database');


//handling uncaught exceptions
process.on("uncaughtException",(err)=>{
console.log(`Error:${err.message}`)
console.log(`shutting down the servr due to uncaught exceptions`);
process.exit(1);


})


//config
dotenv.config({path: "backend/config/config.env"});


//connectin to db
connectDatabase()

const server= app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on port ${process.env.PORT}`) 
});


//unhandled promises rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the servr due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
})