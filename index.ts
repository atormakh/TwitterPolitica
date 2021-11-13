import { getFollowersList } from './twitter_api/twitterApi'

function sleep(millis: any) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

const res = async (cursor: any) => {
  const aux = await getFollowersList('JMilei', cursor)
  console.log('aux===', aux)
  return aux
}

const main = async () => {
  var cursor = '-1'
  while (cursor) {
    console.log('whileeee', cursor)
    var aux = await res(cursor)
    await sleep(60 * 1000)
    cursor = aux.data.next_cursor_str
  }
}

main()
