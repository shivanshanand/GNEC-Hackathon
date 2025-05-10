import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeSection, setActiveSection] = useState("viewReports");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_ALL_REPORTS);
        setReports(response.data);
      } catch (error) {
        toast.error("Error fetching reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    const confirmed = window.confirm(`Change status to "${newStatus}"?`);
    if (!confirmed) return;

    try {
      const update = import.meta.env.VITE_UPDATE_STATUS;
      await axios.put(`${update}/${reportId}`, {
        status: newStatus,
      });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, status: newStatus } : report
        )
      );
      toast.success("Status updated!");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const ReportModal = ({ report, onClose }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4">Report Details</h3>
        <p>
          <strong>Incident Type: </strong> {report.incidentType}
        </p>
        <p>
          <strong>Description: </strong> {report.description}
        </p>
        <p>
          <strong>Location: </strong> {report.location}
        </p>
        <p>
          <strong>Timestamp: </strong>{" "}
          {new Date(report.timestamp).toLocaleString()}
        </p>
        {report.evidenceUrl && (
          <p>
            <strong>Evidence: </strong>
            <a
              href={report.evidenceUrl}
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              View Evidence
            </a>
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-11 left-4 z-40 bg-gray-800 text-white p-1 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white min-h-screen p-4 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 h-full`}
      >
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Admin Dashboard
        </h2>
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => handleSidebarClick("viewReports")}
              className={`w-full text-left text-lg px-4 py-2 rounded-lg ${
                activeSection === "viewReports"
                  ? "bg-indigo-600 text-white"
                  : ""
              } hover:bg-indigo-600 hover:text-white`}
            >
              View Reports
            </button>
          </li>
          <li></li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          sidebarOpen ? "ml-0 md:ml-64" : "ml-0"
        }`}
      >
        {activeSection === "viewReports" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Back to Home
              </button>
            </div>

            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">
              View Reports
            </h2>

            {loading ? (
              <p className="text-center py-8">Loading reports...</p>
            ) : reports.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                No reports found.
              </p>
            ) : (
              <div className="overflow-x-scroll bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Report ID</th>
                      <th className="px-4 py-2 text-left">Incident Type</th>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Timestamp</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id} className="border-t">
                        <td className="px-4 py-2">{report._id}</td>
                        <td>
                          {report.incidentType}
                        </td>
                        <td className="px-4 py-2">{report.location}</td>
                        <td className="px-4 py-2">
                          {new Date(report.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          <select
                            value={report.status}
                            onChange={(e) =>
                              handleStatusUpdate(report._id, e.target.value)
                            }
                            className="p-2 rounded-md border border-gray-300"
                          >
                            <option value="active">Active</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleViewDetails(report)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Report Modal */}
        {selectedReport && (
          <ReportModal report={selectedReport} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
