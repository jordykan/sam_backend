import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes/index';
import history from 'connect-history-api-fallback'

const app = express();
const dburl = ''

mongoose.Promise=global.Promise
mongoose.connect(dburl, {useCreateIndex:true,useNewUrlParser: true,useUnifiedTopology: true})
.then(mongoose => console.log('Conectando a la BD en el puerto 27017'))
.catch(err => console.log(err));
app.use(history())
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/api',router);
app.set('port',process.env.PORT || 3000);

app.get('/hola',function(req,res){
    res.send('Hola mundo');
})

app.listen(app.get('port'),()=>{
    console.log('server on port'+ app.get('port'));
})
 