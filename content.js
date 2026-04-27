function getJobDetails() {
  // Company name - multiple selectors 
  const companySelectors = [
    'a.comp-name',
    '.comp-name',
    '[class*="comp-name"]',
    '.jd-header-comp-name',
    'a[href*="company"]',
    '.company-name',
    'span.ni-job-tuple-icon-srp-comp-name',
    '.orgName',
    '[data-ga-track*="Company"]'
  ];
  
  let company = 'N/A';
  for (let sel of companySelectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim()) {
      company = el.innerText.trim();
      break;
    }
  }

  // Job title
  const titleSelectors = [
    'h1.jd-header-title',
    '.jd-header-title',
    'h1[class*="title"]',
    '.job-title',
    'h1'
  ];
  
  let title = 'N/A';
  for (let sel of titleSelectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim()) {
      title = el.innerText.trim();
      break;
    }
  }

  // Posted date
  const dateSelectors = [
    '.job-post-day',
    '[class*="posted"]',
    '[class*="post-day"]',
    'span[class*="date"]',
    '.posted-date'
  ];
  
  let postedDate = 'N/A';
  for (let sel of dateSelectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim()) {
      postedDate = el.innerText.trim();
      break;
    }
  }

  // Keyword from URL
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('k') || urlParams.get('keyword') || 
                  document.title.split(' ')[0] || 'Unknown';

  return { title, company, postedDate, keyword };
}

function watchApplyButton() {
  const applySelectors = [
    'button[class*="apply"]',
    '.apply-button',
    '#apply-button',
    'button[id*="apply"]',
    'a[class*="apply"]'
  ];

  for (let sel of applySelectors) {
    const btn = document.querySelector(sel);
    if (btn) {
      btn.addEventListener('click', () => {
        const job = getJobDetails();
        job.appliedAt = new Date().toLocaleString();
        job.url = window.location.href;
        chrome.runtime.sendMessage({ type: "JOB_APPLIED", job });
      });
      break;
    }
  }
}

// Observer - dynamic content load  run 
const observer = new MutationObserver(() => {
  watchApplyButton();
});

observer.observe(document.body, { childList: true, subtree: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', watchApplyButton);
} else {
  watchApplyButton();
}
