import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ProductTraining() {
  const navigate = useNavigate();

  return (
    <div className="training-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <h1 className="page-title">Product training</h1>
      <p className="page-subtitle">Duration: 2 Hours | Essential Professional Skills</p>

      <div className="modules-container">
        <div className="module-card">
          <h2>products 1</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Effective Communication</h3>
              <ul>
                <li>AC</li>
                <li>REF</li>
                <li>WM</li>
                <li>TV</li>
                <li>Extensive usages of Telepresence </li>
                <li>Assistant Through RST</li>

              </ul>
            </div>
            <div className="video-section">
              <h4>Training Video: Communication Mastery</h4>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Communication Skills Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 2 – Teamwork and Collaboration</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Building Strong Teams</h3>
              <ul>
                <li>Team Dynamics and Roles</li>
                <li>Collaborative Problem Solving</li>
                <li>Conflict Resolution Strategies</li>
                <li>Building Trust and Rapport</li>
                <li>Virtual Team Management</li>
              </ul>
            </div>
            <div className="video-section">
              <h4>Training Video: Teamwork Excellence</h4>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Teamwork Skills Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 3 – Time Management and Productivity</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Maximizing Efficiency</h3>
              <ul>
                <li>Priority Setting and Goal Management</li>
                <li>Task Organization and Planning</li>
                <li>Avoiding Procrastination</li>
                <li>Work-Life Balance</li>
                <li>Stress Management Techniques</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 4 – Leadership and Initiative</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Developing Leadership Skills</h3>
              <ul>
                <li>Taking Initiative and Ownership</li>
                <li>Decision Making and Problem Solving</li>
                <li>Emotional Intelligence</li>
                <li>Mentoring and Coaching</li>
                <li>Adaptability and Resilience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTraining;
