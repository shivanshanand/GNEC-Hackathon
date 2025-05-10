import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserReview from "../components/UserReview";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Incidents Reported",
        data: [45, 70, 100, 150, 175, 200, 250],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
      {
        label: "Resolved Cases",
        data: [30, 50, 75, 120, 150, 180, 230],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const users = [
    {
      name: "Emily R.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      testimonial:
        "SafeSpace has been an invaluable resource in helping me report and get support for an issue I faced. The platform made me feel heard and safe.",
    },
    {
      name: "John P.",
      img: "https://randomuser.me/api/portraits/men/75.jpg",
      testimonial:
        "I was able to report an incident anonymously and receive immediate resources. The whole experience was empowering!",
    },
    {
      name: "Sarah L.",
      img: "https://randomuser.me/api/portraits/women/34.jpg",
      testimonial:
        "SafeSpace made me feel heard and supported in a very difficult time. The platform gave me the confidence to speak up.",
    },
    {
      name: "Mark H.",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
      testimonial:
        "The anonymous reporting process was incredibly easy to use. I felt safe and confident knowing my information was protected.",
    },
    {
      name: "Alicia W.",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
      testimonial:
        "I had the courage to report my issue thanks to the reassuring resources SafeSpace provides. It helped me feel like I had support.",
    },
    {
      name: "Daniel K.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial:
        "I appreciate the safety and confidentiality of this platform. It gave me a voice when I needed it most.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to SafeSpace
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            SafeSpace provides a secure and trusted platform for reporting
            incidents of harassment, discrimination, and other safety concerns.
            Empower your voice and take action today!
          </p>
          <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
            <Link
              to="/submit-report"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Report an Incident
            </Link>
            <Link
              to="/resources"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-indigo-700 transition"
            >
              Access Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section with Chart */}
      <section className="py-24 bg-white text-center px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-700 mb-12">
            Some Stats
          </h2>
          <div className="flex justify-center">
            <div className="w-full sm:w-11/12 md:w-8/12 lg:w-6/12">
              <Line
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      enabled: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="py-24 bg-white text-center px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-700 mb-12">
            What Our Users Are Saying
          </h2>
          <div className="flex flex-wrap justify-center gap-6 py-8">
            {users.map((user, index) => (
              <UserReview
                key={index}
                img={user.img}
                name={user.name}
                testimonial={user.testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12 text-center px-4 sm:px-8">
        <p>&copy; 2025 SafeSpace. All Rights Reserved.</p>
        <p className="mt-2 text-sm sm:text-base">
          Designed to ensure safety and empower voices. All data is handled
          securely and with care.
        </p>
      </footer>
    </div>
  );
};

export default Home;
