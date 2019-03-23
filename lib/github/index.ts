// npm install octokit
const query = `query { 
  viewer { 
    gist(name: "33354e7d63b99cb36b9040040df2fa86"){
      files(limit: 1){
        text
      }
    }
  }
}`

const headers = {
  headers: {
      authorization: `token 316f943108914966971d720eadaac1e94e19fc07`
    }
}

const loadGist = async ():Promise<string> => {
    const graphql = require('@octokit/graphql')
    const {viewer} = await graphql(query, headers);
    return viewer.gist.files[0].text;
}

export  { loadGist }