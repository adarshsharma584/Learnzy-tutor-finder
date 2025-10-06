import React, { useState, useCallback } from "react";

// --- Mock Data ---
// In a real application, this data would come from an API.
const initialTuitionDetails = {
  name: "Sunshine Tutorials",
  address: "123 Education Lane, Knowledge City, 12345",
  price: "5000",
  subjects: "Math, Science, English",
  board: "CBSE",
  classRange: "6th - 10th",
};

const initialBatches = [
  {
    id: 1,
    name: "Grade 10 Warriors",
    subject: "Math",
    time: "4 PM - 5 PM",
    students: 25,
  },
  {
    id: 2,
    name: "Grade 9 Einsteins",
    subject: "Science",
    time: "5 PM - 6 PM",
    students: 22,
  },
  {
    id: 3,
    name: "Grade 6 Beginners",
    subject: "English",
    time: "3 PM - 4 PM",
    students: 30,
  },
];

const initialNotifications = [
  {
    id: 1,
    text: "Math class for Grade 10 is cancelled tomorrow.",
    date: "2023-10-26",
  },
  {
    id: 2,
    text: "Science test for Grade 9 will be held next Monday.",
    date: "2023-10-25",
  },
];

// --- Style Objects ---
// Using CSS-in-JS for simplicity in a single file.
const styles = {
  dashboardContainer: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    height: "100vh",
    backgroundColor: "#f4f7fa",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "white",
    padding: "15px 20px",
    textAlign: "left",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  navButtonActive: {
    backgroundColor: "#3498db",
  },
  mainContent: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    flex: 1,
  },
  cardTitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    width: "400px",
  },
  modalHeader: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

// --- Child Components ---

const Analytics = ({ batches }) => {
  const totalStudents = batches.reduce((sum, batch) => sum + batch.students, 0);

  return (
    <div>
      <h2 style={styles.header}>Analytics Overview</h2>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Students</h3>
          <p style={styles.cardValue}>{totalStudents}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Average Rating</h3>
          <p style={styles.cardValue}>4.8/5.0</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Performance</h3>
          <p style={styles.cardValue}>Excellent</p>
        </div>
      </div>
    </div>
  );
};

const TuitionDetails = () => {
  const [details, setDetails] = useState(initialTuitionDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend API
    alert("Tuition details saved!");
    console.log("Saving details:", details);
  };

  return (
    <div>
      <h2 style={styles.header}>Tuition Details</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            Tuition Name
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={details.name}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="address">
            Address
          </label>
          <input
            style={styles.input}
            type="text"
            id="address"
            name="address"
            value={details.address}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="price">
            Price (per month)
          </label>
          <input
            style={styles.input}
            type="text"
            id="price"
            name="price"
            value={details.price}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="subjects">
            Subjects
          </label>
          <input
            style={styles.input}
            type="text"
            id="subjects"
            name="subjects"
            value={details.subjects}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="board">
            Board (e.g., CBSE, ICSE)
          </label>
          <input
            style={styles.input}
            type="text"
            id="board"
            name="board"
            value={details.board}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="classRange">
            Class Range (e.g., 6th - 10th)
          </label>
          <input
            style={styles.input}
            type="text"
            id="classRange"
            name="classRange"
            value={details.classRange}
            onChange={handleChange}
          />
        </div>
        <button style={styles.button} type="submit">
          Save Details
        </button>
      </form>
    </div>
  );
};

const BatchManagement = () => {
  const [batches, setBatches] = useState(initialBatches);

  const handleAddBatch = () => {
    // In a real app, this would open a modal form to create a new batch
    const newBatch = {
      id: batches.length + 1,
      name: `New Batch ${batches.length + 1}`,
      subject: "Not Assigned",
      time: "TBD",
      students: 0,
    };
    setBatches((prev) => [...prev, newBatch]);
  };

  return (
    <div>
      <h2 style={styles.header}>Manage Batches</h2>
      <button
        style={{ ...styles.button, marginBottom: "20px" }}
        onClick={handleAddBatch}
      >
        Create New Batch
      </button>
      <div>
        {batches.map((batch) => (
          <div key={batch.id} style={styles.listItem}>
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {batch.name} ({batch.subject})
              </p>
              <p style={{ margin: "5px 0 0", color: "#666" }}>
                Time: {batch.time} | Students: {batch.students}
              </p>
            </div>
            <div>
              {/* Add Edit/Delete functionality here */}
              <button
                style={{
                  ...styles.button,
                  backgroundColor: "#f39c12",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
              <button style={{ ...styles.button, backgroundColor: "#e74c3c" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState("");

  const handlePost = () => {
    if (!newNotification.trim()) {
      alert("Notification cannot be empty.");
      return;
    }
    const newPost = {
      id: notifications.length + 1,
      text: newNotification,
      date: new Date().toISOString().split("T")[0],
    };
    setNotifications((prev) => [newPost, ...prev]);
    setNewNotification("");
  };

  return (
    <div>
      <h2 style={styles.header}>Daily Notifications</h2>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="notification">
            Post a new notification
          </label>
          <textarea
            id="notification"
            style={styles.textarea}
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            placeholder="Write a message for your students..."
          />
        </div>
        <button style={styles.button} onClick={handlePost}>
          Post Notification
        </button>
      </div>
      <h3 style={{ ...styles.header, fontSize: "22px", marginTop: "30px" }}>
        Posted Notifications
      </h3>
      <div>
        {notifications.map((notif) => (
          <div key={notif.id} style={styles.listItem}>
            <p style={{ margin: 0 }}>{notif.text}</p>
            <span style={{ color: "#888", fontSize: "14px" }}>
              {notif.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentReports = () => (
  <div>
    <h2 style={styles.header}>Student Progress Reports</h2>
    <div style={styles.card}>
      <p>
        AI-generated student progress reports will be available here in a future
        update.
      </p>
      <p>
        This section will provide detailed insights into each student's
        performance, strengths, and areas for improvement.
      </p>
    </div>
  </div>
);

// --- Main Dashboard Component ---

const TuitionDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [batches, setBatches] = useState(initialBatches);

  // Professional welcome and summary section
  const WelcomeSection = () => (
    <div
      style={{
        background: "linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)",
        color: "white",
        borderRadius: "16px",
        padding: "32px 32px 24px 32px",
        marginBottom: "32px",
        boxShadow: "0 6px 24px rgba(14,165,233,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            margin: 0,
          }}
        >
          Welcome back, Tutor!
        </h1>
        <p
          style={{
            fontSize: 18,
            margin: "10px 0 0 0",
            opacity: 0.95,
          }}
        >
          Manage your tuition, batches, and students all in one place.
          <br />
          <span style={{ fontWeight: 500 }}>
            Empower learning. Inspire growth.
          </span>
        </p>
      </div>
      <img
        src="https://img.freepik.com/free-vector/online-tutor-concept-illustration_114360-7476.jpg?w=400"
        alt="Dashboard Illustration"
        style={{
          height: 110,
          borderRadius: 12,
          marginLeft: 24,
        }}
      />
    </div>
  );

  // Enhanced summary cards for dashboard
  const DashboardSummary = () => {
    const totalStudents = batches.reduce(
      (sum, batch) => sum + batch.students,
      0
    );
    return (
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#0ea5e9",
              fontWeight: 600,
            }}
          >
            Total Batches
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: "8px 0",
            }}
          >
            {batches.length}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#0ea5e9",
              fontWeight: 600,
            }}
          >
            Total Students
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: "8px 0",
            }}
          >
            {totalStudents}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#0ea5e9",
              fontWeight: 600,
            }}
          >
            Active Notifications
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: "8px 0",
            }}
          >
            3
          </div>
        </div>
      </div>
    );
  };

  const renderView = useCallback(() => {
    switch (activeView) {
      case "dashboard":
        return (
          <>
            <WelcomeSection />
            <DashboardSummary />
            <Analytics batches={batches} />
          </>
        );
      case "details":
        return <TuitionDetails />;
      case "batches":
        return <BatchManagement batches={batches} setBatches={setBatches} />;
      case "notifications":
        return <Notifications />;
      case "reports":
        return <StudentReports />;
      default:
        return (
          <>
            <WelcomeSection />
            <DashboardSummary />
            <Analytics batches={batches} />
          </>
        );
    }
  }, [activeView, batches]);

  const NavButton = ({ view, label }) => (
    <button
      style={{
        ...styles.navButton,
        ...(activeView === view ? styles.navButtonActive : {}),
        fontWeight: 600,
        letterSpacing: 0.5,
        fontSize: 17,
      }}
      onClick={() => setActiveView(view)}
    >
      {label}
    </button>
  );

  return (
    <div style={styles.dashboardContainer}>
      <nav style={styles.sidebar}>
        <h1
          style={{
            ...styles.sidebarTitle,
            fontSize: 28,
            letterSpacing: 1,
          }}
        >
          Learnzy Tutor
        </h1>
        <NavButton view="dashboard" label="Dashboard" />
        <NavButton view="details" label="Tuition Details" />
        <NavButton view="batches" label="Manage Batches" />
        <NavButton view="notifications" label="Notifications" />
        <NavButton view="reports" label="Student Reports" />
      </nav>
      <main style={styles.mainContent}>{renderView()}</main>
    </div>
  );
};

export default TuitionDashboard;
