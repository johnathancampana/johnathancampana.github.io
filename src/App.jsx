import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

const TABS = [
  { key: 'about', label: 'Bio' },
  { key: 'projects', label: 'Projects' },
  { key: 'writing', label: 'Writing' },
  // { key: 'reviews', label: 'Reviews' },
];

const REVIEW_TYPES = [
  { key: 'book', label: 'Books' },
  { key: 'movie', label: 'Movies' },
  { key: 'article', label: 'Articles' },
];

function App() {
  const [about, setAbout] = useState('');
  const [workIntro, setWorkIntro] = useState('');
  const [workItems, setWorkItems] = useState([]);
  const [writing, setWriting] = useState('');
  const [notes, setNotes] = useState('');
  const [reviews, setReviews] = useState([]);
  const [selectedReviewTypes, setSelectedReviewTypes] = useState(
    () => new Set(REVIEW_TYPES.map(type => type.key))
  );
  const [showReviewFilters, setShowReviewFilters] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(new Set());
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [showWorkFilters, setShowWorkFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState('about');
  const tabRefs = useRef([]);

  // Set tab from hash on load and on hash change
  useEffect(() => {
    function setTabFromHash() {
      const hash = window.location.hash.replace('#', '');
      if (hash && TABS.some(tab => tab.key === hash)) {
        setSelectedTab(hash);
      }
    }
    setTabFromHash();
    window.addEventListener('hashchange', setTabFromHash);
    return () => window.removeEventListener('hashchange', setTabFromHash);
  }, []);

  useEffect(() => {
    fetch('/src/content/about.md')
      .then(res => res.text())
      .then(setAbout);
    fetch('/src/content/projects.md')
      .then(res => res.text())
      .then(setWorkIntro);
    fetch('/content/projects.json')
      .then(res => res.json())
      .then(data => {
        setWorkItems(data);
        const roles = new Set(data.map(item => item.role).filter(Boolean));
        const skills = new Set(
          data.flatMap(item => item.skills || [])
        );
        setSelectedRoles(roles);
        setSelectedSkills(skills);
      });
    fetch('/src/content/writing.md')
      .then(res => res.text())
      .then(setWriting);
    fetch('/src/content/notes.md')
      .then(res => res.text())
      .then(setNotes);
    fetch('/content/reviews.json')
      .then(res => res.json())
      .then(setReviews);
  }, []);

  // For slider thumb position
  const selectedIdx = TABS.findIndex(tab => tab.key === selectedTab);
  const [thumbStyle, setThumbStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const node = tabRefs.current[selectedIdx];
    if (node) {
      setThumbStyle({ left: node.offsetLeft, width: node.offsetWidth });
    }
  }, [selectedTab]);

  // For sliding content
  const toggleReviewType = (type) => {
    setSelectedReviewTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const clearReviewTypes = () => setSelectedReviewTypes(new Set());

  const selectAllReviewTypes = () =>
    setSelectedReviewTypes(new Set(REVIEW_TYPES.map(type => type.key)));

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted)
  );

  const filteredReviews = sortedReviews.filter(review =>
    selectedReviewTypes.has(review.type)
  );

  const roleOptions = Array.from(
    new Set(workItems.map(item => item.role).filter(Boolean))
  ).sort();

  const skillOptions = Array.from(
    new Set(
      workItems.flatMap(item => item.skills || [])
    )
  ).sort();

  const toggleRole = (role) => {
    setSelectedRoles(prev => {
      const next = new Set(prev);
      if (next.has(role)) {
        next.delete(role);
      } else {
        next.add(role);
      }
      return next;
    });
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const clearRoles = () => setSelectedRoles(new Set());
  const clearSkills = () => setSelectedSkills(new Set());

  const selectAllRoles = () => setSelectedRoles(new Set(roleOptions));
  const selectAllSkills = () => setSelectedSkills(new Set(skillOptions));

  const filteredWorkItems = workItems.filter(item => {
    const hasRoleFilter = selectedRoles.size > 0;
    const hasSkillFilter = selectedSkills.size > 0;

    // If no filters are selected at all, show nothing
    if (!hasRoleFilter && !hasSkillFilter) {
      return false;
    }

    const matchesRole = hasRoleFilter && selectedRoles.has(item.role);
    const itemSkills = item.skills || [];
    const matchesSkill =
      hasSkillFilter && itemSkills.some(skill => selectedSkills.has(skill));

    // OR semantics across Role and Skill
    return matchesRole || matchesSkill;
  });

  const getContent = () => [
    <div className="slider-panel" key="about">
      <div className="about-section">
        <div className="about-content">
          <ReactMarkdown>{about}</ReactMarkdown>
        </div>
        <img 
          src="/headshot.jpg" 
          alt="Johnathan Campana" 
          className="about-headshot"
          onError={(e) => {
            // Hide image if it doesn't exist
            e.target.style.display = 'none';
          }}
        />
      </div>
    </div>,
    <div className="slider-panel" key="projects">
      {workIntro && (
        <div className="work-intro">
          <ReactMarkdown>{workIntro}</ReactMarkdown>
        </div>
      )}
      {workItems.length > 0 && (
        <>
          <div className="filter-toggle">
            <button
              type="button"
              onClick={() => setShowWorkFilters(prev => !prev)}
            >
              {showWorkFilters ? 'Hide filters' : 'Filter'}
            </button>
          </div>
          {showWorkFilters && (
            <div className="work-controls">
              <p className="work-filter-helper">
                Entries appear if they match <strong>any</strong> selected Role or Skill.
              </p>
              <div className="work-filter-group">
                <h4>Role</h4>
                <div className="work-filter-options">
                  {roleOptions.map(role => (
                    <label key={role} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRoles.has(role)}
                        onChange={() => toggleRole(role)}
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
                <div className="filter-actions">
                  <button
                    type="button"
                    onClick={clearRoles}
                    disabled={selectedRoles.size === 0}
                  >
                    Clear all
                  </button>
                  <button
                    type="button"
                    onClick={selectAllRoles}
                    disabled={selectedRoles.size === roleOptions.length}
                  >
                    Select all
                  </button>
                </div>
              </div>
              <div className="work-filter-group">
                <h4>Skill</h4>
                <div className="work-filter-options">
                  {skillOptions.map(skill => (
                    <label key={skill} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedSkills.has(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
                <div className="filter-actions">
                  <button
                    type="button"
                    onClick={clearSkills}
                    disabled={selectedSkills.size === 0}
                  >
                    Clear all
                  </button>
                  <button
                    type="button"
                    onClick={selectAllSkills}
                    disabled={selectedSkills.size === skillOptions.length}
                  >
                    Select all
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {workItems.length === 0 ? (
        <p className="reviews-empty">Projects coming soon.</p>
      ) : filteredWorkItems.length === 0 ? (
        <p className="reviews-empty">No project entries match the selected filters.</p>
      ) : (
        <div className="work-grid">
          {filteredWorkItems.map(item => (
            <a
              key={item.slug}
              className="work-card"
              href={`/projects/${item.slug}.html`}
            >
              <div className="work-card-header">
                <h3>{item.title}</h3>
                {item.company && <p className="work-company">{item.company}</p>}
              </div>
              <p className="work-summary">{item.summary}</p>
              <div className="work-meta">
                {item.role && <span className="work-pill">{item.role}</span>}
                {item.type && <span className="work-pill subtle">{item.type}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>,
    <div className="slider-panel" key="writing"><ReactMarkdown>{writing}</ReactMarkdown></div>,
    <div className="slider-panel" key="reviews">
      {reviews.length > 0 && (
        <>
          <div className="filter-toggle">
            <button
              type="button"
              onClick={() => setShowReviewFilters(prev => !prev)}
            >
              {showReviewFilters ? 'Hide filters' : 'Filter'}
            </button>
          </div>
          {showReviewFilters && (
            <div className="reviews-controls">
              <div className="review-filters">
                {REVIEW_TYPES.map(type => (
                  <label key={type.key} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedReviewTypes.has(type.key)}
                      onChange={() => toggleReviewType(type.key)}
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
              <div className="filter-actions">
                <button
                  type="button"
                  onClick={clearReviewTypes}
                  disabled={selectedReviewTypes.size === 0}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={selectAllReviewTypes}
                  disabled={selectedReviewTypes.size === REVIEW_TYPES.length}
                >
                  Select all
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {selectedReviewTypes.size === 0 ? (
        <p className="reviews-empty">No categories selected. Choose a filter to see reviews.</p>
      ) : filteredReviews.length === 0 ? (
        <p className="reviews-empty">No reviews match the selected filters.</p>
      ) : (
        <div className="reviews-grid">
          {filteredReviews.map(review => (
            <a
              key={review.slug}
              className="review-card"
              href={`/reviews/${review.slug}.html`}
            >
              <img src={review.image} alt={review.title} />
              <div className="review-overlay">
                <p className="review-type">{review.type}</p>
                <h3>{review.title}</h3>
                {renderStars(review.rating)}
                <p className="review-blurb">{review.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>,
    <div className="slider-panel" key="notes"><ReactMarkdown>{notes}</ReactMarkdown></div>
  ];

  const renderStars = (rating) => (
    <div className="review-stars" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map(index => {
        const filled = rating >= index + 1;
        const half = !filled && rating > index && rating < index + 1;
        return (
          <span
            key={index}
            className={`star${filled ? ' filled' : ''}${half ? ' half' : ''}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );

  // Handle touch interactions for review cards on mobile
  useEffect(() => {
    let cleanupFunctions = [];

    // Use a small delay to ensure DOM is updated after reviews render
    const timeoutId = setTimeout(() => {
      const handleTouchStart = (e) => {
        const card = e.currentTarget;
        card.classList.add('touch-active');
      };

      const handleTouchEnd = (e) => {
        const card = e.currentTarget;
        // Remove class after a short delay to allow :active state to work
        setTimeout(() => {
          card.classList.remove('touch-active');
        }, 300);
      };

      const reviewCards = document.querySelectorAll('.review-card');
      reviewCards.forEach(card => {
        card.addEventListener('touchstart', handleTouchStart, { passive: true });
        card.addEventListener('touchend', handleTouchEnd, { passive: true });
        cleanupFunctions.push(() => {
          card.removeEventListener('touchstart', handleTouchStart);
          card.removeEventListener('touchend', handleTouchEnd);
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanupFunctions.forEach(cleanup => cleanup());
      cleanupFunctions = [];
    };
  }, [filteredReviews, selectedTab]);

  // Update hash when tab changes
  const handleTabClick = (key) => {
    setSelectedTab(key);
    window.location.hash = key;
  };

  return (
    <main className="container">
      <header>
        <h3>Johnathan Campana</h3>
        <nav className="slider-nav-bar">
          <div className="slider-track">
            <div className="slider-thumb" style={thumbStyle}></div>
            {TABS.map((tab, idx) => (
              <button
                key={tab.key}
                ref={el => tabRefs.current[idx] = el}
                className={`slider-tab${selectedTab === tab.key ? ' selected' : ''}`}
                onClick={() => handleTabClick(tab.key)}
                aria-current={selectedTab === tab.key ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <div className="slider-content-outer">
        <div
          className="slider-content-inner"
          style={{ transform: `translateX(-${selectedIdx * 100}%)` }}
        >
          {getContent()}
        </div>
      </div>
    </main>
  );
}

export default App;
