import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  ShieldAlert,
  Search,
  PlusCircle,
  MapPin,
  Clock,
  User,
  Activity,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  Radio,
  Ambulance,
  LifeBuoy
} from 'lucide-react';

interface Incident {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
}

interface MissingPerson {
  id: string;
  name: string;
  age: number;
  lastSeen: string;
  location: string;
  contact: string;
}

interface RescueRequest {
  id: string;
  name: string;
  location: string;
  peopleCount: number;
  urgency: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export function App() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'Flood Warning',
      location: 'Riverside Area, Sector 4',
      time: '10 mins ago',
      severity: 'critical',
      details: 'Water level rising rapidly near the main bridge.'
    },
    {
      id: '2',
      type: 'Power Outage',
      location: 'Downtown District',
      time: '25 mins ago',
      severity: 'medium',
      details: 'Grid failure affecting 5 blocks.'
    }
  ]);

  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([
    {
      id: '1',
      name: 'Ramesh Kumar',
      age: 42,
      lastSeen: '2 hours ago',
      location: 'Main Market Square',
      contact: '+91 98765 43210'
    }
  ]);

  const [rescueRequests, setRescueRequests] = useState<RescueRequest[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Flat 302, Green Avenue',
      peopleCount: 4,
      urgency: 'High - Water level 3ft',
      status: 'pending'
    }
  ]);

  // Modals state
  const [activeModal, setActiveModal] = useState<'incident' | 'missing' | 'rescue' | null>(null);

  // Form States
  const [incidentForm, setIncidentForm] = useState({ type: '', location: '', severity: 'medium', details: '' });
  const [missingForm, setMissingForm] = useState({ name: '', age: '', location: '', contact: '' });
  const [rescueForm, setRescueForm] = useState({ name: '', location: '', peopleCount: 1, urgency: '' });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handlers
  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentForm.type || !incidentForm.location) return;

    const newIncident: Incident = {
      id: Date.now().toString(),
      type: incidentForm.type,
      location: incidentForm.location,
      time: 'Just now',
      severity: incidentForm.severity as Incident['severity'],
      details: incidentForm.details || 'No additional details provided.'
    };

    setIncidents([newIncident, ...incidents]);
    setIncidentForm({ type: '', location: '', severity: 'medium', details: '' });
    setActiveModal(null);
  };

  const handleAddMissing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!missingForm.name || !missingForm.location) return;

    const newPerson: MissingPerson = {
      id: Date.now().toString(),
      name: missingForm.name,
      age: Number(missingForm.age) || 0,
      lastSeen: 'Just now',
      location: missingForm.location,
      contact: missingForm.contact || 'N/A'
    };

    setMissingPersons([newPerson, ...missingPersons]);
    setMissingForm({ name: '', age: '', location: '', contact: '' });
    setActiveModal(null);
  };

  const handleAddRescue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescueForm.name || !rescueForm.location) return;

    const newRescue: RescueRequest = {
      id: Date.now().toString(),
      name: rescueForm.name,
      location: rescueForm.location,
      peopleCount: Number(rescueForm.peopleCount) || 1,
      urgency: rescueForm.urgency || 'Normal',
      status: 'pending'
    };

    setRescueRequests([newRescue, ...rescueRequests]);
    setRescueForm({ name: '', location: '', peopleCount: 1, urgency: '' });
    setActiveModal(null);
  };

  const markRescueCompleted = (id: string) => {
    setRescueRequests(
      rescueRequests.map((req) => (req.id === id ? { ...req, status: 'completed' } : req))
    );
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">
          <div className="logo">
            <ShieldAlert size={26} />
          </div>
          <div>
            <h2>RescuNet</h2>
            <span>Disaster Response Network</span>
          </div>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#incidents">Incidents</a>
          <a href="#missing">Missing Persons</a>
          <a href="#rescue">Rescue Requests</a>
          <a href="#contacts">Emergency Contacts</a>
        </div>

        <button className="emergency-btn" onClick={() => setActiveModal('rescue')}>
          <Ambulance size={18} /> Request SOS Rescue
        </button>

        <button className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <main>
        {/* HERO BANNER */}
        <div className="hero">
          <div>
            <div className="welcome">CRITICAL EMERGENCY SYSTEM</div>
            <h1>
              Coordinated Emergency <span>Response Portal</span>
            </h1>
            <p className="hero-text">
              Real-time disaster management, incident reporting, and SOS rescue coordination for citizens and response teams.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => setActiveModal('incident')}>
                <PlusCircle size={18} /> Report Incident
              </button>
              <button className="secondary-btn" onClick={() => setActiveModal('missing')}>
                <Search size={18} /> Report Missing Person
              </button>
            </div>
          </div>
          <Radio size={160} className="hero-icon" />
        </div>

        {/* SOS BANNER */}
        <div className="emergency-alert">
          <div className="alert-icon">
            <AlertTriangle size={22} />
          </div>
          <div>
            <strong>Emergency Hotline Active</strong>
            <p>If you require immediate high-priority life support, contact regional helpline directly.</p>
          </div>
          <a href="tel:112" className="alert-link-btn">
            Call 112 <ChevronRight size={16} />
          </a>
        </div>

        {/* METRICS */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon danger">
              <Activity size={24} />
            </div>
            <div>
              <h2>{incidents.length}</h2>
              <p>Active Incidents</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              <User size={24} />
            </div>
            <div>
              <h2>{missingPersons.length}</h2>
              <p>Missing Reports</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h2>{rescueRequests.filter((r) => r.status === 'pending').length}</h2>
              <p>Pending Rescues</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon info">
              <CheckCircle size={24} />
            </div>
            <div>
              <h2>{rescueRequests.filter((r) => r.status === 'completed').length}</h2>
              <p>Completed Rescues</p>
            </div>
          </div>
        </div>

        {/* GRID CONTENT */}
        <div className="content-grid">
          {/* INCIDENTS PANEL */}
          <div className="panel" id="incidents">
            <div className="panel-header">
              <div>
                <h2>Recent Incident Reports</h2>
                <p>Live verified feeds from nearby zones</p>
              </div>
              <button className="view-btn" onClick={() => setActiveModal('incident')}>
                + Add <ChevronRight size={14} />
              </button>
            </div>

            {incidents.length === 0 ? (
              <p className="empty-message">No incidents reported recently.</p>
            ) : (
              incidents.map((inc) => (
                <div key={inc.id} className="list-item">
                  <div className="list-icon danger">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="item-info">
                    <h3>{inc.type}</h3>
                    <p>
                      <MapPin size={12} /> {inc.location}
                    </p>
                    <span className="item-details">{inc.details}</span>
                  </div>
                  <div className="item-status">
                    <span className={`severity ${inc.severity}`}>{inc.severity.toUpperCase()}</span>
                    <small>
                      <Clock size={10} style={{ display: 'inline', marginRight: 2 }} />
                      {inc.time}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* MISSING PERSONS PANEL */}
          <div className="panel" id="missing">
            <div className="panel-header">
              <div>
                <h2>Missing Persons Directory</h2>
                <p>Help locate missing family and friends</p>
              </div>
              <button className="view-btn" onClick={() => setActiveModal('missing')}>
                + Add <ChevronRight size={14} />
              </button>
            </div>

            {missingPersons.length === 0 ? (
              <p className="empty-message">No missing person reports active.</p>
            ) : (
              missingPersons.map((p) => (
                <div key={p.id} className="list-item-wrapper">
                  <div className="list-item">
                    <div className="person-avatar">{p.name.charAt(0)}</div>
                    <div className="item-info">
                      <h3>
                        {p.name} ({p.age} yrs)
                      </h3>
                      <p>
                        <MapPin size={12} /> Last seen: {p.location}
                      </p>
                      <span className="item-details">Contact: {p.contact}</span>
                    </div>
                    <div className="item-status">
                      <span className="missing-status">MISSING</span>
                      <small>{p.lastSeen}</small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RESCUE REQUESTS SECTION */}
        <div className="rescue-section" id="rescue">
          <div>
            <span className="section-label">LIVE QUEUE</span>
            <h2>Active SOS Rescue Requests</h2>
            <p>Direct priority queue for rescue operations and emergency teams.</p>
          </div>
          <button className="primary-btn" onClick={() => setActiveModal('rescue')}>
            <PlusCircle size={18} /> Request SOS Help
          </button>
        </div>

        <div className="panel rescue-list">
          {rescueRequests.length === 0 ? (
            <p className="empty-message">No rescue requests submitted yet.</p>
          ) : (
            rescueRequests.map((req) => (
              <div key={req.id} className="list-item">
                <div className="list-icon danger">
                  <LifeBuoy size={20} />
                </div>
                <div className="item-info">
                  <h3>
                    {req.name} ({req.peopleCount} People)
                  </h3>
                  <p>
                    <MapPin size={12} /> {req.location}
                  </p>
                  <span className="item-details">Urgency: {req.urgency}</span>
                </div>
                <div>
                  {req.status === 'pending' ? (
                    <button className="complete-btn" onClick={() => markRescueCompleted(req.id)}>
                      <CheckCircle size={14} /> Mark Rescued
                    </button>
                  ) : (
                    <span className="severity low">RESCUED</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* EMERGENCY CONTACTS */}
        <div className="contacts" id="contacts">
          <div className="section-title">
            <h2>Helpline Directory</h2>
            <p>Direct emergency contact channels</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={20} />
              </div>
              <div>
                <h3>National Emergency</h3>
                <strong>112</strong>
              </div>
              <a href="tel:112" className="call-btn">
                Call
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Ambulance size={20} />
              </div>
              <div>
                <h3>Medical Ambulance</h3>
                <strong>108</strong>
              </div>
              <a href="tel:108" className="call-btn">
                Call
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3>Disaster Helpline</h3>
                <strong>1070</strong>
              </div>
              <a href="tel:1070" className="call-btn">
                Call
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <LifeBuoy size={20} />
              </div>
              <div>
                <h3>Fire & Rescue</h3>
                <strong>101</strong>
              </div>
              <a href="tel:101" className="call-btn">
                Call
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <div>
          <h3>RescuNet Emergency System</h3>
          <p>Built for rapid disaster communication & rescue coordination.</p>
        </div>
        <p>&copy; {new Date().getFullYear()} RescuNet Portal. All rights reserved.</p>
      </footer>

      {/* MODAL: REPORT INCIDENT */}
      {activeModal === 'incident' && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Report New Incident</h2>
                <p>Provide details about the hazard or incident</p>
              </div>
              <button className="close-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddIncident}>
              <div className="form-group">
                <label>Incident Type / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Flooding, Fire Hazard, Bridge Damage"
                  value={incidentForm.type}
                  onChange={(e) => setIncidentForm({ ...incidentForm, type: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Street, Landmark, City"
                    value={incidentForm.location}
                    onChange={(e) => setIncidentForm({ ...incidentForm, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Severity Level</label>
                  <select
                    value={incidentForm.severity}
                    onChange={(e) => setIncidentForm({ ...incidentForm, severity: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description / Additional Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe the current situation..."
                  value={incidentForm.details}
                  onChange={(e) => setIncidentForm({ ...incidentForm, details: e.target.value })}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REPORT MISSING */}
      {activeModal === 'missing' && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Report Missing Person</h2>
                <p>Enter details to post a missing person alert</p>
              </div>
              <button className="close-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddMissing}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Person's Name"
                    value={missingForm.name}
                    onChange={(e) => setMissingForm({ ...missingForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={missingForm.age}
                    onChange={(e) => setMissingForm({ ...missingForm, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Last Known Location</label>
                <input
                  type="text"
                  placeholder="Area / Landmark"
                  value={missingForm.location}
                  onChange={(e) => setMissingForm({ ...missingForm, location: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 00000 00000"
                  value={missingForm.contact}
                  onChange={(e) => setMissingForm({ ...missingForm, contact: e.target.value })}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="secondary-btn">
                  Submit Missing Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SOS RESCUE */}
      {activeModal === 'rescue' && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Request Emergency SOS Rescue</h2>
                <p>Submit immediate request for team dispatch</p>
              </div>
              <button className="close-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddRescue}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Contact Name"
                    value={rescueForm.name}
                    onChange={(e) => setRescueForm({ ...rescueForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Number of People Trapped</label>
                  <input
                    type="number"
                    min="1"
                    value={rescueForm.peopleCount}
                    onChange={(e) => setRescueForm({ ...rescueForm, peopleCount: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Exact Location / Address</label>
                <input
                  type="text"
                  placeholder="Full address / landmark details"
                  value={rescueForm.location}
                  onChange={(e) => setRescueForm({ ...rescueForm, location: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Condition / Urgency</label>
                <input
                  type="text"
                  placeholder="e.g. Water entering home, Elderly present"
                  value={rescueForm.urgency}
                  onChange={(e) => setRescueForm({ ...rescueForm, urgency: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Send SOS Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}