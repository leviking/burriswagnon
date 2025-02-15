// components/bw-side-menu.js

class BwSideMenu extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to encapsulate styles and markup
    this.attachShadow({ mode: 'open' });

    // Define the template for the side menu
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }
              /* Side menu styling */
        .side-menu {
            position: fixed;
            top: 100px;
            left: 0;
            width: 220px;
            background-color: #fff;
            border-right: 1px solid #ddd;
            padding: 20px;
        }
        
        .side-menu ul {
            list-style-type: none;
        }
        
        .side-menu ul li {
            margin-bottom: 25px;
        }
        
        .side-menu ul li a {
            text-decoration: none;
            color: #222;
            font-size: 1.2rem;
            font-weight: 400;
            letter-spacing: 0.05rem; /* Slight tracking to emphasize modernist influence */
            border-left: 3px solid transparent;
            padding-left: 10px;
            transition: border-left 0.3s, color 0.3s;
        }
        
        .side-menu ul li a:hover {
            color: #000;
            border-left: 3px solid #222;
        }
        
        .side-menu ul li a.active {
          color: #000; /* Same color as hover */
          border-left: 3px solid #222; /* Same border as hover */
        }

        @media (max-width: 824px) {

          .side-menu {
              width: 100%;
              max-width: 100vw;
              position: static;
              padding: 10px 0;
              border-right: none;
              border-bottom: 1px solid #ddd;
          }

          .side-menu ul {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              padding: 0;
          }
          .side-menu ul li a.active {
            color: #000; /* Same color as hover */
          }

          .project-sections {
              margin-left: 0;
              padding: 10px;
          }
        }
      </style>
      <aside class="side-menu">
        <ul>
          <li><a href="/projects/educational/index.html" data-id="educational">Educational</a></li>
          <li><a href="/projects/civic/index.html" data-id="civic">Civic</a></li>
          <li><a href="/projects/office/index.html" data-id="office">Office</a></li>
          <li><a href="/projects/preservation/index.html" data-id="preservation">Preservation</a></li>
          <li><a href="/projects/ecclesiastical/index.html" data-id="ecclesiastical">Ecclesiastical</a></li>
          <li><a href="/projects/residential/index.html" data-id="residential">Residential</a></li>
        </ul>
      </aside>
    `;

    // Append the template content to the shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Specify the observed attribute
  static get observedAttributes() {
    return ['active'];
  }

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    this.updateActiveState();
  }

  // Lifecycle method called when observed attributes change
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
customElements.define('bw-side-menu', BwSideMenu);

