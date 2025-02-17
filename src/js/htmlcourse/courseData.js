// src/js/htmlcourse/courseData.js

export const courseData = {
    title: "HTML & CSS Fundamentals",
    chapters: [
        {
            id: 1,
            title: "Introduction to HTML",
            topics: [
                {
                    id: "1.1",
                    title: "What is HTML?",
                    content: `
                        <h1>What is HTML?</h1>
                        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.</p>
                        
                        <div class="code-editor">
                            <div class="code-editor-header">
                                <button class="editor-btn" id="copyBtn-1.1">
                                    <ion-icon name="copy-outline"></ion-icon> Copy
                                </button>
                                <button class="editor-btn" id="resetBtn-1.1">
                                    <ion-icon name="refresh-outline"></ion-icon> Reset
                                </button>
                                <button class="editor-btn" id="runBtn-1.1">
                                    <ion-icon name="play-outline"></ion-icon> Run
                                </button>
                            </div>
                            <div class="code-editor-content" contenteditable="true" id="editor-1.1">
<!DOCTYPE html>
<html>
    <head>
        <title>My First HTML Page</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is my first HTML page.</p>
    </body>
</html>
                            </div>
                        </div>
                    `
                },
                {
                    id: "1.2",
                    title: "HTML Document Structure",
                    content: `
                        <h1>HTML Document Structure</h1>
                        <p>Every HTML document follows a basic structure with specific elements.</p>
                        
                        <div class="code-editor">
                            <div class="code-editor-header">
                                <button class="editor-btn" id="copyBtn-1.2">
                                    <ion-icon name="copy-outline"></ion-icon> Copy
                                </button>
                                <button class="editor-btn" id="resetBtn-1.2">
                                    <ion-icon name="refresh-outline"></ion-icon> Reset
                                </button>
                                <button class="editor-btn" id="runBtn-1.2">
                                    <ion-icon name="play-outline"></ion-icon> Run
                                </button>
                            </div>
                            <div class="code-editor-content" contenteditable="true" id="editor-1.2">
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Structure</title>
    </head>
    <body>
        <header>
            <h1>Main Header</h1>
            <nav>Navigation</nav>
        </header>
        <main>
            <article>Main Content</article>
        </main>
        <footer>Page Footer</footer>
    </body>
</html>
                            </div>
                        </div>
                    `
                }
            ]
        },
        {
            id: 2,
            title: "Working with CSS",
            topics: [
                {
                    id: "2.1",
                    title: "CSS Basics",
                    content: `
                        <h1>CSS Basics</h1>
                        <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
                        
                        <div class="code-editor">
                            <div class="code-editor-header">
                                <button class="editor-btn" id="copyBtn-2.1">
                                    <ion-icon name="copy-outline"></ion-icon> Copy
                                </button>
                                <button class="editor-btn" id="resetBtn-2.1">
                                    <ion-icon name="refresh-outline"></ion-icon> Reset
                                </button>
                                <button class="editor-btn" id="runBtn-2.1">
                                    <ion-icon name="play-outline"></ion-icon> Run
                                </button>
                            </div>
                            <div class="code-editor-content" contenteditable="true" id="editor-2.1">
/* Basic CSS Syntax */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px;
    background-color: #f5f5f5;
}
                            </div>
                        </div>
                    `
                },
                {
                    id: "2.2",
                    title: "CSS Selectors",
                    content: `
                        <h1>CSS Selectors</h1>
                        <p>CSS selectors are used to target specific HTML elements for styling.</p>
                        
                        <div class="code-editor">
                            <div class="code-editor-header">
                                <button class="editor-btn" id="copyBtn-2.2">
                                    <ion-icon name="copy-outline"></ion-icon> Copy
                                </button>
                                <button class="editor-btn" id="resetBtn-2.2">
                                    <ion-icon name="refresh-outline"></ion-icon> Reset
                                </button>
                                <button class="editor-btn" id="runBtn-2.2">
                                    <ion-icon name="play-outline"></ion-icon> Run
                                </button>
                            </div>
                            <div class="code-editor-content" contenteditable="true" id="editor-2.2">
/* Element Selector */
p {
    color: blue;
}

/* Class Selector */
.highlight {
    background-color: yellow;
}

/* ID Selector */
#header {
    font-size: 24px;
}

/* Descendant Selector */
article p {
    line-height: 1.6;
}
                            </div>
                        </div>
                    `
                }
            ]
        }
    ]
};

// Helper function to get total topics count
export const getTotalTopics = () => {
    return courseData.chapters.reduce((total, chapter) => {
        return total + chapter.topics.length;
    }, 0);
};

// Helper function to get topic by ID
export const getTopicById = (topicId) => {
    for (const chapter of courseData.chapters) {
        const topic = chapter.topics.find(t => t.id === topicId);
        if (topic) return topic;
    }
    return null;
};

// Helper function to get next/previous topic
export const getAdjacentTopic = (currentTopicId, direction = 'next') => {
    let allTopics = [];
    courseData.chapters.forEach(chapter => {
        allTopics = allTopics.concat(chapter.topics);
    });
    
    const currentIndex = allTopics.findIndex(topic => topic.id === currentTopicId);
    if (currentIndex === -1) return null;
    
    if (direction === 'next' && currentIndex < allTopics.length - 1) {
        return allTopics[currentIndex + 1];
    } else if (direction === 'prev' && currentIndex > 0) {
        return allTopics[currentIndex - 1];
    }
    
    return null;
};






