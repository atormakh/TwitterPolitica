export const mongoQuery:any = [
    {
      '$match': {
        'referenced_tweets': {
          '$exists': false
        }
      }
    }, {
      '$group': {
        '_id': '$author', 
        'likes': {
          '$sum': '$public_metrics.like_count'
        }, 
        'replies': {
          '$sum': '$public_metrics.reply_count'
        }, 
        'retweets': {
          '$sum': '$public_metrics.retweet_count'
        }, 
        'quotes': {
          '$sum': '$public_metrics.quote_count'
        }, 
        'likesAVG': {
          '$avg': '$public_metrics.like_count'
        }, 
        'repliesAVG': {
          '$avg': '$public_metrics.reply_count'
        }, 
        'retweetsAVG': {
          '$avg': '$public_metrics.retweet_count'
        }, 
        'quotesAVG': {
          '$avg': '$public_metrics.quote_count'
        }, 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'candidates', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'followersArray'
      }
    }, {
      '$unwind': {
        'path': '$followersArray'
      }
    }, {
      '$project': {
        '_id': 1, 
        'likes': 1, 
        'replies': 1, 
        'retweets': 1, 
        'quotes': 1, 
        'likesAVG': 1, 
        'repliesAVG': 1, 
        'retweetsAVG': 1, 
        'quotesAVG': 1, 
        'count': 1, 
        'followers': '$followersArray.followers', 
        'likesFAVG': {
          '$divide': [
            '$likesAVG', '$followersArray.followers'
          ]
        }, 
        'repliesFAVG': {
          '$divide': [
            '$repliesAVG', '$followersArray.followers'
          ]
        }, 
        'retweetsFAVG': {
          '$divide': [
            '$retweetsAVG', '$followersArray.followers'
          ]
        }, 
        'quotesFAVG': {
          '$divide': [
            '$quotesAVG', '$followersArray.followers'
          ]
        }
      }
    }, {
      '$sort': {
        'likesAVG': -1
      }
    }
  ];