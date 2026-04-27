// Naukri job page to extract details
function getJobDetails() {
  const titleEl = document.querySelector('.jd-header-title, h1.title, .job-title');
  const companyEl = document.querySelector('.jd-header-comp-name, .comp-name, a.comp-name');
  const dateEl = document.querySelector('.job-post-day, .posted-date, span[class*="posted"]');

  const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
  const company = companyEl ? companyEl.innerText.trim() : 'Unknown';
  const postedDate = dateEl ? dateEl.innerText.trim() : 'Unknown';

  return { title, company, postedDate };
}

// Apply button click 
function watchApplyButton() {
  const applyBtn = document.querySelector('.apply-button, button[class*="apply"], #apply-button');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const job = getJobDetails();
      job.keyword = new URLSearchParams(window.location.search).get('k') || 'Unknown';
      job.appliedAt = new Date().toLocaleString();
      job.url = window.location.href;

      chrome.runtime.sendMessage({ type: "JOB_APPLIED", job });
    });
  }
}

// Page load 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', watchApplyButton);
} else {
  watchApplyButton();
}
