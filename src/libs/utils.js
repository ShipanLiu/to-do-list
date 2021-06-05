/*
    all the tools JS will be saved here

*/

function timestamp() {
  const timestamp = new Date().toISOString().split('T')[0] + ' / ' + new Date().toISOString().split('T')[1].split('.')[0]
  return(timestamp)
}

export {
  timestamp
}
