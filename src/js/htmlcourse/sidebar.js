// src/js/htmlcourse/sidebar.js

import { courseData } from "./courseData.js";

class Sidebar {
  constructor() {
    this.sidebar = document.getElementById("courseSidebar");
    this.toggleBtn = document.getElementById("toggleSidebar");
    this.resizeHandle = document.getElementById("resizeHandle");
    this.chapterList = document.getElementById("chapterList");
    this.minWidth = 200;
    this.maxWidth = 500;

    this.init();
  }

  init() {
    this.populateChapters();
    this.setupEventListeners();
    this.loadSavedWidth();
  }

  populateChapters() {
    if (!this.chapterList) {
      console.error("Chapter list element not found.");
      return;
    }

    this.chapterList.innerHTML = courseData.chapters
      .map(
        (chapter) => `
        <li class="chapter-item">
          <div class="chapter-header">
            ${chapter.title}
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          <ul class="topic-list">
            ${chapter.topics
              .map(
                (topic) => `
              <li class="topic-item" data-topic="${topic.id}">
                ${topic.title}
              </li>
            `
              )
              .join("")}
          </ul>
        </li>
      `
      )
      .join("");

    this.setupToggleListeners();
  }

  setupToggleListeners() {
    // Handle chapter header clicks to expand/collapse
    const chapterHeaders = document.querySelectorAll(".chapter-header");
    chapterHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const topicList = header.nextElementSibling;
        header.classList.toggle("active");
        topicList.classList.toggle("show");
      });
    });

    // Direct topic click handler - load the topic content
    const topicItems = document.querySelectorAll(".topic-item");
    topicItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const topicId = item.dataset.topic;
        if (topicId) {
          console.log("Topic clicked:", topicId);
          // Directly call navigation's loadTopic method
          const navigation = window.navigation || window.parent.navigation;
          if (navigation && navigation.loadTopic) {
            navigation.loadTopic(topicId);
          }
        }
      });
    });
  }

  // Remove duplicate event listener setup in setupEventListeners
  setupEventListeners() {
    // Toggle sidebar on mobile
    this.toggleBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("show");
    });

    // No chapter expand/collapse handlers here, as they're in setupToggleListeners

    // Resize functionality
    let isResizing = false;
    let startX;
    let startWidth;

    if (this.resizeHandle) {
      this.resizeHandle.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(getComputedStyle(this.sidebar).width, 10);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", () => {
          isResizing = false;
          document.removeEventListener("mousemove", handleMouseMove);
          this.saveSidebarWidth();
        });
      });
    }

    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const width = startWidth + (e.clientX - startX);
      if (width >= this.minWidth && width <= this.maxWidth) {
        this.sidebar.style.width = `${width}px`;
      }
    };

    // Listen for topic selection events
    document.addEventListener("topicSelected", (e) => {
      const topicId = e.detail.topicId;
      const navigation = window.navigation;
      if (navigation && navigation.loadTopic) {
        navigation.loadTopic(topicId);
      }
    });
  }

  loadSavedWidth() {
    const savedWidth = localStorage.getItem("sidebarWidth");
    if (savedWidth) {
      this.sidebar.style.width = savedWidth;
    }
  }

  saveSidebarWidth() {
    localStorage.setItem("sidebarWidth", this.sidebar.style.width);
  }

  setActiveTopic(topicId) {
    // Remove active class from all topics
    const topics = this.chapterList.querySelectorAll(".topic-item");
    topics.forEach((topic) => topic.classList.remove("active"));

    // Add active class to current topic
    const currentTopic = this.chapterList.querySelector(
      `[data-topic="${topicId}"]`
    );
    if (currentTopic) {
      currentTopic.classList.add("active");
      // Expand parent chapter if collapsed
      const parentChapter = currentTopic.closest(".chapter-item");
      const chapterHeader = parentChapter.querySelector(".chapter-header");
      const topicList = parentChapter.querySelector(".topic-list");
      chapterHeader.classList.add("active");
      topicList.classList.add("show");
    }
  }
}

// Initialize sidebar
const sidebar = new Sidebar();
export default sidebar;
