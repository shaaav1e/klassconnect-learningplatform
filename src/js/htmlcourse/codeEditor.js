// src/js/htmlcourse/codeEditor.js

class CodeEditor {
    constructor() {
        this.editors = new Map();
        this.init();
    }

    init() {
        // Initialize all code editors on the page
        document.querySelectorAll('.code-editor').forEach(editor => {
            const editorContent = editor.querySelector('.code-editor-content');
            const topicId = editorContent.id.replace('editor-', '');
            
            // Store original content for reset functionality
            const originalContent = editorContent.textContent.trim();
            this.editors.set(topicId, {
                element: editorContent,
                originalContent
            });

            // Load saved content if exists
            const savedContent = localStorage.getItem(`editor-${topicId}`);
            if (savedContent) {
                editorContent.textContent = savedContent;
            }

            // Setup buttons
            this.setupButtons(editor, topicId);
            
            // Auto-save on content change
            editorContent.addEventListener('input', () => {
                this.saveContent(topicId);
            });
        });
    }

    setupButtons(editor, topicId) {
        // Copy button
        const copyBtn = editor.querySelector(`#copyBtn-${topicId}`);
        copyBtn?.addEventListener('click', () => this.copyCode(topicId));

        // Reset button
        const resetBtn = editor.querySelector(`#resetBtn-${topicId}`);
        resetBtn?.addEventListener('click', () => this.resetCode(topicId));

        // Run button
        const runBtn = editor.querySelector(`#runBtn-${topicId}`);
        runBtn?.addEventListener('click', () => this.runCode(topicId));
    }

    copyCode(topicId) {
        const editor = this.editors.get(topicId);
        if (!editor) return;

        navigator.clipboard.writeText(editor.element.textContent)
            .then(() => {
                // Show success feedback
                const copyBtn = document.querySelector(`#copyBtn-${topicId}`);
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            })
            .catch(err => console.error('Failed to copy code:', err));
    }

    resetCode(topicId) {
        const editor = this.editors.get(topicId);
        if (!editor) return;

        editor.element.textContent = editor.originalContent;
        this.saveContent(topicId);
    }

    runCode(topicId) {
        const editor = this.editors.get(topicId);
        if (!editor) return;

        const code = editor.element.textContent;
        
        // Create a sandbox iframe
        const sandbox = document.createElement('iframe');
        sandbox.style.width = '100%';
        sandbox.style.height = '300px';
        sandbox.style.border = '1px solid #ccc';
        sandbox.style.borderRadius = '4px';
        sandbox.style.marginTop = '1rem';

        // Remove existing sandbox if any
        const existingSandbox = editor.element.parentElement.querySelector('iframe');
        if (existingSandbox) {
            existingSandbox.remove();
        }

        // Add the new sandbox
        editor.element.parentElement.appendChild(sandbox);

        // Write the code to the iframe
        sandbox.contentDocument.open();
        sandbox.contentDocument.write(code);
        sandbox.contentDocument.close();
    }

    saveContent(topicId) {
        const editor = this.editors.get(topicId);
        if (!editor) return;

        localStorage.setItem(`editor-${topicId}`, editor.element.textContent);
    }

    // Method to initialize new editors when content changes
    initializeNewEditors() {
        this.init();
    }
}

// Create and export a single instance
const codeEditor = new CodeEditor();
export default codeEditor;