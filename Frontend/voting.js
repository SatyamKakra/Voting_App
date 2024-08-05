function submitVote() {
    const candidates = document.getElementsByName('vote');
    let selectedCandidate = null;

    for (const candidate of candidates) {
        if (candidate.checked) {
            selectedCandidate = candidate.value;
            break;
        }
    }

    if (selectedCandidate) {
        document.getElementById('confirmation').innerText = `You have voted for ${selectedCandidate}.`;
    } else {
        document.getElementById('confirmation').innerText = 'Please select a candidate to vote.';
    }
}
