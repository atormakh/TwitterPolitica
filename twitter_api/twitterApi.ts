import axios from 'axios'

//ponerle de dafault url "https://api.twitter.com/"
//agregarle por default el Bearer Token de twitter developer
const token =
  'AAAAAAAAAAAAAAAAAAAAAJFQVQEAAAAAjTIQW8oHDX4fVz2qdf9n%2FFlB0DI%3DhExDAb6LlqGZpR55801JJZXevj4UWxc9c8Qgg3g2SIMCk4rK2d'
const twitter = axios.create({
  baseURL: 'https://api.twitter.com/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

async function getFollowersList(screen_name: string, cursor: string) {
  //console.log('TOKEN ===', process.env.TWITTER_API_BEARER_TOKEN)
  const uri: string = `1.1/followers/ids.json?cursor=-1&screen_name=${screen_name}&count=10&stringify_ids=true`
  return await twitter.get(uri)
}

export { getFollowersList }
