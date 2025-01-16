// bw-nav.js

class BwNav extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to encapsulate styles and markup
    this.attachShadow({ mode: 'open' });

    // Define the template for the navigation
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
        }
        /* Navigation bar */
        nav {
            background-color: #fff;
            border-bottom: 2px solid #222; /* Strong, intentional border to reflect line weight discipline */
            padding: 15px;
        }
        
        nav ul {
            display: flex;
            list-style-type: none;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            margin: 0;
        }
        
        nav li {
            padding: 0 15px;
            font-weight: 500;
        }
        
        nav a {
            text-decoration: none;
            color: #333;
            font-weight: 400;
            border-bottom: 1px solid transparent; /* Subtle underline for precision */
            transition: border-bottom 0.3s, color 0.3s;
        }
        
        nav a:hover {
            color: #000;
            border-bottom: 1px solid #000; /* Line weight emphasis on hover */
        }
        
        nav a.active{
            color: #000;
            border-bottom: 1px solid #000; /* Line weight emphasis on hover */
        }
        @media (max-width: 824px) {
            nav ul {
              flex-direction: column;
            }
        }
      </style>
      <nav>
        <ul>
          <li>Burris/Wagnon Architects, P.A.</li>
          <li><a href="/" data-id="home">Home</a></li>
          <li><a href="/about.html" data-id="about">About The Firm</a></li>
          <li><a href="/projects/educational/index.html" data-id="projects">Projects</a></li>
          <li><a href="/contact.html" data-id="contact">Contact Us</a></li>
        </ul>
      </nav>
    `;

    // Append the template content to the shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Observe the 'active' attribute for changes
  static get observedAttributes() {
    return ['active'];
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    this.updateActiveState();
  }

  // Called when observed attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && oldValue !== newValue) {
      this.updateActiveState();
    }
  }

  // Method to update the active menu item
  updateActiveState() {
    const activeId = this.getAttribute('active');

    // Select all anchor tags within the shadow DOM
    const links = this.shadowRoot.querySelectorAll('a');

    links.forEach(link => {
      // Remove 'active' class from all links
      link.classList.remove('active');

      // Add 'active' class to the matching link
      if (link.getAttribute('data-id') === activeId) {
        link.classList.add('active');
      }
    });
  }
}

// Define the custom element
customElements.define('bw-nav', BwNav);

