// src/js/htmlcourse/sidebar.js

import { courseData } from './courseData.js';

class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('courseSidebar');
        this.toggleBtn = document.getElementById('toggleSidebar');
        this.resizeHandle = document.getElementById('resizeHandle');
        this.chapterList = document.getElementById('chapterList');
        this.minWidth = 200;
        this.maxWidth = 500;

        this.init();
    }

    init() {
        this.renderChapters();
        this.setupEventListeners();
        this.loadSavedWidth();
    }

    renderChapters() {
        this.chapterList.innerHTML = courseData.chapters.map(chapter => `
            <li class="chapter-item">
                <div class="chapter-header flex-row flex-between align" data-chapter="${chapter.id}">
                    <span>${chapter.title}</span>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
                <ul class="topic-list" id="chapter-${chapter.id}-topics">
                    ${chapter.topics.map(topic => `
                        <li class="topic-item" data-topic="${topic.id}">
                            <ion-icon name="checkmark-circle-outline" class="completion-icon"></ion-icon>
                            <span>${topic.title}</span>
                        </li>
                    `).join('')}
                </ul>
            </li>
        `).join('');
    }

    setupEventListeners() {
        // Toggle sidebar on mobile
        this.toggleBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('show');
        });

        // Chapter expand/collapse
        this.chapterList.addEventListener('click', (e) => {
            const chapterHeader = e.target.closest('.chapter-header');
            if (chapterHeader) {
                const topicList = chapterHeader.nextElementSibling;
                chapterHeader.classList.toggle('active');
                topicList.classList.toggle('show');
            }
        });

        // Resize functionality
        let isResizing = false;
        let startX;
        let startWidth;

        this.resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = parseInt(getComputedStyle(this.sidebar).width, 10);
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', () => {
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
                this.saveSidebarWidth();
            });
        });

        const handleMouseMove = (e) => {
            if (!isResizing) return;
            
            const width = startWidth + (e.clientX - startX);
            if (width >= this.minWidth && width <= this.maxWidth) {
                this.sidebar.style.width = `${width}px`;
            }
        };
    }

    loadSavedWidth() {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            this.sidebar.style.width = savedWidth;
        }
    }

    saveSidebarWidth() {
        localStorage.setItem('sidebarWidth', this.sidebar.style.width);
    }

    setActiveTopic(topicId) {
        // Remove active class from all topics
        const topics = this.chapterList.querySelectorAll('.topic-item');
        topics.forEach(topic => topic.classList.remove('active'));

        // Add active class to current topic
        const currentTopic = this.chapterList.querySelector(`[data-topic="${topicId}"]`);
        if (currentTopic) {
            currentTopic.classList.add('active');
            // Expand parent chapter if collapsed
            const parentChapter = currentTopic.closest('.chapter-item');
            const chapterHeader = parentChapter.querySelector('.chapter-header');
            const topicList = parentChapter.querySelector('.topic-list');
            chapterHeader.classList.add('active');
            topicList.classList.add('show');
        }
    }
}

// Initialize sidebar
const sidebar = new Sidebar();
export default sidebar;