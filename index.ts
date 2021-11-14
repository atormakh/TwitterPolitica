import {  addMultipleFollowers, connectMongoDB, disconnectMongoDB } from './mongodb'
import { getFollowersList } from './twitter_api/twitterApi'

function sleep(millis: any) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

const res = async (screen_name:string,cursor: any) => {
  const aux = await getFollowersList(screen_name, cursor)
  return aux
}

const getAllAcountFollowers= async (screen_name:string)=>{
  let cursor:string = '-1'
  while (cursor && cursor !== "0") {
    
    var aux = await res(screen_name,cursor)
    await sleep(75 * 1000)
    cursor = aux.data.next_cursor_str
    console.log('IDs length===', aux.data.ids.length)
    console.log("Next Cursor===",cursor)
    await addMultipleFollowers(screen_name,aux.data.ids)
  }
}


const main = async () => {
  try {
    await connectMongoDB()
    await getAllAcountFollowers("JMilei")
    console.log("FINISHED GRACEFULLY")
  } catch (error) {
    console.log("ERRRORRR===",error)
  }finally{
    await disconnectMongoDB();
  }
}

main()

