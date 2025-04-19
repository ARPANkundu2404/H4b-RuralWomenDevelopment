import React, { useState, useEffect } from 'react';

const ActivityLog = () => {
  const [activeTab, setActiveTab] = useState('workshops');
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from backend and localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch workshops from backend
        const workshopsResponse = await fetch('http://localhost:5000/api/registrations');
        if (workshopsResponse.ok) {
          const workshopsData = await workshopsResponse.json();
          setRegisteredWorkshops(workshopsData);
        }
        
        // Load jobs from localStorage
        const savedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        setAppliedJobs(savedJobs);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to remove a workshop
  const removeWorkshop = async (id) => {
    try {
      // In a real app, you would call a DELETE endpoint on your backend
      // For now, we'll just filter it from the frontend state
      const updated = registeredWorkshops.filter(item => item.id !== id);
      setRegisteredWorkshops(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to remove a job application
  const removeJob = (id) => {
    const updated = appliedJobs.filter(item => item.id !== id);
    setAppliedJobs(updated);
    localStorage.setItem('appliedJobs', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p>Loading your activity log...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Tabs remain the same */}
        
        {/* Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === 'workshops' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                Upcoming Workshops ({registeredWorkshops.length})
              </h2>
              
              {registeredWorkshops.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">You haven't registered for any workshops yet.</p>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
                    onClick={() => window.location.href = '/workshop'}
                  >
                    Browse Workshops
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {registeredWorkshops.map((workshop) => (
                    <div key={workshop.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-xl font-semibold text-blue-800">{workshop.workshop}</h3>
                          <p className="text-gray-600">Registered on: {new Date(workshop.date).toLocaleDateString()}</p>
                          <p className="text-gray-600">Attendee: {workshop.name}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => removeWorkshop(workshop.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

     
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;