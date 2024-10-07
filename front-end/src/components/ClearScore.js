const ClearScore = (navigate) => {
    // const totalScore = sessionStorage.getItem('score')
    sessionStorage.removeItem('score');
    navigate('/')
}

export default ClearScore;