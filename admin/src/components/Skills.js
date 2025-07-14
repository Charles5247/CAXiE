// Skills.js - Skills section of the portfolio
// Displays categorized skills and technologies

import React from 'react';

const Skills = () => {
  // Example skill categories and items (now with percentage bars)
  const skillCategories = [
    {
      title: 'Web Development',
      icon: (
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" /><circle cx="12" cy="7" r="4" /></svg>
      ),
      skills: [
        { name: 'MERN', percent: 90 },
        { name: 'Next.js', percent: 80 },
        { name: 'Tailwind CSS', percent: 85 },
        { name: 'WordPress', percent: 70 },
      ],
    },
    {
      title: 'Data Analytics',
      icon: (
        <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a2.5 2.5 0 01-2.45-2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3.55A2.5 2.5 0 0113 17h-2z" /></svg>
      ),
      skills: [
        { name: 'Python (Pandas, NumPy, Matplotlib, Seaborn)', percent: 90 },
        { name: 'Jupyter, PyCharm, Google Colab', percent: 85 },
        { name: 'Excel', percent: 80 },
        { name: 'Power BI', percent: 70 },
      ],
    },
    {
      title: 'Network & System Management',
      icon: (
        <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      ),
      skills: [
        { name: 'Git, GitHub, Asana, Slack', percent: 85 },
        { name: 'LAN/WiFi/Cloud, VLANs, DHCP, Firewalls', percent: 80 },
        { name: 'Linux, Windows Server, Packet Tracer', percent: 75 },
      ],
    },
    {
      title: 'Media & Design',
      icon: (
        <svg className="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
      ),
      skills: [
        { name: 'Photography, Adobe (Photoshop, Lightroom)', percent: 90 },
        { name: 'Canva, Video Editing', percent: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 px-4 bg-white">
      {/* Section heading */}
      <h2 className="text-3xl font-bold text-purple-900 mb-8">Skills</h2>
      {/* Skill categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-purple-50 rounded-2xl shadow p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col gap-2">
            {/* Category icon and title */}
            <div className="flex items-center gap-3 mb-2">
              {category.icon}
              <h3 className="text-xl font-semibold text-purple-800">{category.title}</h3>
            </div>
            {/* List of skills with percentage bars */}
            <ul className="space-y-4">
              {category.skills.map((skill, i) => (
                <li key={i} className="mb-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-purple-700 font-medium text-sm">{skill.name}</span>
                    <span className="text-xs text-gray-500 font-semibold">{skill.percent}%</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-700 h-2.5 rounded-full transition-all duration-700" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 