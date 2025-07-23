class ProjectCard extends HTMLElement {
  connectedCallback() {
    const category = this.getAttribute('category');
    const slug = this.getAttribute('slug');
    const location = this.getAttribute('location');
    const secondary = this.getAttribute('secondary');

    const title = this.titleFromSlug(slug);
    const href = `/projects/${category}/${slug}/index.html`;
    const imgSrc = `${slug}.webp`;

    // Compose figcaption lines
    const line1 = title;
    const line2 = secondary || location || '';

    // Compose alt text
    const alt = secondary
      ? `${title} ${secondary}`
      : location
      ? `${title} ${location}`
      : `${title} photo`;

    this.innerHTML = `
      <a href="${href}" class="no-decoration">
        <figure>
          <img src="${imgSrc}" alt="${alt}" />
          <figcaption>
            ${line1}
            ${line2 ? `<br>${line2}` : ''}
          </figcaption>
        </figure>
      </a>
    `;
  }

  titleFromSlug(slug) {
    return slug
      .split('-')
      .map(word => {
        if (/^[a-z]\.$/.test(word)) return word.toUpperCase(); // E. → E.
        const acronyms = { mlk: 'MLK', usa: 'USA', us: 'U.S.', usm: 'USM' };
        return acronyms[word] || word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}

customElements.define('project-card', ProjectCard);
