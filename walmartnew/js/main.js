
document.addEventListener("DOMContentLoaded", function () {
  const timerElement = document.getElementById("timer");
  let time = 600;
  const interval = setInterval(() => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timerElement.textContent = \`\${min.toString().padStart(2, '0')}:\${sec.toString().padStart(2, '0')}\`;
    if (time <= 0) clearInterval(interval);
    time--;
  }, 1000);

  const steps = document.querySelectorAll(".question-step");
  const progressBar = document.getElementById("progressBar");
  const thankYou = document.querySelector(".thankyou");
  const claimButton = document.getElementById("claimButton");
  let current = 0;

  function updateProgress() {
    const percent = ((current + 1) / steps.length) * 100;
    progressBar.style.width = percent + "%";
  }

  steps.forEach((step, idx) => {
    const options = step.querySelectorAll(".option");
    options.forEach(btn => {
      btn.addEventListener("click", () => {
        step.style.display = "none";
        current++;
        updateProgress();
        if (steps[current]) {
          steps[current].style.display = "block";
        } else {
          thankYou.style.display = "block";
        }
      });
    });
  });

  claimButton.addEventListener("click", () => {
    window.location.href = "https://www.1timetowin.xyz/click";
  });

  const regions = ["Texas", "California", "Florida", "New York", "Nevada"];
  const times = ["2 hours ago", "1 hour ago", "45 minutes ago", "just now", "3 hours ago"];
  const ips = ["192.168.1.101", "172.16.0.23", "10.0.0.55", "192.168.0.88", "172.20.14.22"];
  const comments = document.querySelectorAll(".comment");
  const totalComments = comments.length;

  comments.forEach((c, i) => {
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = \`📍 \${regions[i % regions.length]} · \${ips[i % ips.length]} · \${times[i % times.length]}\`;
    c.querySelector("div").insertBefore(meta, c.querySelector("div").children[1]);

    const uploadBtn = document.createElement("button");
    uploadBtn.textContent = "Add Photo";
    uploadBtn.className = "upload-button";
    uploadBtn.addEventListener("click", () => {
      const img = document.createElement("img");
      img.src = "https://source.unsplash.com/200x150/?shopping,store&sig=" + Math.random();
      img.className = "comment-photo";
      c.querySelector("div").appendChild(img);
      uploadBtn.remove();
    });
    c.querySelector("div").appendChild(uploadBtn);
  });

  document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", () => {
      const span = button.querySelector("span");
      const count = parseInt(span.textContent);
      span.textContent = count + 1;
    });
  });

  // Auto scroll comment loop
  setInterval(() => {
    const list = document.getElementById("commentList");
    const first = list.firstElementChild;
    first.style.marginTop = "-100px";
    setTimeout(() => {
      list.appendChild(first);
      first.style.marginTop = "0";
    }, 300);
  }, 4000);

  // View More Logic
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  let shown = 2;
  const countText = document.getElementById("commentCountText");

  function updateCountText() {
    countText.textContent = \`Showing \${shown} of \${totalComments} comments\`;
  }

  updateCountText();

  viewMoreBtn.addEventListener("click", () => {
    const hidden = document.querySelectorAll(".comment.hidden");
    for (let i = 0; i < 2 && i < hidden.length; i++) {
      hidden[i].classList.remove("hidden");
      shown++;
    }
    updateCountText();
    if (shown >= totalComments) {
      viewMoreBtn.style.display = "none";
    }
  });

  // Loading animation
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.querySelector(".container").style.display = "block";
  }, 2500);
});
