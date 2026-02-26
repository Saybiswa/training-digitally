import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function OJT() {
  const navigate = useNavigate();

  return (
    <div className="training-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <h1 className="page-title">On Job Training Program</h1>
      <p className="page-subtitle">Duration: 3 Days | Hands-On Practical Experience</p>

      <div className="modules-container">
        <div className="module-card">
          <h2>Module 1 – Department Orientation</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Day 1 – Team Integration</h3>
              <ul>
                <li>Meet Your Team Members and Supervisor</li>
                <li>Department Goals and Objectives</li>
                <li>Workspace Setup and Resources</li>
                <li>Daily Operations Overview</li>
                <li>Role and Responsibilities Clarification</li>
              </ul>
            </div>
            <div className="day-section">
              <h3>Day 2 – Process Familiarization</h3>
              <ul>
                <li>Standard Operating Procedures</li>
                <li>Workflow and Process Documentation</li>
                <li>Quality Standards and Checkpoints</li>
                <li>Reporting and Documentation Requirements</li>
              </ul>
            </div>
            <div className="day-section">
              <h3>Day 3 – Practical Application</h3>
              <ul>
                <li>Hands-On Task Execution</li>
                <li>Supervised Practice Sessions</li>
                <li>Real-Time Problem Solving</li>
                <li>Performance Feedback and Coaching</li>
              </ul>
            </div>
            <div className="video-section">
              <h4>Training Video: OJT Best Practices</h4>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="OJT Overview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 2 – Technical Skills Development</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Essential Technical Skills</h3>
              <ul>
                <li>Department-Specific Software Training</li>
                <li>Equipment Operation and Safety</li>
                <li>Data Entry and Management Systems</li>
                <li>Technical Documentation</li>
                <li>Troubleshooting Common Issues</li>
              </ul>
            </div>
            <div className="video-section">
              <h4>Training Video: Technical Skills Mastery</h4>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Technical Skills Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 3 – Mentorship and Support</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Buddy System Program</h3>
              <ul>
                <li>Assigned Mentor Introduction</li>
                <li>Regular Check-In Sessions</li>
                <li>Knowledge Sharing and Best Practices</li>
                <li>Career Development Guidance</li>
                <li>Continuous Learning Opportunities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="module-card">
          <h2>Module 4 – Performance Evaluation</h2>
          <div className="module-content">
            <div className="day-section">
              <h3>Assessment and Feedback</h3>
              <ul>
                <li>Skill Assessment Criteria</li>
                <li>Performance Metrics and KPIs</li>
                <li>Feedback Sessions with Supervisor</li>
                <li>Development Plan Creation</li>
                <li>Certification and Next Steps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OJT;
