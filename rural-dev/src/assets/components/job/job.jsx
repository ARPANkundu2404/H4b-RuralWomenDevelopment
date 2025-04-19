import React, { useState } from 'react';

const Job = () => {
  const [activeTab, setActiveTab] = useState('allJobs');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: ''
  });

  // Sample job data (frontend-only)
  const jobData = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechWomen Inc.',
      location: 'Remote',
      type: 'Full-time',
      description: 'React/TypeScript position with flexible hours',
      isRestarterFriendly: false,
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      id: 2,
      title: 'Marketing Specialist',
      company: 'SheLeads Marketing',
      location: 'New York',
      type: 'Part-time',
      description: 'Great for career returners - training provided',
      isRestarterFriendly: true,
      skills: ['Digital Marketing', 'Social Media']
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'WomenInTech Analytics',
      location: 'Chicago',
      type: 'Contract',
      description: 'Returnship program available',
      isRestarterFriendly: true,
      skills: ['Excel', 'SQL', 'Python']
    }
  ];

  const filteredJobs = activeTab === 'careerRestarters' 
    ? jobData.filter(job => job.isRestarterFriendly) 
    : jobData;

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application for ${selectedJob.title} submitted!\n`);
    setShowApplicationForm(false);
    setFormData({ name: '', email: '', resume: null, coverLetter: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className=" bg-[#1f375d] py-12 px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Opportunities for Women</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Find your next career move or restart your journey with women-friendly roles
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-blue-200 mb-8">
          <button
            onClick={() => setActiveTab('allJobs')}
            className={`px-6 py-3 font-medium ${activeTab === 'allJobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setActiveTab('careerRestarters')}
            className={`px-6 py-3 font-medium ${activeTab === 'careerRestarters' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            Career Restarters
          </button>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <article key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">{job.title}</h3>
                    <p className="text-blue-600">{job.company}</p>
                  </div>
                  {job.isRestarterFriendly && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Restarter Program
                    </span>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {job.location}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {job.type}
                  </p>
                </div>

                <p className="mt-3 text-gray-700">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Career Restarter Section */}
        <section className="mt-16 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Career Restarter Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Return-to-Work Programs</h3>
              <p className="text-gray-700">
                Specialized internships with training for women re-entering the workforce after a career break.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Flexible Work Options</h3>
              <p className="text-gray-700">
                Discover part-time, remote, and project-based opportunities that accommodate your schedule.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-800">
                Apply for {selectedJob?.title}
              </h2>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF) *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, resume: e.target.files[0]})}
                  
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
        
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;