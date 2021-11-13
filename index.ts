import { getFollowersList } from './twitter_api/twitterApi'

const res = async () => {
  const aux = await getFollowersList('JMilei', 'aaa')
  console.log('aux===', aux)
}
res()
