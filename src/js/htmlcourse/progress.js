// src/js/htmlcourse/progress.js

import { getTotalTopics } from './courseData.js';

class Progress {
    constructor() {
        this.progressBar = document.getElementById('courseProgress');
        this.progressText = document.querySelector('.progress-text');
        this.totalTopics = getTotalTopics();
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.updateUI();
    }

    loadProgress() {
        // Load completed topics from localStorage
        this.completedTopics = new Set(
            JSON.parse(localStorage.getItem('completedTopics')) || []
        );
    }

    saveProgress() {
        localStorage.setItem('completedTopics', 
            JSON.stringify([...this.completedTopics])
        );
    }

    markTopicComplete(topicId) {
        this.completedTopics.add(topicId);
        this.saveProgress();
        this.updateUI();
        this.updateTopicUI(topicId);
    }

    markTopicIncomplete(topicId) {
        this.completedTopics.delete(topicId);
        this.saveProgress();
        this.updateUI();
        this.updateTopicUI(topicId);
    }

    isTopicComplete(topicId) {
        return this.completedTopics.has(topicId);
    }

    updateUI() {
        const percentage = (this.completedTopics.size / this.totalTopics) * 100;
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${Math.round(percentage)}% Complete`;
    }

    updateTopicUI(topicId) {
        const topicElement = document.querySelector(`[data-topic="${topicId}"]`);
        if (topicElement) {
            if (this.isTopicComplete(topicId)) {
                topicElement.classList.add('completed');
            } else {
                topicElement.classList.remove('completed');
            }
        }
    }

    // Update all topic indicators
    refreshTopicIndicators() {
        document.querySelectorAll('.topic-item').forEach(topic => {
            const topicId = topic.dataset.topic;
            this.updateTopicUI(topicId);
        });
    }
}

const progress = new Progress();
export default progress;