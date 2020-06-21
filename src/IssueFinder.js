import { Octokit } from '@octokit/rest'

const octokit = new Octokit();

function findIssues(state, callback) {
  let base_parms = [
    "repo:kubernetes/kubernetes",
    "is:issue",
    "is:open",
    "no:assignee"
  ]

  const q = base_parms.join(" ") + " " + state.authors.map(a => "author:"+a).join(" ")

  octokit.search
    .issuesAndPullRequests({ q })
    .then(({ data }) => {
      console.log(data)
      let issues = data.items.map((item) => ({ 
        number: item.number,
        title: item.title,
        author: item.user.login,
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
