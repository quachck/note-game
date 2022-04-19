const finalScore = document.getElementById("finalScore");
const mostRecentScore = window.localStorage.getItem("mostRecentScore");
const totalPoints = window.localStorage.getItem("totalPoints");
finalScore.innerText = `Your Score: ${mostRecentScore} out of ${totalPoints}`;

