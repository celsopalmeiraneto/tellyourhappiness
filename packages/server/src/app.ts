import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import {DynamoDB} from 'aws-sdk';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

export const app = express();

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

router.get('/ping', (req, res) => {
  return res.send(`Hello. This is a ping. The time is ${new Date().toISOString()}.`);
}); 

router.post('/amIHappy', (req, res) => {
  try{
    const body = req.body;
    const db = new DynamoDB();
    
    const dbItem : DynamoDB.PutItemInput = {
      Item: {
        id: {
          S: uuidv4()
        },
        happy: {
          N: body.amIHappy ? '1' : '0'
        },
        isHappy: {
          BOOL: body.amIHappy
        },
      },
      TableName: 'happiness'
    };

    db.putItem(dbItem, (err, data) => {
      if (err) {
        console.error('Error inserting the data', err, dbItem, data);
        return res.status(500).send('Sorry... An error,');
      }
      return res.json({
        ok: true
      })
    });  
  } catch (e) {
    console.error(e, );
    return res.status(500).send('Sorry... An error,');
  }
}); 

app.use('/api', router);