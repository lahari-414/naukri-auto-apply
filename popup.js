document.getElementById('reportBtn').addEventListener('click', () => {
  const div = document.getElementById('reportDiv');
  div.style.display = div.style.display === 'none' ? 'block' : 'none';

  chrome.storage.local.get(['appliedJobs'], (result) => {
    const jobs = result.appliedJobs || [];
    document.getElementById('total').textContent = jobs.length;
    const tbody = document.getElementById('jobList');
    tbody.innerHTML = '';
    jobs.forEach((job, i) => {
      tbody.innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${job.company}</td>
        <td>${job.title}</td>
        <td>${job.keyword}</td>
        <td>${job.postedDate}</td>
      </tr>`;
    });
  });
});

document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.storage.local.set({ appliedJobs: [] });
  document.getElementById('total').textContent = '0';
  document.getElementById('jobList').innerHTML = '';
});

document.getElementById('startBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});

chrome.storage.local.get(['appliedJobs'], (result) => {
  const jobs = result.appliedJobs || [];
  document.getElementById('total').textContent = jobs.length;
});
