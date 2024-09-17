import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  console.log(user);

  return (
    isAuthenticated && (
      <article className="column">
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
          {Object.keys(user).map((objKey) => (
            <li key={objKey}>
              {objKey}: {user[objKey]}
            </li>
          ))}
        </ul>
      </article>
    )
  );
}

export default Profile;
