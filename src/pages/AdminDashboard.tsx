import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

interface TopicDetail {
  topicName: string;
  startDate: string;
  endDate: string;
}

interface UserData {
  completedTopics: number;
  completedDays: number;
  totalScore: number;
  topics: TopicDetail[];
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<[string, UserData][]>([]);

  // ✅ Load data from PostgreSQL
  useEffect(() => {
    if (localStorage.getItem("admin_logged_in") !== "true") {
      navigate("/admin-login");
      return;
    }

    const loadData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/assessments");
        const data = await res.json();

        const userMap: Record<string, UserData> = {};

        data.forEach((item: any) => {
          if (!userMap[item.username]) {
            userMap[item.username] = {
              completedTopics: 0,
              completedDays: 0,
              totalScore: 0,
              topics: [],
            };
          }

          if (item.completed) userMap[item.username].completedTopics++;

          userMap[item.username].completedDays++;
          userMap[item.username].totalScore += item.score;

          userMap[item.username].topics.push({
            topicName: item.topic,
            startDate: item.created_at || "N/A",
            endDate: item.completed ? item.created_at : "Not Completed",
          });
        });

        setUsers(Object.entries(userMap));
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data");
      }
    };

    loadData();
  }, [navigate]);

  // ✅ Reset all assessment data
  const handleResetData = async () => {
    if (!window.confirm("Delete all data?")) return;

    try {
      await fetch("http://127.0.0.1:5000/api/assessments", {
        method: "DELETE",
      });
      setUsers([]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin-login");
  };

  // ✅ Download CSV
  const downloadReport = () => {
    if (users.length === 0) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "User",
      "Completed Topics",
      "Completed Days",
      "Total Score",
      "Topics",
    ];

    const rows = users.map(([username, data]) => [
      username,
      data.completedTopics,
      data.completedDays,
      data.totalScore,
      data.topics
        .map(
          (t) =>
            `${t.topicName} (${t.startDate} → ${t.endDate})`
        )
        .join(" | "),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const today = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `Admin_Report_${today}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div>
          <button className="reset-btn" onClick={handleResetData}>
            Reset Data
          </button>
          <button className="download-btn" onClick={downloadReport}>
            Download Report
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Completed Topics</th>
              <th>Completed Days</th>
              <th>Total Score</th>
              <th>Topic Details</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No Data Found
                </td>
              </tr>
            ) : (
              users.map(([username, data]) => (
                <tr key={username}>
                  <td>{username}</td>
                  <td>{data.completedTopics}</td>
                  <td>{data.completedDays}</td>
                  <td>{data.totalScore}</td>
                  <td>
                    {data.topics.map((t, i) => (
                      <div key={i} className="topic-detail">
                        <strong>{t.topicName}</strong>
                        <br />
                        Start:{" "}
                        {t.startDate !== "N/A"
                          ? new Date(t.startDate).toLocaleString()
                          : "N/A"}
                        <br />
                        End:{" "}
                        {t.endDate !== "Not Completed"
                          ? new Date(t.endDate).toLocaleString()
                          : "Not Completed"}
                        <hr />
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;