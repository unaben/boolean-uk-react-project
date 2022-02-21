
export default function buildTableArray(teams, results){
  let tableArray = []
  for (const team of teams) {
    team.gamesPlayed = 0
    team.gamesWon = 0
    team.gamesDrew = 0
    team.gamesLost = 0
    team.goalsFor = 0
    team.goalsAgainst = 0
    team.goalDifference = 0
    team.points = 0
    for (const result of results){
      if (team.id === result.homeTeam){
        team.gamesPlayed += 1
        if (result.homeTeamScore > result.awayTeamScore) {
          team.gamesWon += 1
          team.points += 3
        }
        if (result.homeTeamScore === result.awayTeamScore) {
          team.gamesDrew += 1
          team.points += 1
        }
        if (result.homeTeamScore < result.awayTeamScore) team.gamesLost += 1
        team.goalsFor += result.homeTeamScore
        team.goalsAgainst += result.awayTeamScore  
      }
      if (team.id === result.awayTeam){
        team.gamesPlayed += 1
        if (result.homeTeamScore < result.awayTeamScore) {
          team.gamesWon += 1
          team.points += 3
        }
        if (result.homeTeamScore === result.awayTeamScore) {
          team.gamesDrew += 1
          team.points += 1
        }
        if (result.homeTeamScore > result.awayTeamScore) team.gamesLost += 1
        team.goalsFor += result.awayTeamScore
        team.goalsAgainst += result.homeTeamScore          
      }
    }
    team.goalDifference = team.goalsFor - team.goalsAgainst
    tableArray = [...tableArray, team]
  }

  // SORT DATA IN POINTS ORDER
  let tableDataArray=[]
  for (let points = 3 * teams.length; points >= 0; points--)
    for (const team of tableArray) 
      if (team.points === points) tableDataArray = [...tableDataArray, team]  
      
  // IF POINTS ARE EQUAL THEN SEPARATE BY GOAL DIFFERENCE
  let keepSorting = true
  let positionSwapped = false
  let temporaryDataArray = []
  while (keepSorting){
    positionSwapped = false
    temporaryDataArray = []
    for (let i = 0; i < tableDataArray.length-1; i+=2)
      if (tableDataArray[i].points === tableDataArray[i+1].points && tableDataArray[i].goalDifference < tableDataArray[i+1].goalDifference){
        positionSwapped = true
        temporaryDataArray = [...temporaryDataArray, tableDataArray[i+1].points, tableDataArray[i]]
      }
      else
        temporaryDataArray = [...temporaryDataArray, tableDataArray[i].points, tableDataArray[i+1]]
    if (positionSwapped) keepSorting = false

  }

  tableDataArray = [...temporaryDataArray]
    
  return tableDataArray
}


