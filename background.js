chrome.runtime.onInstalled.addListener(() => {
  console.log("Naukri Auto Apply Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "JOB_APPLIED") {
    chrome.storage.local.get(["appliedJobs"], (result) => {
      const jobs = result.appliedJobs || [];
      jobs.push(message.job);
      chrome.storage.local.set({ appliedJobs: jobs });
    });
  }
});
