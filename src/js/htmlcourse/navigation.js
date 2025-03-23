// src/js/htmlcourse/navigation.js

import { getTopicById, getAdjacentTopic } from "./courseData.js";
import sidebar from "./sidebar.js";
import progress from "./progress.js";

class Navigation {
  constructor() {
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.contentContainer = document.querySelector(".content-container");
    this.currentTopicId = null;

    // Make navigation globally accessible for sidebar
    window.navigation = this;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadLastVisitedTopic(); // Ensure this loads content on initialization
  }

  setupEventListeners() {
    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.navigateTopic("prev"));
    this.nextBtn.addEventListener("click", () => this.navigateTopic("next"));

    // Listen for topic selection event
    document.addEventListener("topicSelected", (e) => {
      const topicId = e.detail.topicId;
      this.loadTopic(topicId);
    });

    // Topic click navigation
    document.getElementById("chapterList").addEventListener("click", (e) => {
      const topicItem = e.target.closest(".topic-item");
      if (topicItem) {
        const topicId = topicItem.dataset.topic;
        this.loadTopic(topicId);
      }
    });
  }

  loadLastVisitedTopic() {
    const lastTopicId = localStorage.getItem("currentTopic") || "1.1"; // Default to the first topic
    console.log("Loading last visited topic:", lastTopicId);
    this.loadTopic(lastTopicId); // Ensure content is loaded
  }

  async loadTopic(topicId) {
    console.log("Loading topic:", topicId);
    const topic = getTopicById(topicId);
    if (!topic) {
      console.error(`Topic with ID ${topicId} not found.`);
      this.contentContainer.innerHTML = `
        <div class="error-message">
          <h2>Content Not Found</h2>
          <p>The requested topic could not be loaded. Please try selecting another topic.</p>
        </div>
      `;
      return;
    }

    // Update content
    this.contentContainer.innerHTML = topic.content;

    // Update state
    this.currentTopicId = topicId;
    localStorage.setItem("currentTopic", topicId);

    // Update UI
    this.updateNavigationButtons();
    sidebar.setActiveTopic(topicId);
    progress.refreshTopicIndicators();

    // Scroll to top
    this.contentContainer.scrollTo(0, 0);
  }

  navigateTopic(direction) {
    if (!this.currentTopicId) return;

    const nextTopic = getAdjacentTopic(this.currentTopicId, direction);
    if (nextTopic) {
      this.loadTopic(nextTopic.id);
    }
  }

  updateNavigationButtons() {
    const prevTopic = getAdjacentTopic(this.currentTopicId, "prev");
    const nextTopic = getAdjacentTopic(this.currentTopicId, "next");

    this.prevBtn.disabled = !prevTopic;
    this.nextBtn.disabled = !nextTopic;

    this.prevBtn.style.visibility = prevTopic ? "visible" : "hidden";
    this.nextBtn.style.visibility = nextTopic ? "visible" : "hidden";
  }
}

const navigation = new Navigation();
export default navigation;
