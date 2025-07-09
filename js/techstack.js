// Technology highlighting functionality
    function initTechHighlighting() {
      const techBadges = document.querySelectorAll('.tech-badge');
      const projectCards = document.querySelectorAll('.project-card');

      techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
          const tech = badge.getAttribute('data-tech');
          highlightProjects(tech);
          badge.classList.add('active');
        });

        badge.addEventListener('mouseleave', () => {
          resetProjectHighlights();
          badge.classList.remove('active');
        });
      });
    }

    function highlightProjects(technology) {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        const techs = card.getAttribute('data-techs');
        if (techs && techs.includes(technology)) {
          card.classList.add('highlighted');
          card.classList.remove('dimmed');
        } else {
          card.classList.add('dimmed');
          card.classList.remove('highlighted');
        }
      });
    }

    function resetProjectHighlights() {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        card.classList.remove('highlighted', 'dimmed');
      });
    }
    document.addEventListener('DOMContentLoaded', () => {
      initTechHighlighting();
    });