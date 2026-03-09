console.log("Script.js Is Working...");

const issuesContainer = document.getElementById("issues-container");
const loadingSpinner = document.getElementById("spinner");
const noOfIssues = document.getElementById("no-of-issues");

// Fetches User Input.
const getValueFromInputField = (id) => {
  const inputValue = document.getElementById(id).value;

  return inputValue;
};

// Fetches all the Issues from API.
const loadIssues = async () => {
  showLoadingSpinner(true);
  issuesContainer.innerHTML = "";

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const issueData = await res.json();

  showLoadingSpinner(false);

  displayIssues(issueData.data);
};

// Displays a given Array of Issues.
const displayIssues = async (issues) => {
  //   console.log(issues)
  updateNoOfIssues(issues.length);

  for (const issue of issues) {
    const labelDom = await fetchLabels(issue.id);
    const issueCard = document.createElement("div");
    issueCard.className = `rounded-md bg-base-100 shadow-md border-t-4 ${issue.status === "open" ? "border-green-500" : "border-purple-500"}  flex flex-col`;
    issueCard.innerHTML = `<!-- Card Top Part-->
            <div class="p-5 border-b-1 border-gray-300 space-y-4 flex-1">
              <!-- Status and Priority -->
              <div class="flex justify-between">
                <a href="">
                  <img
                    src="./assets/${issue.status === "open" ? "Open-Status" : "Closed- Status"}.png"
                    
                    class="status-icon"
                    alt="${issue.status === "open" ? "Open" : "Closed"} Status Icon"
                  />
                </a>

                <div
                  class="priority-badge badge badge-soft ${issue.priority === "high" ? "badge-error" : issue.priority === "medium" ? "badge-warning" : "badge-neutral"} px-5 rounded-xl font-medium capitalize"
                >
                  ${issue.priority}
                </div>
              </div>

              <!-- Title and Description -->
              <div class="space-y-1">
                <h2 class="issue-title font-semibold">
                  ${issue.title}
                </h2>
                <p class="issue-description text-xs line-clamp-2">
                  ${issue.description}
                </p>
              </div>

              <!-- Topic -->
              <div class="issue-topics flex flex-wrap gap-1">
                ${labelDom}
              </div>
            </div>

            <!-- Card Bottom Part -->
            <div class="p-5 text-sm text-gray-500 space-y-1 h-fit">
              <p class="issue-author">by ${issue.author}</p>
              <p class="issue-date">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>`;

    issuesContainer.appendChild(issueCard);
  }
};

// Returns DOM Text all Labels of a given Issue.
const fetchLabels = async (issueId) => {
  let domText = ``;
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const issueData = await res.json();
  const labels = issueData.data.labels;

  labels.forEach((label) => {
    domText += `<div
                  class="badge badge-soft ${label === "bug" ? "badge-error" : label === "help wanted" ? "badge-warning" : label === "documentation" ? "badge-info" : label === "good first issue" ? "badge-primary" : "badge-success"} px-5 rounded-xl font-medium
                  ${label === "bug" ? "border-red-500" : label === "help wanted" ? "border-yellow-500" : label === "documentation" ? "border-blue-500 " : label === "good first issue" ? "border-purple-500" : "border-green-500"} capitalize"
                >
                  ${label}
                </div> `;
  });

  //   console.log(domText);
  return domText;
};

// Shows Loading Spinner.
const showLoadingSpinner = (isLoading) => {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
    issuesContainer.classList.add("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
    issuesContainer.classList.remove("hidden");
  }
};

// Updates the Number of Issues.
const updateNoOfIssues = (amount) => {
  noOfIssues.innerHTML = `${amount} Issues`;
};

// Loads Issues Based on its Status.
const selectStatus = async (status, btnId) => {
  //   console.log(`${status} status selected`);
  highlightBtn(btnId);
  issuesContainer.innerHTML = "";

  showLoadingSpinner(true);

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const issueData = await res.json();
  const issues = issueData.data;

  showLoadingSpinner(false);

  const filteredIssues = issues.filter((issue) => issue.status === status);

  displayIssues(filteredIssues);
};

// Highlights Selected Button.
const highlightBtn = (id) => {
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const selectedBtn = document.getElementById(id);

  toggleBtns.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
  });

  selectedBtn.classList.add("bg-[#4A00FF]", "text-white");
};

loadIssues();
