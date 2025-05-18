function startTypewriter() {
  const phrases = [
    "Nadeem Zawaideh | Portfolio",
    "Computer Science Student @ Dal",
    "Web Developer · Software Builder",
    "I make cool things that work"
  ];

  let i = 0;
  let j = 0;
  let currentPhrase = [];
  let isDeleting = false;
  let isEnd = false;
  const element = document.getElementById("typewriter");

  function loop() {
    element.innerHTML = currentPhrase.join("");

    if (i < phrases.length) {
      if (!isDeleting && j <= phrases[i].length) {
        currentPhrase.push(phrases[i][j]);
        j++;
      }

      if (isDeleting && j <= phrases[i].length) {
        currentPhrase.pop();
        j--;
      }

      if (j === phrases[i].length) {
        isEnd = true;
        isDeleting = true;
      }

      if (isDeleting && j === 0) {
        currentPhrase = [];
        isDeleting = false;
        i++;
        if (i === phrases.length) {
          i = 0;
        }
      }
    }

    const typingSpeed = isEnd ? 1500 : isDeleting ? 50 : 100;
    isEnd = false;

    setTimeout(loop, typingSpeed);
  }

  loop();
}

function getRadarColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    textColor: isDark ? '#ccc' : '#222',
    gridColor: isDark ? '#444' : '#ddd',
    borderColor: '#007bff',
    backgroundColor: 'rgba(0,123,255,0.2)'
  };
}

function renderRadarChart() {
  const colors = getRadarColors();
  const ctx = document.getElementById('skillsChart').getContext('2d');

  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'PHP', 'MySQL'],
      datasets: [{
        label: 'Skill Level',
        data: [90, 85, 88, 90, 92, 86],
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor
      }]
    },
    options: {
      scales: {
        r: {
          min: 50,
          max: 100,
          ticks: {
            color: colors.textColor,
            stepSize: 10
          },
          grid: {
            color: colors.gridColor
          },
          angleLines: {
            color: colors.gridColor
          },
          pointLabels: {
            color: colors.textColor
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colors.textColor
          }
        }
      }
    }
  });
}

let radarChart = renderRadarChart();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);

  radarChart.destroy();  
  radarChart = renderRadarChart(); 
}

startTypewriter();