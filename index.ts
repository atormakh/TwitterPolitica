import { logger } from './logger'
import {  addMultipleFollowers, connectMongoDB, disconnectMongoDB } from './mongodb'
import { getFollowersList } from './twitter_api/twitterApi'
import * as dotenv from 'dotenv'

dotenv.config()

function sleep(millis: any) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

const res = async (screen_name:string,cursor: any) => {
  const aux = await getFollowersList(screen_name, cursor)
  return aux
}

const getAllAcountFollowers= async (candidate:candidate)=>{
  logger.info(`Starting getAllAccountFollowers for ${candidate.screen_name}`)
  let cursor:string|undefined = candidate.startingCursor || '-1'
  let errors = 0;
  while (cursor && cursor !== "0") {
    try {
      var aux:any = await res(candidate.screen_name,cursor)
       
      cursor = aux.data.next_cursor_str
      errors=0
      logger.info(`{user:${candidate.screen_name},IDs length:${aux.data.ids.length}, NextCursor:${cursor}}`);
      await addMultipleFollowers(candidate.screen_name,aux.data.ids)
    } catch (error:any) {
      //queremos diferentes conmportamientos si es ETIMEDOUT que si es Too Many Requests
      errors++
      if(errors<10){
        logger.info(`Error number ${errors}`)
        logger.error(error)
        if(error && error.response && error.response.status == 429){
          logger.info("TOO MANY REQUESTS ERROR. Waiting 15 minutes to resume")
          await sleep(15 * 60 * 1000);
          logger.info("Resuming requests")
        }else{
          await sleep(20 * 1000)
        }
        
      }else{
        cursor = undefined;
      }
      
    }finally{
        await sleep(75 * 1000)
      }
    
   
  }
  if(errors==0){
    logger.info(`Finished succesfully to retrieve all ${candidate.screen_name} followers`)
  }
  
}

interface candidate{
  screen_name:string
  startingCursor?:string
}
const cabaCanditates:candidate[] = [{screen_name:"JMilei"},{screen_name:"SantoroLeandro"},{screen_name:"mariuvidal"},{screen_name:"myriambregman"}]
const bsasCandidates:candidate[] = [{screen_name:"jlespert"},{screen_name:"NicolasdelCano"},{screen_name:"vtolosapaz"},{screen_name:"diegosantilli"},{screen_name:"RandazzoF"},{screen_name:"CynthiaHotton"}]

const main = async () => {
  try {
    await connectMongoDB()

    for(let i=0; i<bsasCandidates.length;i++){
      const candidate:candidate = bsasCandidates[i]
      await getAllAcountFollowers(candidate)
    }
  } catch (error) {
    logger.error(`error trying to do something outside of each users try catch`)
    console.log("ERRRORRR===",error)
  }finally{
    await disconnectMongoDB();
  }
}

main()

