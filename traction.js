var axios = require('axios')
var fs = require('fs')

const fetchAllEvents = (repo, totalStars) => {
  const MAX_PER_PAGE = 100
  const baseUrl =
    'https://api.github.com/repos/goblin-ogm/' + repo + '/stargazers?per_page=' + MAX_PER_PAGE

  //Start fetching every page of repos.
  const fetchPromises = [],
    pageCount = Math.ceil(totalStars / MAX_PER_PAGE)
  for (let pageI = 1; pageI <= pageCount; ++pageI) {
    const fetchPagePromise = axios.get(baseUrl + '&page=' + pageI, {
      headers: { Accept: 'application/vnd.github.v3.star+json' },
    })
    fetchPromises.push(fetchPagePromise)
  }

  //This promise resolves after all the fetching is done.
  return Promise.all(fetchPromises)
    .then(responses => {
      //Parse all the responses to JSON.
      return Promise.all(responses.map(response => response.data))
    })
    .then(results => {
      //Copy the results into one big array that has all the friggin repos.
      let repos = []
      results.forEach(result => {
        repos = repos.concat(result)
      })
      return repos
    })
}

const formatResults = (repo, githubResponse) => {
  return githubResponse.map(x => ({
    repo,
    starred_at: x.starred_at,
    user: { login: x.user.login, id: x.user.id, avatar_url: x.user.avatar_url, url: x.user.url },
  }))
}

const main = async () => {
  const goblin_buildchain = await fetchAllEvents('goblin-buildchain', 100)
  const aiogremlin = await fetchAllEvents('aiogremlin', 400)
  const goblin = await fetchAllEvents('goblin', 100)

  const history = []
    .concat(formatResults('@goblin-ogm/goblin-buildchain', goblin_buildchain))
    .concat(formatResults('@goblin-ogm/aiogremlin', aiogremlin))
    .concat(formatResults('@goblin-ogm/goblin', goblin))

  const groups = history.reduce((groups, event) => {
    const date = event.starred_at.split('T')[0]
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(event)
    return groups
  }, {})

  var tally = {
    '@goblin-ogm/goblin': 0,
    '@goblin-ogm/aiogremlin': 0,
    '@goblin-ogm/goblin-buildchain': 0,
  }
  const data = Object.keys(groups)
    .sort((a, b) => a.localeCompare(b))
    .map(date => {
      let goblin = groups[date].filter(x => x.repo === '@goblin-ogm/goblin').length
      let aiogremlin = groups[date].filter(x => x.repo === '@goblin-ogm/aiogremlin').length
      let goblin_buildchain = groups[date].filter(x => x.repo === '@goblin-ogm/goblin-buildchain').length
      tally['@goblin-ogm/goblin'] += goblin
      tally['@goblin-ogm/aiogremlin'] += aiogremlin
      tally['@goblin-ogm/goblin-buildchain'] += goblin_buildchain
      return {
        name: date,
        '@goblin-ogm/goblin': tally['@goblin-ogm/goblin'],
        '@goblin-ogm/aiogremlin': tally['@goblin-ogm/aiogremlin'],
        '@goblin-ogm/goblin-buildchain': tally['@goblin-ogm/goblin-buildchain'],
      }
    })

  fs.writeFile('./src/data/stars/stargazers.json', JSON.stringify(data, null, 2), 'utf8', function(
    err
  ) {
    if (err) throw err
    console.log('Saved.')
  })
}
main()
