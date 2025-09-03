function startCountdown(duration) {
  const countdownEl = document.getElementById('countdown');
  let timer = duration;

  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    countdownEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timer--;

    if (timer < 0) {
      clearInterval(interval);
      countdownEl.textContent = "Time Expired";
    }
  }, 1000);
}
