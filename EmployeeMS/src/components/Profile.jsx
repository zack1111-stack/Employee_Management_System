import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    birth_date: "",
    email: "",
    phone: "",
    location: "",
  });

  // Load profile initially
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/profile/get_profile?id=1');
      if (res.data.Status && res.data.Data) {
        console.log('📦 Profile loaded:', res.data.Data);
        setFormData(res.data.Data);
      } else {
        console.warn('⚠️ Failed to load profile:', res.data);
      }
    } catch (err) {
      console.error('❌ Error loading profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`📥 Input changed: ${name} = ${value}`);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 1,
      ...formData,
    };

    console.log('🔧 Submitting profile data:', payload);

    try {
      const res = await axios.post('http://localhost:3000/profile/update_profile', payload);
      console.log('✅ Server response:', res.data);

      if (res.data.Status) {
        alert('✅ Profile saved successfully');
        fetchProfile(); // Refresh UI with saved data
      } else {
        alert('⚠️ Failed to save profile');
      }
    } catch (err) {
      console.error('❌ Error during profile submission:', err);
      alert('❌ Something went wrong. Check console.');
    }
  };

  return (
    <div className="profile-container" style={{ display: 'flex', padding: '20px', minHeight: '100vh' }}>
      {/* Profile Summary Card */}
      <div className="profile-card" style={{ width: '25%', textAlign: 'center', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <img src="/uploads/profile.jpg" alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        <h3>{formData.email || "admin@example.com"}</h3>
        <p>{formData.role || "admin"}</p>
        <div style={{ textAlign: 'left', paddingLeft: '20px', marginTop: '30px', lineHeight: '2em' }}>
          <p>Opportunities applied: <span style={{ color: 'orange' }}>32</span></p>
          <p>Opportunities won: <span style={{ color: 'green' }}>26</span></p>
          <p>Current opportunities: <span style={{ color: 'black' }}>6</span></p>
        </div>
        <button style={{ marginTop: '20px', width: '70%' }}>View Profile</button>
        <button style={{ background: 'green', color: 'white', width: '70%' }}>Complete Profile</button>
      </div>

      {/* Profile Form */}
      <div className="profile-form" style={{ flex: 1, paddingLeft: '40px', paddingRight: '40px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
            <input type="text" name="first_name" placeholder="First Name *" value={formData.first_name} onChange={handleChange} style={{ flex: 1 }} />
            <input type="text" name="last_name" placeholder="Last Name *" value={formData.last_name} onChange={handleChange} style={{ flex: 1 }} />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
            <input type="text" name="role" placeholder="I am *" value={formData.role} onChange={handleChange} style={{ flex: 1 }} />
            <input type="date" name="birth_date" placeholder="Birth Date *" value={formData.birth_date} onChange={handleChange} style={{ flex: 1 }} />
          </div>

          <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }} />
          <input type="text" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }} />
          <input type="text" name="location" placeholder="Where You Live" value={formData.location} onChange={handleChange} style={{ width: '100%', marginBottom: '10px' }} />

          <button type="submit" style={{ marginTop: '10px' }}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
