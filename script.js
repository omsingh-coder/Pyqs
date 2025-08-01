// File: script.js
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');
const year = urlParams.get('year');

const file = `physics-2004-to-2008.json`;

fetch(file)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('question-container');
    data.forEach((q, index) => {
      const div = document.createElement('div');
      div.style.background = '#fff';
      div.style.padding = '20px';
      div.style.margin = '20px auto';
      div.style.borderRadius = '10px';
      div.style.width = '80%';
      div.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';

      div.innerHTML = `
        <h3>Q${index + 1}. ${q.question}</h3>
        <ul style="list-style: none; padding: 0;">
          ${Object.entries(q.options).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
        </ul>
        <p><strong>✅ Correct Answer:</strong> ${q.correct}</p>
        <p>📅 <strong>Date:</strong> ${q.date}</p>
        <p>📘 <strong>Year:</strong> ${q.year} | 📖 <strong>Chapter:</strong> ${q.chapter}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch((err) => {
    document.getElementById('question-container').innerText = "❌ Questions not found.";
    console.error(err);
  });
