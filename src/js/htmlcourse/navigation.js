// src/js/htmlcourse/navigation.js

import { getTopicById, getAdjacentTopic } from './courseData.js';
import sidebar from './sidebar.js';
import codeEditor from './codeEditor.js';
import progress from './progress.js';

class Navigation {
    constructor() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.contentContainer = document.querySelector('.content-container');
        this.currentTopicId = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLastVisitedTopic();
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.navigateTopic('prev'));
        this.nextBtn.addEventListener('click', () => this.navigateTopic('next'));

        // Topic click navigation
        document.getElementById('chapterList').addEventListener('click', (e) => {
            const topicItem = e.target.closest('.topic-item');
            if (topicItem) {
                const topicId = topicItem.dataset.topic;
                this.loadTopic(topicId);
            }
        });
    }

    loadLastVisitedTopic() {
        const lastTopicId = localStorage.getItem('currentTopic') || '1.1';
        this.loadTopic(lastTopicId);
    }

    async loadTopic(topicId) {
        const topic = getTopicById(topicId);
        if (!topic) return;

        // Update content
        this.contentContainer.innerHTML = topic.content;

        // Update state
        this.currentTopicId = topicId;
        localStorage.setItem('currentTopic', topicId);

        // Update UI
        this.updateNavigationButtons();
        sidebar.setActiveTopic(topicId);
        codeEditor.initializeNewEditors();
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
        const prevTopic = getAdjacentTopic(this.currentTopicId, 'prev');
        const nextTopic = getAdjacentTopic(this.currentTopicId, 'next');

        this.prevBtn.disabled = !prevTopic;
        this.nextBtn.disabled = !nextTopic;

        this.prevBtn.style.visibility = prevTopic ? 'visible' : 'hidden';
        this.nextBtn.style.visibility = nextTopic ? 'visible' : 'hidden';
    }
}

const navigation = new Navigation();
export default navigation;