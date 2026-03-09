console.log("Script.js Is Working...");

const issuesContainer = document.getElementById("issues-container");
const loadingSpinner = document.getElementById("spinner");
const noOfIssues = document.getElementById("no-of-issues");
const issueModal = document.getElementById("issue_modal");
const modalContent = document.getElementById("modal-content");
const searchBar = document.getElementById("search-bar");
const addIssueBtn = document.getElementById("add-issue-btn");

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

  if (issues.length === 0) {
    issuesContainer.innerHTML = `<p>No Matching Issues Were Found</p>`;
    return;
  }

  for (const issue of issues) {
    const labelDom = await fetchLabels(issue.id);
    const issueCard = document.createElement("div");
    issueCard.id = `issue-${issue.id}`;
    issueCard.className = `issue-card rounded-md bg-base-100 shadow-md border-t-4 ${issue.status === "open" ? "border-green-500" : "border-purple-500"}  flex flex-col cursor-pointer`;
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
  const selectedBtn = document.getElementById(id);

  removeBtnHighlight();

  selectedBtn.classList.add("bg-[#4A00FF]", "text-white");
};

// Removes Highlight from all Toggle Buttons.
const removeBtnHighlight = () => {
  const toggleBtns = document.querySelectorAll(".toggle-btn");

  toggleBtns.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
  });
};

// Displays Issue Modal for a given Issue.
const showIssueModal = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const json = await res.json();
  const issueData = json.data;
  //   console.log(issueData);

  const issueLabelsHtml = await fetchLabels(id);

  modalContent.innerHTML = `<h3 id="model-title" class="text-2xl font-bold">
              ${issueData.title}
            </h3>

            <div class="flex gap-6">
              <!-- Status Badge -->
              <div
                id="modal-status"
                class="priority-badge badge ${issueData.status === "open" ? "badge-success" : "badge-primary"} px-5 rounded-xl font-medium text-white capitalize"
              >
                ${issueData.status === "open" ? "Open" : "Closed"}
              </div>

              <ul
                class="flex items-center gap-6 list-disc text-xs text-gray-500"
              >
                <li>
                  <p id="modal-author" class="issue-author">
                    Opened by ${issueData.author}
                  </p>
                </li>
                <li><p id="modal-date" class="issue-date">${new Date(issueData.createdAt).toLocaleDateString("en-US")}</p></li>
              </ul>
            </div>

            <!-- Topic Badges -->
            <div id="modal-badges" class="issue-topics flex flex-wrap gap-2">
              ${issueLabelsHtml}
            </div>

            <p
              id="model-description"
              class="issue-description text-base text-gray-500"
            >
              ${issueData.description}
            </p>

            <div
              class="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-md"
            >
              <!-- Assignee -->
              <div class="flex flex-col">
                <p class="issue-description text-sm text-gray-500">Assignee:</p>

                <p
                  id="modal-assignee"
                  class="issue-description text-base font-semibold"
                >
                  ${issueData.assignee === "" ? "Not yet assigned" : issueData.assignee}
                </p>
              </div>

              <!-- Priority -->
              <div class="flex flex-col  pr-8 md:pr-40">
                <p class="issue-description text-sm text-gray-500">Priority:</p>

                <div
                  id="modal-priority"
                  class="priority-badge badge ${issueData.priority === "high" ? "badge-error" : issueData.priority === "medium" ? "badge-warning" : "badge-neutral"} text-white  px-5 rounded-xl capitalize"
                >
                  ${issueData.priority}
                </div>
              </div>
            </div>

            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
              </form>
            </div>`;

  issueModal.showModal();
};

// Manages Custom Issue Searches by the User.
const searchIssue = async (userInput) => {
  console.log(`User Input: ${userInput}`);
  removeBtnHighlight();

  showLoadingSpinner(true);

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${userInput}`,
  );
  const json = await res.json();

  issuesContainer.innerHTML = "";
  showLoadingSpinner(false);
  displayIssues(json.data);
};

// Handles Click and View for each Issue Card.
issuesContainer.addEventListener("click", (event) => {
  if (event.target.closest(".issue-card")) {
    const targetCard = event.target.closest(".issue-card");
    const targetId = targetCard.id;
    const issueId = targetId.split("-")[1];
    // console.log(`Selected issue card id is: ${issueId}`);
    showIssueModal(issueId);
  }
});

// Handles User Input from the Search Bar.
const handleSearch = () => {
  const userInput = searchBar.value.trim();

  if (!userInput) {
    alert("Invalid Input.");
    searchBar.value = "";
    return;
  }

  searchIssue(userInput);
};

// Handles Search Bar User Inputs.
searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // console.log(`User Input: ${searchBar.value}`);
    handleSearch();
  }
});

// NOTE: There is no Search Button given the figma design blueprint. I was advised by one of the instructors on the Help Desk to use the +New Issue button as a Search Button instead, for this project. This function does that job.
addIssueBtn.addEventListener("click", () => {
  handleSearch();
});

loadIssues();
