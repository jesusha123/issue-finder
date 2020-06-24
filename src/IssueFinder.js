import { Octokit } from '@octokit/rest'

const octokit = new Octokit();

function findIssues(state, callback) {
  let base_parms = [
    "repo:kubernetes/kubernetes",
    "is:issue",
    "is:open",
    "no:assignee"
  ]

  if(state.helpWantedLabel) {
    base_parms.push("label:\"help wanted\"")
  }

  let authors = state.authors.split(",").filter(a => a.length>0);
  const q = base_parms.join(" ") + " " + authors.map(a => "author:"+a).join(" ")
  const per_page = 100
  console.log(q)

  octokit.search
    .issuesAndPullRequests({ q, per_page })
    .then(({ data }) => {
      console.log(data)
      let issues = data.items.map((item) => ({ 
        number: item.number,
        title: item.title,
        author: item.user.login,
        comments: item.comments,
        labels: item.labels.map(l => ({ 
          id: l.id, 
          name: l.name,
          color: l.color
        })),
        date: item.created_at,
        link: "https://github.com/kubernetes/kubernetes/issues/"+item.number,
      }))

      callback(issues)
    });
}

export default findIssues
