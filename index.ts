import { getFollowersList } from './twitter_api/twitterApi'

var cursor = '0'

const res = async () => {
  const aux = await getFollowersList('JMilei', cursor)
  console.log('aux===', aux)
  cursor = aux.data.next_cursor
}

while (cursor) {
  setTimeout(res, 60 * 1000)
}
