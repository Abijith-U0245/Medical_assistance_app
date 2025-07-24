// DrPatientInvite.jsx
import React from 'react';
import './DrPatientInvite.css';

const DrPatientInvite = ({ invitations, onAction }) => {
  const handleResponse = (inviteId, action) => {
    alert(`You ${action}ed invite ID: ${inviteId}`);
    onAction();
  };

  return (
    <div className="invite-section">
      {invitations.length === 0 ? (
        <p>No new invitations</p>
      ) : (
        <ul>
          {invitations.map((invite) => (
            <li key={invite._id}>
              {invite.patient?.name} - {invite.purpose}
              <button onClick={() => handleResponse(invite._id, 'accept')}>Accept</button>
              <button onClick={() => handleResponse(invite._id, 'reject')}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrPatientInvite;