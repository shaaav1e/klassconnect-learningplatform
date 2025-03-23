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
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of a web page using a series of elements or tags that tell the browser how to display content.</p>
                        
            <p>Every HTML element consists of opening and closing tags, with content in between. Browsers do not display the HTML tags, but use them to render the content of the page.</p>
                        
            <h2>Key Concepts of HTML</h2>
            <ul>
              <li><strong>Elements:</strong> Building blocks of HTML that define different parts of a web page</li>
              <li><strong>Tags:</strong> Markup that defines the beginning and end of an element, enclosed in angle brackets</li>
              <li><strong>Attributes:</strong> Additional values that configure elements or adjust their behavior</li>
              <li><strong>Nesting:</strong> Placing elements inside other elements to create hierarchical structures</li>
            </ul>
                        
            <div class="exercise-container">
              <h3>Why HTML Matters</h3>
              <ul>
                <li>It's the foundation of all web pages</li>
                <li>It provides structure to your content</li>
                <li>It's supported by all browsers</li>
                <li>It's a prerequisite for learning other web technologies</li>
                <li>It's crucial for accessibility and search engine optimization</li>
              </ul>
            </div>
                        
            <h2>A Simple HTML Example</h2>
            <p>Here's what a basic HTML document looks like:</p>
                        
            <div class="code-example">
              <div class="code-title">HTML Example</div>
              <pre class="code-content">
<!DOCTYPE html>
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
    <p>HTML is <strong>awesome</strong>!</p>
  </body>
</html>
              </pre>
            </div>
                        
            <h2>Understanding the Example</h2>
            <ul>
              <li><code>&lt;!DOCTYPE html&gt;</code>: Tells the browser that this is an HTML5 document</li>
              <li><code>&lt;html&gt;</code>: The root element that contains all other HTML elements</li>
              <li><code>&lt;head&gt;</code>: Contains meta-information about the document</li>
              <li><code>&lt;title&gt;</code>: Specifies the title of the document (shown in browser tab)</li>
              <li><code>&lt;body&gt;</code>: Contains the visible content of the page</li>
              <li><code>&lt;h1&gt;</code>: Defines a main heading</li>
              <li><code>&lt;p&gt;</code>: Defines a paragraph</li>
              <li><code>&lt;strong&gt;</code>: Defines important text, typically displayed as bold</li>
            </ul>
                        
            <p>In the next section, we'll explore the structure of HTML documents in more detail and learn about semantic HTML elements.</p>
          `,
        },
        {
          id: "1.2",
          title: "HTML Document Structure",
          content: `
            <h1>HTML Document Structure</h1>
            <p>Every HTML document follows a basic structure that includes several key components. Understanding this structure is essential for creating well-formed web pages.</p>
                        
            <h2>The Anatomy of an HTML Document</h2>
            <p>Let's break down the essential parts of an HTML document:</p>
                        
            <ul>
              <li><strong>DOCTYPE declaration</strong>: Tells the browser which version of HTML you're using</li>
              <li><strong>html element</strong>: The root element that contains all other elements</li>
              <li><strong>head element</strong>: Contains meta information, title, and links to external resources</li>
              <li><strong>body element</strong>: Contains the visible content of the page</li>
            </ul>
                        
            <div class="code-example">
              <div class="code-title">Basic HTML Document Structure</div>
              <pre class="code-content">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <!-- Content goes here -->
    <h1>Welcome to my website</h1>
    <p>This is a paragraph of text.</p>
  </body>
</html>
              </pre>
            </div>
                        
            <h2>The <code>&lt;head&gt;</code> Section Explained</h2>
            <p>The <code>&lt;head&gt;</code> section contains information that is not displayed directly on the page but is important for browsers and search engines:</p>
                        
            <ul>
              <li><code>&lt;meta charset="UTF-8"&gt;</code>: Specifies the character encoding</li>
              <li><code>&lt;meta name="viewport"&gt;</code>: Controls the viewport settings for responsive design</li>
              <li><code>&lt;title&gt;</code>: Sets the page title shown in browser tabs and search results</li>
              <li><code>&lt;link&gt;</code>: Links to external resources like CSS files</li>
              <li><code>&lt;script&gt;</code>: Includes JavaScript code or links to JavaScript files</li>
              <li><code>&lt;style&gt;</code>: Contains CSS rules directly in the document</li>
            </ul>
                        
            <div class="exercise-container">
              <h3>Semantic HTML5 Elements</h3>
              <p>Modern HTML uses semantic elements that clearly describe their meaning to both the browser and the developer:</p>
              <ul>
                <li><code>&lt;header&gt;</code> - For the top section of a page or article</li>
                <li><code>&lt;nav&gt;</code> - For navigation links</li>
                <li><code>&lt;main&gt;</code> - For the main content area</li>
                <li><code>&lt;article&gt;</code> - For independent, self-contained content</li>
                <li><code>&lt;section&gt;</code> - For grouping related content</li>
                <li><code>&lt;aside&gt;</code> - For content related to the main content</li>
                <li><code>&lt;footer&gt;</code> - For the bottom section of a page or article</li>
                <li><code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> - For images, charts, etc., with captions</li>
              </ul>
            </div>
                        
            <h2>Semantic HTML Example</h2>
            <p>Here's an example of a well-structured HTML5 document using semantic elements:</p>
                        
            <div class="code-example">
              <div class="code-title">Semantic HTML Example</div>
              <pre class="code-content">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Semantic Web Page</title>
  </head>
  <body>
    <header>
      <h1>My Website</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
        
    <main>
      <section id="home">
        <h2>Welcome to My Website</h2>
        <p>This is the homepage content.</p>
      </section>
            
      <section id="about">
        <h2>About Us</h2>
        <article>
          <h3>Our History</h3>
          <p>Learn more about our company history.</p>
        </article>
        <article>
          <h3>Our Team</h3>
          <p>Meet our talented team members.</p>
        </article>
      </section>
            
      <aside>
        <h3>Related Information</h3>
        <p>Additional information about our services.</p>
      </aside>
    </main>
        
    <footer>
      <p>© 2023 My Website. All rights reserved.</p>
      <address>
        Contact us at: <a href="mailto:info@example.com">info@example.com</a>
      </address>
    </footer>
  </body>
</html>
              </pre>
            </div>
                        
            <h2>Benefits of Semantic HTML</h2>
            <ul>
              <li><strong>Accessibility</strong>: Screen readers and assistive technologies can better understand the content</li>
              <li><strong>SEO</strong>: Search engines give more weight to content in semantic elements</li>
              <li><strong>Maintainability</strong>: Code is clearer and easier to understand</li>
              <li><strong>Style consistency</strong>: Easier to apply consistent styling to similar components</li>
            </ul>
                        
            <p>In the next section, we'll dive into HTML elements and attributes in more detail.</p>
          `,
        },
        {
          id: "1.3",
          title: "HTML Elements & Attributes",
          content: `
            <h1>HTML Elements & Attributes</h1>
            <p>HTML elements are the building blocks of web pages. They are represented by tags enclosed in angle brackets (like <code>&lt;p&gt;</code>). Elements usually come in pairs with an opening and closing tag, though some are self-closing.</p>
                        
            <h2>Anatomy of an HTML Element</h2>
            <p>A typical HTML element consists of:</p>
            <ul>
              <li><strong>Opening tag</strong>: Marks the beginning of an element, e.g., <code>&lt;p&gt;</code></li>
              <li><strong>Content</strong>: The information contained between the tags</li>
              <li><strong>Closing tag</strong>: Marks the end of an element, e.g., <code>&lt;/p&gt;</code></li>
            </ul>
                        
            <div class="code-example">
              <div class="code-title">HTML Element Structure</div>
              <pre class="code-content">
<p class="intro">This is a paragraph with a class attribute.</p>
  ↑              ↑                                       ↑
Opening tag    Content                             Closing tag
with attribute
              </pre>
            </div>
                        
            <h2>Common HTML Elements</h2>
            <p>Here are some of the most commonly used HTML elements:</p>
                        
            <h3>Text Elements</h3>
            <ul>
              <li><code>&lt;h1&gt; - &lt;h6&gt;</code>: Headings (h1 being the most important)</li>
              <li><code>&lt;p&gt;</code>: Paragraph</li>
              <li><code>&lt;span&gt;</code>: Inline container for text</li>
              <li><code>&lt;br&gt;</code>: Line break (self-closing)</li>
              <li><code>&lt;hr&gt;</code>: Horizontal rule/line (self-closing)</li>
            </ul>
                        
            <h3>List Elements</h3>
            <ul>
              <li><code>&lt;ul&gt;</code>: Unordered list</li>
              <li><code>&lt;ol&gt;</code>: Ordered list</li>
              <li><code>&lt;li&gt;</code>: List item</li>
              <li><code>&lt;dl&gt;</code>: Description list</li>
              <li><code>&lt;dt&gt;</code>: Term in a description list</li>
              <li><code>&lt;dd&gt;</code>: Description in a description list</li>
            </ul>
                        
            <h3>Link and Image Elements</h3>
            <ul>
              <li><code>&lt;a&gt;</code>: Anchor (hyperlink)</li>
              <li><code>&lt;img&gt;</code>: Image (self-closing)</li>
              <li><code>&lt;figure&gt;</code>: Container for images with captions</li>
              <li><code>&lt;figcaption&gt;</code>: Caption for a figure element</li>
            </ul>
                        
            <h3>Container Elements</h3>
            <ul>
              <li><code>&lt;div&gt;</code>: Generic block-level container</li>
              <li><code>&lt;section&gt;</code>: Section of a document</li>
              <li><code>&lt;article&gt;</code>: Independent, self-contained content</li>
              <li><code>&lt;aside&gt;</code>: Content tangentially related to the main content</li>
            </ul>
                        
            <h3>Table Elements</h3>
            <ul>
              <li><code>&lt;table&gt;</code>: Table container</li>
              <li><code>&lt;tr&gt;</code>: Table row</li>
              <li><code>&lt;th&gt;</code>: Table header cell</li>
              <li><code>&lt;td&gt;</code>: Table data cell</li>
              <li><code>&lt;thead&gt;</code>: Group of header rows</li>
              <li><code>&lt;tbody&gt;</code>: Group of body rows</li>
              <li><code>&lt;tfoot&gt;</code>: Group of footer rows</li>
            </ul>
                        
            <h2>HTML Attributes</h2>
            <p>Attributes provide additional information about HTML elements. They are always specified in the opening tag and usually come in name/value pairs like: <code>name="value"</code>.</p>
                        
            <div class="exercise-container">
              <h3>Important Global Attributes</h3>
              <p>These attributes can be used on almost any HTML element:</p>
              <ul>
                <li><code>id</code>: Specifies a unique ID for an element</li>
                <li><code>class</code>: Specifies one or more class names for styling</li>
                <li><code>style</code>: Specifies inline CSS styles</li>
                <li><code>title</code>: Provides additional information (shown as tooltip)</li>
                <li><code>lang</code>: Specifies the language of the element's content</li>
                <li><code>data-*</code>: Used to store custom data private to the page/application</li>
                <li><code>aria-*</code>: Used to improve accessibility</li>
              </ul>
            </div>
                        
            <h3>Element-Specific Attributes</h3>
            <p>Some elements have their own specific attributes:</p>
                        
            <div class="code-example">
              <div class="code-title">Common Element-Specific Attributes</div>
              <pre class="code-content">
<!-- Link with href attribute -->
<a href="https://www.example.com" target="_blank" rel="noopener">Visit Example</a>

<!-- Image with src and alt attributes -->
<img src="image.jpg" alt="Description of image" width="300" height="200">

<!-- Form input with type, name, and placeholder attributes -->
<input type="email" name="user_email" placeholder="Enter your email" required>

<!-- Button with type and disabled attributes -->
<button type="submit" disabled>Submit</button>
              </pre>
            </div>
                        
            <h2>HTML Elements in Practice</h2>
            <p>Let's look at a comprehensive example that uses various HTML elements and attributes together:</p>
                        
            <div class="code-example">
              <div class="code-title">Complete HTML Example</div>
              <pre class="code-content">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Elements Example</title>
  <style>
    .highlight { background-color: yellow; }
  </style>
</head>
<body>
  <header id="main-header">
    <h1>My Web Page</h1>
    <nav>
      <ul>
        <li><a href="#section1">Section 1</a></li>
        <li><a href="#section2">Section 2</a></li>
      </ul>
    </nav>
  </header>
    
  <main>
    <section id="section1">
      <h2>Introduction</h2>
      <p class="intro">This is a <strong>paragraph</strong> with an 
      <a href="https://www.example.com" target="_blank" rel="noopener">external link</a>.</p>
            
      <figure>
        <img src="https://via.placeholder.com/300x200" 
             alt="Placeholder Image" 
             width="300" 
             height="200">
        <figcaption>Fig.1 - A sample image with caption</figcaption>
      </figure>
    </section>
        
    <section id="section2">
      <h2>Lists Example</h2>
            
      <h3>Unordered List</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
            
      <h3>Ordered List</h3>
      <ol>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>
            
      <h3>Description List</h3>
      <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
      </dl>
    </section>
        
    <section>
      <h2>Table Example</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>25</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Emily</td>
            <td>28</td>
            <td>Canada</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
    
  <footer>
    <p>© 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>
              </pre>
            </div>
                        
            <h2>Key Points to Remember</h2>
            <ul>
              <li>HTML elements define the structure and content of web pages</li>
              <li>Most elements have an opening tag, content, and a closing tag</li>
              <li>Some elements are self-closing (e.g., <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>)</li>
              <li>Attributes provide additional information about elements and modify their behavior</li>
              <li>Always use semantic HTML when possible to improve accessibility and SEO</li>
            </ul>
                        
            <p>In the next section, we'll start exploring CSS and how it's used to style HTML elements.</p>
          `,
        },
      ],
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
            <p>CSS (Cascading Style Sheets) is the language used to style and layout web pages. It controls how HTML elements are displayed on screen, making websites visually appealing and responsive.</p>
                        
            <h2>CSS Syntax</h2>
            <p>A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style, and the declaration block contains one or more declarations separated by semicolons.</p>
                        
            <div class="exercise-container">
              <h3>Three Ways to Include CSS</h3>
              <ol>
                <li><strong>External CSS</strong>: In a separate .css file, linked in the HTML head</li>
                <li><strong>Internal CSS</strong>: Inside a &lt;style&gt; element in the HTML head</li>
                <li><strong>Inline CSS</strong>: Using the style attribute in HTML elements</li>
              </ol>
              <p>External CSS is the preferred method for maintainability.</p>
            </div>
                        
            <p>Let's explore the basic CSS syntax:</p>
                        
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

/* Styling the body element */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

/* Styling headings */
h1 {
  color: #5a4ba0;
  text-align: center;
  border-bottom: 2px solid #5a4ba0;
  padding-bottom: 10px;
}

h2 {
  color: #444;
  margin-top: 25px;
}

/* Styling paragraphs */
p {
  margin-bottom: 15px;
}

/* Creating a container class */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
              </div>
            </div>
                        
            <p>The CSS above defines styles for basic HTML elements like the body, headings, and paragraphs, as well as a container class that could be applied to multiple elements.</p>
                        
            <p>Here's how you would link this CSS to an HTML file:</p>
                        
            <div class="code-editor">
              <div class="code-editor-header">
                <button class="editor-btn" id="copyBtn-2.1-html">
                  <ion-icon name="copy-outline"></ion-icon> Copy
                </button>
                <button class="editor-btn" id="resetBtn-2.1-html">
                  <ion-icon name="refresh-outline"></ion-icon> Reset
                </button>
                <button class="editor-btn" id="runBtn-2.1-html">
                  <ion-icon name="play-outline"></ion-icon> Run
                </button>
              </div>
              <div class="code-editor-content" contenteditable="true" id="editor-2.1-html">
<!DOCTYPE html>
<html>
<head>
  <title>CSS Example</title>
  <style>
    /* Internal CSS - same rules as above */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f8f8f8;
      color: #333;
      line-height: 1.6;
    }

    h1 {
      color: #5a4ba0;
      text-align: center;
      border-bottom: 2px solid #5a4ba0;
      padding-bottom: 10px;
    }

    h2 {
      color: #444;
      margin-top: 25px;
    }

    p {
      margin-bottom: 15px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to My Styled Page</h1>
    <h2>About CSS</h2>
    <p>CSS makes your websites look attractive and professional.</p>
    <p>It separates content from presentation for better maintainability.</p>
  </div>
</body>
</html>
              </div>
            </div>
          `,
        },
        {
          id: "2.2",
          title: "CSS Selectors",
          content: `
            <h1>CSS Selectors</h1>
            <p>CSS selectors are patterns used to select and style HTML elements. They are the connection between your HTML document and your style rules.</p>
                        
            <h2>Basic Selector Types</h2>
            <p>CSS selectors range from simple element targeting to complex pattern matching. Understanding selectors is key to writing efficient CSS.</p>
                        
            <div class="exercise-container">
              <h3>Common CSS Selectors</h3>
              <ul>
                <li><code>element</code> - Selects elements by tag name</li>
                <li><code>.class</code> - Selects elements with a specific class</li>
                <li><code>#id</code> - Selects an element with a specific ID</li>
                <li><code>element.class</code> - Selects elements with tag name and a specific class</li>
                <li><code>parent > child</code> - Selects direct children</li>
                <li><code>ancestor descendant</code> - Selects nested elements</li>
                <li><code>element:pseudo-class</code> - Selects elements in a specific state</li>
              </ul>
            </div>
                        
            <p>Let's look at examples of different selectors:</p>
                        
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
  color: #333;
  line-height: 1.6;
}

/* Class Selector */
.highlight {
  background-color: #ffff99;
  padding: 5px;
  border-radius: 3px;
}

/* ID Selector */
#header {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

/* Combined Selectors */
p.intro {
  font-size: 1.2em;
  font-weight: bold;
}

/* Child Selector */
nav > ul {
  display: flex;
  list-style: none;
  padding: 0;
}

/* Descendant Selector */
article p {
  text-indent: 20px;
}

/* Pseudo-classes */
a:hover {
  color: #5a4ba0;
  text-decoration: underline;
}

button:focus {
  outline: 2px solid #5a4ba0;
}

/* Attribute Selector */
input[type="text"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
              </div>
            </div>
                        
            <p>Now let's see these selectors in action with HTML:</p>
                        
            <div class="code-editor">
              <div class="code-editor-header">
                <button class="editor-btn" id="copyBtn-2.2-html">
                  <ion-icon name="copy-outline"></ion-icon> Copy
                </button>
                <button class="editor-btn" id="resetBtn-2.2-html">
                  <ion-icon name="refresh-outline"></ion-icon> Reset
                </button>
                <button class="editor-btn" id="runBtn-2.2-html">
                  <ion-icon name="play-outline"></ion-icon> Run
                </button>
              </div>
              <div class="code-editor-content" contenteditable="true" id="editor-2.2-html">
<!DOCTYPE html>
<html>
<head>
  <title>CSS Selectors Example</title>
  <style>
    /* Element Selector */
    p {
      color: #333;
      line-height: 1.6;
    }

    /* Class Selector */
    .highlight {
      background-color: #ffff99;
      padding: 5px;
      border-radius: 3px;
    }

    /* ID Selector */
    #header {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
      color: #5a4ba0;
    }

    /* Combined Selectors */
    p.intro {
      font-size: 1.2em;
      font-weight: bold;
    }

    /* Child Selector */
    nav > ul {
      display: flex;
      list-style: none;
      padding: 0;
      justify-content: center;
      gap: 20px;
    }

    /* Descendant Selector */
    article p {
      text-indent: 20px;
    }

    /* Pseudo-classes */
    a:hover {
      color: #5a4ba0;
      text-decoration: underline;
    }

    /* Attribute Selector */
    input[type="text"] {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      max-width: 300px;
    }
        
    /* Additional styles for better appearance */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
        
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 5px;
    }
        
    article {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 id="header">CSS Selectors Demo</h1>
        
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
        
    <p class="intro">This is an introduction paragraph that uses a combined selector.</p>
        
    <p>This is a regular paragraph that uses the element selector.</p>
        
    <p>This paragraph has a <span class="highlight">highlighted</span> word using the class selector.</p>
        
    <article>
      <h2>Article Title</h2>
      <p>This paragraph is inside an article and uses the descendant selector for text-indent.</p>
      <p>This is another paragraph inside the article with text-indent applied.</p>
    </article>
        
    <div>
      <label for="name">Name:</label><br>
      <input type="text" id="name" placeholder="Enter your name">
    </div>
  </div>
</body>
</html>
              </div>
            </div>
                        
            <p>Understanding CSS selectors allows you to target exactly the elements you want to style, without needing to add unnecessary classes or IDs.</p>
          `,
        },
        {
          id: "2.3",
          title: "CSS Box Model",
          content: `
            <h1>CSS Box Model</h1>
            <p>The CSS Box Model is fundamental to layout in CSS. It describes how elements are rendered with content, padding, borders, and margins.</p>
                        
            <h2>Components of the Box Model</h2>
            <p>Every HTML element can be considered as a box with these components:</p>
            <ul>
              <li><strong>Content</strong>: The actual text, images, or other media</li>
              <li><strong>Padding</strong>: Space between the content and the border</li>
              <li><strong>Border</strong>: A line that surrounds the padding</li>
              <li><strong>Margin</strong>: Space between the border and other elements</li>
            </ul>
                        
            <div class="exercise-container">
              <h3>Box Sizing Property</h3>
              <p>The <code>box-sizing</code> property defines how the width and height of an element are calculated:</p>
              <ul>
                <li><code>content-box</code> (default): Width and height only include content</li>
                <li><code>border-box</code>: Width and height include content, padding, and border</li>
              </ul>
              <p>Many developers prefer <code>border-box</code> for more predictable layouts.</p>
            </div>
                        
            <p>Let's see the Box Model in action:</p>
                        
            <div class="code-editor">
              <div class="code-editor-header">
                <button class="editor-btn" id="copyBtn-2.3">
                  <ion-icon name="copy-outline"></ion-icon> Copy
                </button>
                <button class="editor-btn" id="resetBtn-2.3">
                  <ion-icon name="refresh-outline"></ion-icon> Reset
                </button>
                <button class="editor-btn" id="runBtn-2.3">
                  <ion-icon name="play-outline"></ion-icon> Run
                </button>
              </div>
              <div class="code-editor-content" contenteditable="true" id="editor-2.3">
<!DOCTYPE html>
<html>
<head>
  <title>CSS Box Model Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
        
    /* Global box-sizing reset */
    * {
      box-sizing: border-box;
    }
        
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
        
    h1 {
      text-align: center;
      color: #5a4ba0;
    }
        
    /* Box model demonstration */
    .box {
      width: 300px;
      height: 200px;
            
      /* Content - automatically filled with text */
            
      /* Padding */
      padding: 20px;
            
      /* Border */
      border: 5px solid #5a4ba0;
            
      /* Margin */
      margin: 30px auto;
            
      /* Additional styling */
      background-color: #f0f0f0;
      text-align: center;
    }
        
    /* Box with content-box */
    .content-box {
      box-sizing: content-box;
      background-color: #ffecb3;
      border-color: #ffa000;
    }
        
    /* Box with border-box */
    .border-box {
      box-sizing: border-box;
      background-color: #c8e6c9;
      border-color: #4caf50;
    }
        
    /* For showing box dimensions */
    .dimensions {
      font-size: 14px;
      margin-top: 10px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>CSS Box Model</h1>
        
    <div class="box">
      <h2>Default Box</h2>
      <p>Width: 300px</p>
      <p>Height: 200px</p>
      <p>Padding: 20px</p>
      <p>Border: 5px</p>
      <p>Margin: 30px</p>
      <div class="dimensions">
        Total width: 350px (300 + 20*2 + 5*2)<br>
        Total height: 250px (200 + 20*2 + 5*2)
      </div>
    </div>
        
    <div class="box content-box">
      <h2>content-box</h2>
      <p>Width: 300px = content only</p>
      <p>Total width: 300 + 20*2 + 5*2 = 350px</p>
    </div>
        
    <div class="box border-box">
      <h2>border-box</h2>
      <p>Width: 300px = content + padding + border</p>
      <p>Content width: 300 - 20*2 - 5*2 = 250px</p>
    </div>
  </div>
</body>
</html>
              </div>
            </div>
                        
            <p>The Box Model is essential for understanding how elements take up space and interact with each other on a web page. Mastering this concept will help you create more precise layouts.</p>
          `,
        },
      ],
    },
    {
      id: 3,
      title: "Layouts & Responsive Design",
      topics: [
        {
          id: "3.1",
          title: "Flexbox Layout",
          content: `
            <h1>Flexbox Layout</h1>
            <p>Flexbox (Flexible Box Module) is a one-dimensional layout method designed for arranging items in rows or columns. It makes it easier to design flexible responsive layouts without using float or positioning.</p>
                        
            <h2>Flexbox Basics</h2>
            <p>To use flexbox, you set <code>display: flex</code> on a container element. This turns its direct children into flex items that can be easily manipulated with various flex properties.</p>
                        
            <div class="exercise-container">
              <h3>Key Flexbox Properties</h3>
              <h4>For the Flex Container:</h4>
              <ul>
                <li><code>display: flex</code> - Enables flexbox</li>
                <li><code>flex-direction</code> - Row, row-reverse, column, column-reverse</li>
                <li><code>justify-content</code> - Alignment along the main axis</li>
                <li><code>align-items</code> - Alignment along the cross axis</li>
                <li><code>flex-wrap</code> - Whether items wrap to multiple lines</li>
                <li><code>gap</code> - Space between flex items</li>
              </ul>
              <h4>For Flex Items:</h4>
              <ul>
                <li><code>flex-grow</code> - Ability to grow if necessary</li>
                <li><code>flex-shrink</code> - Ability to shrink if necessary</li>
                <li><code>flex-basis</code> - Default size before remaining space is distributed</li>
                <li><code>flex</code> - Shorthand for grow, shrink, and basis</li>
                <li><code>align-self</code> - Override alignment for specific items</li>
                <li><code>order</code> - Change the visual order of specific items</li>
              </ul>
            </div>
                        
            <p>Let's see Flexbox in action:</p>
                        
            <div class="code-editor">
              <div class="code-editor-header">
                <button class="editor-btn" id="copyBtn-3.1">
                  <ion-icon name="copy-outline"></ion-icon> Copy
                </button>
                <button class="editor-btn" id="resetBtn-3.1">
                  <ion-icon name="refresh-outline"></ion-icon> Reset
                </button>
                <button class="editor-btn" id="runBtn-3.1">
                  <ion-icon name="play-outline"></ion-icon> Run
                </button>
              </div>
              <div class="code-editor-content" contenteditable="true" id="editor-3.1">
<!DOCTYPE html>
<html>
<head>
  <title>Flexbox Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
        
    h1 {
      text-align: center;
      color: #5a4ba0;
      margin-bottom: 30px;
    }
        
    /* Basic container styling */
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
        
    /* Flexbox container examples */
    .flex-container {
      display: flex;
      margin-bottom: 30px;
      border: 2px dashed #ccc;
      padding: 10px;
    }
        
    /* Different flex directions */
    .flex-row {
      flex-direction: row; /* default */
    }
        
    .flex-column {
      flex-direction: column;
      height: 300px; /* Need height for column layout */
    }
        
    /* Justify content examples */
    .justify-start { justify-content: flex-start; } /* default */
    .justify-center { justify-content: center; }
    .justify-end { justify-content: flex-end; }
    .justify-between { justify-content: space-between; }
    .justify-around { justify-content: space-around; }
    .justify-evenly { justify-content: space-evenly; }
        
    /* Align items examples */
    .align-start { align-items: flex-start; }
    .align-center { align-items: center; }
    .align-end { align-items: flex-end; }
    .align-stretch { align-items: stretch; } /* default */
        
    /* Wrap examples */
    .flex-wrap {
      flex-wrap: wrap;
    }
        
    /* Gap examples */
    .flex-gap {
      gap: 15px;
    }
        
    /* Flex item styling */
    .flex-item {
      padding: 20px;
      text-align: center;
      background-color: #5a4ba0;
      color: white;
      border-radius: 5px;
      min-width: 100px;
    }
        
    /* Items with different flex behaviors */
    .grow-1 { flex-grow: 1; }
    .grow-2 { flex-grow: 2; }
    .order-1 { order: 1; }
    .order-2 { order: 2; }
    .order-3 { order: 3; }
        
    /* Section headers */
    h2 {
      margin-top: 40px;
      color: #333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
    }
        
    /* Small paragraph for explaining concepts */
    .description {
      margin-bottom: 10px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Flexbox Examples</h1>
        
    <h2>Basic Flex Row (default)</h2>
    <p class="description">Items are arranged in a row (default flex-direction)</p>
    <div class="flex-container flex-row">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
    </div>
        
    <h2>Flex Column</h2>
    <p class="description">Items are arranged in a column</p>
    <div class="flex-container flex-column">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
    </div>
        
    <h2>Justify Content Examples</h2>
    <p class="description">space-between: Items are evenly distributed with the first item at the start and the last item at the end</p>
    <div class="flex-container justify-between">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
    </div>
        
    <p class="description">space-around: Items are evenly distributed with equal space around them</p>
    <div class="flex-container justify-around">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
    </div>
        
    <h2>Flex Grow Example</h2>
    <p class="description">Items can grow to fill available space at different rates</p>
    <div class="flex-container">
      <div class="flex-item grow-1">Grow: 1</div>
      <div class="flex-item grow-2">Grow: 2</div>
      <div class="flex-item grow-1">Grow: 1</div>
    </div>
        
    <h2>Order Example</h2>
    <p class="description">Items can be reordered visually without changing the HTML</p>
    <div class="flex-container">
      <div class="flex-item order-3">Visual Order: 3</div>
      <div class="flex-item order-1">Visual Order: 1</div>
      <div class="flex-item order-2">Visual Order: 2</div>
    </div>
        
    <h2>Flex Wrap and Gap</h2>
    <p class="description">Items wrap to new lines when needed and have consistent spacing</p>
    <div class="flex-container flex-wrap flex-gap">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
      <div class="flex-item">Item 4</div>
      <div class="flex-item">Item 5</div>
      <div class="flex-item">Item 6</div>
      <div class="flex-item">Item 7</div>
      <div class="flex-item">Item 8</div>
    </div>
  </div>
</body>
</html>
              </div>
            </div>
                        
            <p>Flexbox is an incredibly powerful tool for creating one-dimensional layouts. Once you understand the basic concepts, you'll find it much easier to create responsive designs without complicated CSS.</p>
          `,
        },
      ],
    },
  ],
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
    const topic = chapter.topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return null;
};

// Helper function to get next/previous topic
export const getAdjacentTopic = (currentTopicId, direction = "next") => {
  let allTopics = [];
  courseData.chapters.forEach((chapter) => {
    allTopics = allTopics.concat(chapter.topics);
  });

  const currentIndex = allTopics.findIndex(
    (topic) => topic.id === currentTopicId
  );
  if (currentIndex === -1) return null;

  if (direction === "next" && currentIndex < allTopics.length - 1) {
    return allTopics[currentIndex + 1];
  } else if (direction === "prev" && currentIndex > 0) {
    return allTopics[currentIndex - 1];
  }

  return null;
};
