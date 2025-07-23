class ProjectCard extends HTMLElement {
  connectedCallback() {
    const category = this.getAttribute('category');
    const slug = this.getAttribute('slug');
    const location = this.getAttribute('location');

    const title = this.titleFromSlug(slug);
    const href = `/projects/${category}/${slug}/index.html`;
    const imgSrc = `${slug}.webp`;
    const alt = `${title} ${location}`;

    this.innerHTML = `
      <a href="${href}" class="no-decoration">
        <figure>
          <img src="${imgSrc}" alt="${alt}" />
          <figcaption>
            ${title}<br>
            ${location}
          </figcaption>
        </figure>
      </a>
    `;
  }

  titleFromSlug(slug) {
    return slug
      .split('-')
      .map(word => {
        if (/^[a-z]\.$/.test(word)) {
          // Handle initials like "e." → "E."
          return word.toUpperCase();
        }
        if (/^[a-z]{2,4}$/.test(word)) {
          // Optional: handle known acronyms
          const acronyms = { mlk: 'MLK', usa: 'USA', us: 'U.S.' };
          return acronyms[word] || word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}

customElements.define('project-card', ProjectCard);
