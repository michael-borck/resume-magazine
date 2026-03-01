# Interactive Magazine Resume

<!-- BADGES:START -->
[![css](https://img.shields.io/badge/-css-1572b6?style=flat-square)](https://github.com/topics/css) [![customizable-content](https://img.shields.io/badge/-customizable--content-blue?style=flat-square)](https://github.com/topics/customizable-content) [![html](https://img.shields.io/badge/-html-e34f26?style=flat-square)](https://github.com/topics/html) [![interactive-resume](https://img.shields.io/badge/-interactive--resume-blue?style=flat-square)](https://github.com/topics/interactive-resume) [![javascript](https://img.shields.io/badge/-javascript-f7df1e?style=flat-square)](https://github.com/topics/javascript) [![responsive-design](https://img.shields.io/badge/-responsive--design-blue?style=flat-square)](https://github.com/topics/responsive-design) [![template-based](https://img.shields.io/badge/-template--based-blue?style=flat-square)](https://github.com/topics/template-based) [![vanilla-javascript](https://img.shields.io/badge/-vanilla--javascript-blue?style=flat-square)](https://github.com/topics/vanilla-javascript) [![magazine-design](https://img.shields.io/badge/-magazine--design-blue?style=flat-square)](https://github.com/topics/magazine-design) [![resume](https://img.shields.io/badge/-resume-00bcd4?style=flat-square)](https://github.com/topics/resume)
<!-- BADGES:END -->

A vanilla JavaScript, HTML, and CSS implementation of an interactive, magazine-style resume that showcases professional experience, skills, and projects in an engaging format.

![Magazine Resume Preview](assets/images/preview.png)

## Features

- **Magazine-Inspired Design**: Modeled after professional print magazines with a cover page and article-style content pages
- **Interactive Elements**: Page transitions, interactive timelines, skill visualizations, and project galleries
- **Responsive Layout**: Looks great on desktop, tablet, and mobile devices
- **Vanilla Implementation**: No frameworks required, just pure JavaScript, HTML, and CSS
- **Customizable Content**: Easy-to-edit JSON data files to personalize your information
- **Template-Based**: Simple templating system for updating content without changing the core structure

## Project Structure

```
magazine-resume/
├── index.html                  # Main HTML file
├── assets/
│   ├── css/
│   │   ├── main.css            # Global styles
│   │   ├── cover.css           # Cover page styles
│   │   └── article.css         # Article page styles
│   ├── js/
│   │   ├── main.js             # Core functionality
│   │   ├── templates.js        # Template rendering engine
│   │   └── navigation.js       # Page transitions and navigation
│   └── images/                 # Image assets
├── data/
│   ├── config.json             # Global site configuration
│   ├── profile.json            # Your basic info
│   ├── experience.json         # Work experience data
│   ├── education.json          # Education data
│   ├── skills.json             # Skills and expertise
│   └── projects.json           # Projects and portfolio items
└── templates/
    ├── cover.html              # Cover page template
    ├── experience.html         # Experience article template
    ├── skills.html             # Skills article template
    └── project.html            # Project article template
```

## Getting Started

### Prerequisites

- A modern web browser
- A basic text editor
- Basic knowledge of HTML, CSS, and JavaScript (for customization)
- A local web server (optional, but recommended for development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/magazine-resume.git
   ```

2. Navigate to the project directory:
   ```
   cd magazine-resume
   ```

3. Start a local server. There are multiple ways to do this:
   - Using Python (if installed):
     ```
     python -m http.server 8000
     ```
   - Using Node.js and npx (if installed):
     ```
     npx serve
     ```
   - Using VSCode's Live Server extension

4. Open your browser and navigate to `http://localhost:8000` (or the port your server is using)

### Customization

#### Basic Information

1. Edit the JSON files in the `data/` directory to update your personal information:
   - `profile.json`: Your name, title, contact information
   - `experience.json`: Your work history
   - `education.json`: Your educational background
   - `skills.json`: Your technical skills and expertise
   - `projects.json`: Your portfolio projects

2. Replace the placeholder images in the `assets/images/` directory with your own photos

#### Visual Styling

1. Modify the CSS files in `assets/css/` to change colors, fonts, and layouts:
   - Update the CSS variables in `main.css` to change the global color scheme
   - Edit specific page styles in their respective CSS files

#### Advanced Customization

1. Modify the HTML templates in the `templates/` directory to change the structure of different pages
2. Edit the JavaScript files in `assets/js/` to change functionality or add new features

## Magazine Metaphor Extensions

The project includes several extensions of the magazine metaphor:

1. **Table of Contents**: A contents page listing all "articles" in your resume
2. **Editorial Section**: A personal statement or career philosophy
3. **Interviews**: Q&A sections with former colleagues or mentors
4. **Feature Articles**: In-depth case studies of significant projects
5. **Gallery Sections**: Visual showcases of your work
6. **"Letters to the Editor"**: Testimonials from clients or colleagues
7. **Podcasts**: Audio discussions on technical topics (if implemented)

## Browser Compatibility

The resume is designed to work on modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by professional magazine layouts and modern digital publications
- Font Awesome for icons
- QRCode.js for QR code generation

## Author

[Your Name] - [Your Website/GitHub]

---

Happy resume building! 📚✨