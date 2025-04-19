import React, { useState } from 'react';

const Workshop = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workshop: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const workshops = [
    {
      id: 'ws1',
      title: 'Digital Marketing Fundamentals',
      date: 'June 15, 2023',
      instructor: 'Sarah Johnson',
      seats: '12/25 seats available'
    },
    {
      id: 'ws2',
      title: 'Financial Planning Workshop',
      date: 'June 22, 2023',
      instructor: 'Michael Chen',
      seats: '8/20 seats available'
    },
    {
      id: 'ws3',
      title: 'Leadership Skills Training',
      date: 'July 5, 2023',
      instructor: 'Priya Patel',
      seats: '15/30 seats available'
    },
    {
        id: 'ws1',
        title: 'Digital Marketing Fundamentals',
        date: 'June 15, 2023',
        instructor: 'Sarah Johnson',
        seats: '12/25 seats available'
      },
      {
        id: 'ws1',
        title: 'Digital Marketing Fundamentals',
        date: 'June 15, 2023',
        instructor: 'Sarah Johnson',
        seats: '12/25 seats available'
      }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          type: 'success',
          message: result.message || 'Registration successful!'
        });
        setFormData({ name: '', email: '', workshop: '' });
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setNotification({
          type: 'error',
          message: result.error || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Network error. Please check your connection.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Upcoming Workshops
          </h1>
          <p className="text-lg text-blue-600 max-w-3xl mx-auto">
            Join our expert-led workshops to enhance your skills
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workshops.map((workshop) => (
            <div 
              key={workshop.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {workshop.title}
                </h3>
                <div className="space-y-1 text-blue-600 mb-4">
                  <p><span className="font-medium">Date:</span> {workshop.date}</p>
                  <p><span className="font-medium">Instructor:</span> {workshop.instructor}</p>
                  <p><span className="font-medium">Seats:</span> {workshop.seats}</p>
                </div>
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, workshop: workshop.title }));
                    setShowForm(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">
                  Register for Workshop
                </h2>
                <button 
                  onClick={() => {
                    setShowForm(false);
                    setNotification(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              {notification ? (
                <div className={`p-4 rounded-lg mb-4 ${
                  notification.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {notification.message}
                  {notification.type === 'success' && (
                    <button
                      onClick={() => setShowForm(false)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                      Close
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="workshop" className="block text-sm font-medium text-blue-700 mb-1">
                      Workshop *
                    </label>
                    <input
                      type="text"
                      id="workshop"
                      name="workshop"
                      value={formData.workshop}
                      readOnly
                      className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-100"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block animate-spin mr-2">↻</span>
                        Processing...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Workshop;