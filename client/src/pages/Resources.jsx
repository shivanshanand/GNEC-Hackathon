import React from "react";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  return (
    <section className="min-h-screen py-24 px-4 sm:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 animate__animated animate__fadeIn">
          Access Resources for Support
        </h2>

        <p className="text-lg sm:text-xl mb-10 animate__animated animate__fadeIn animate__delay-1s max-w-3xl mx-auto">
          Safety is for <strong>everyone</strong> — regardless of gender,
          identity, or background. Below are valuable resources for those facing
          bullying, harassment, discrimination, or abuse of any kind.
        </p>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate__animated animate__fadeIn animate__delay-2s">
          {/* Card 1 */}
          <div className="bg-white text-left p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">
              National Helplines
            </h3>
            <ul className="space-y-3">
              {[
                {
                  text: "RAINN - Sexual Assault Hotline",
                  url: "https://www.rainn.org/",
                },
                {
                  text: "National Domestic Violence Hotline",
                  url: "https://www.thehotline.org/",
                },
                {
                  text: "988 Suicide & Crisis Lifeline",
                  url: "https://988lifeline.org/",
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-medium hover:text-blue-900 hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-left p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">
              Legal & Advocacy Help
            </h3>
            <ul className="space-y-3">
              {[
                {
                  text: "ACLU - Civil Liberties Advocacy",
                  url: "https://www.aclu.org/",
                },
                {
                  text: "National Center for Lesbian Rights",
                  url: "https://www.nclrights.org/",
                },
                {
                  text: "Equal Rights Advocates",
                  url: "https://www.equalrights.org/",
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-medium hover:text-blue-900 hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-left p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">
              Anti-Bullying & Safety Tools
            </h3>
            <ul className="space-y-3">
              {[
                {
                  text: "StopBullying.gov - Safety Resources",
                  url: "https://www.stopbullying.gov/",
                },
                {
                  text: "Psychology Today - Mental Health & Safety",
                  url: "https://www.psychologytoday.com/us/basics/safety",
                },
                {
                  text: "PACER's National Bullying Prevention Center",
                  url: "https://www.pacer.org/bullying/",
                },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-medium hover:text-blue-900 hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-block bg-white text-indigo-700 py-2 px-6 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPage;
