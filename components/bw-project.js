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
          <figcaption class="project-caption">
            <span class="project-title">${line1}</span>
            ${line2 ? `<span class="project-subtitle">${line2}</span>` : ''}
          </figcaption>
        </figure>
      </a>
    `;
  }

  titleFromSlug(slug) {
    const words = slug.split('-');
    const smallWords = new Set(['and', 'or', 'the', 'a', 'an', 'of', 'in', 'on', 'for', 'to', 'by', 'at', 'from', 'with', 'vs']);

    return words
      .map((word, index) => {
        const lowerWord = word.toLowerCase();
        if (/^[a-z]\.$/.test(word)) return word.toUpperCase(); // E. → E.
        const acronyms = { mlk: 'MLK', usa: 'USA', us: 'U.S.', usm: 'USM' };
        if (acronyms[lowerWord]) return acronyms[lowerWord];
        if (index > 0 && smallWords.has(lowerWord)) return lowerWord; // Keep small words lowercase when not first
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      })
      .join(' ');
  }
}

customElements.define('project-card', ProjectCard);
