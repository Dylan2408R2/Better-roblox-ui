import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const games = {
  recommended: [
    { id: 1, placeId: 920587237, title: 'Adopt Me!', creator: 'DreamCraft', players: '350K', rating: '92%', image: 'https://via.placeholder.com/180x180.png/00A2FF/FFFFFF?text=Adopt+Me' },
    { id: 2, placeId: 4924922222, title: 'Brookhaven RP', creator: 'Wolfpaq', players: '420K', rating: '90%', image: 'https://via.placeholder.com/180x180.png/FF4081/FFFFFF?text=Brookhaven' },
    { id: 3, placeId: 191595229, title: 'Tower of Hell', creator: 'YXCeptional Studios', players: '120K', rating: '88%', image: 'https://via.placeholder.com/180x180.png/FDD835/000000?text=ToH' },
    { id: 4, placeId: 370731277, title: 'MeepCity', creator: 'alexnewtron', players: '80K', rating: '85%', image: 'https://via.placeholder.com/180x180.png/4CAF50/FFFFFF?text=MeepCity' },
     { id: 5, placeId: 4623386862, title: 'Piggy', creator: 'MiniToon', players: '75K', rating: '93%', image: 'https://via.placeholder.com/180x180.png/F44336/FFFFFF?text=Piggy' },
  ],
  popular: [
    { id: 6, placeId: 2753915549, title: 'Blox Fruits', creator: 'gamer robot inc.', players: '500K', rating: '94%', image: 'https://via.placeholder.com/180x180.png/9C27B0/FFFFFF?text=Blox+Fruits' },
    { id: 7, placeId: 6284583030, title: 'Pet Simulator X', creator: 'BIG Games Pets', players: '280K', rating: '91%', image: 'https://via.placeholder.com/180x180.png/FF9800/FFFFFF?text=Pet+Sim' },
    { id: 8, placeId: 142823291, title: 'Murder Mystery 2', creator: 'Nikilis', players: '150K', rating: '89%', image: 'https://via.placeholder.com/180x180.png/607D8B/FFFFFF?text=MM2' },
    { id: 9, placeId: 744235242, title: 'Royale High', creator: 'callmehbob', players: '95K', rating: '87%', image: 'https://via.placeholder.com/180x180.png/E91E63/FFFFFF?text=Royale+High' },
    { id: 10, placeId: 185655149, title: 'Welcome to Bloxburg', creator: 'Coeptus', players: '110K', rating: '95%', image: 'https://via.placeholder.com/180x180.png/8BC34A/FFFFFF?text=Bloxburg' },
  ]
};

const Sidebar = ({ profile, onSync }) => {
  const [isSyncFormOpen, setIsSyncFormOpen] = useState(false);
  const [syncInput, setSyncInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Open the sync form on initial load if no profile is synced
    if (!profile.username) {
      setIsSyncFormOpen(true);
    }
  }, []); // Run only once on mount

  const handleSyncSubmit = async (e) => {
    e.preventDefault();
    if (!syncInput.trim() || isLoading) return;
    setIsLoading(true);
    setError('');
    try {
      await onSync(syncInput);
      setIsSyncFormOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openSyncForm = () => {
    setSyncInput(profile.username);
    setError('');
    setIsSyncFormOpen(true);
  };

  const handleCancel = () => {
    setIsSyncFormOpen(false);
    setError('');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">R</h1>
      </div>
      <div className="profile">
        <div 
          className="profile-avatar" 
          style={{ 
            backgroundImage: profile.avatar ? `url(${profile.avatar})` : 'none',
            backgroundColor: profile.avatar ? 'transparent' : 'var(--surface-color)'
          }}
        >
          {!profile.avatar && <span className="material-icons">person_outline</span>}
        </div>
        <div className="profile-info">
          {isSyncFormOpen ? (
            <form onSubmit={handleSyncSubmit} className="sync-form">
              <div className="sync-input-wrapper">
                <input
                  type="text"
                  value={syncInput}
                  onChange={(e) => setSyncInput(e.target.value)}
                  placeholder="Tu usuario de Roblox"
                  className="sync-input"
                  disabled={isLoading}
                  autoFocus
                />
                <button type="submit" className="sync-button" disabled={isLoading || !syncInput.trim()}>
                  {isLoading ? <div className="spinner"></div> : <span className="material-icons">arrow_forward</span>}
                </button>
              </div>
              {error && <p className="sync-error">{error}</p>}
              {profile.username && <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>}
            </form>
          ) : (
            <>
              <div className="profile-username-wrapper" onClick={openSyncForm} title="Sync with Roblox">
                <h4>{profile.username}</h4>
                <span className="material-icons sync-icon">sync</span>
              </div>
              {profile.joinDate && (
                <p>
                    <span className="material-icons" style={{fontSize: '16px'}}>calendar_today</span>
                    <span>Se unió el {profile.joinDate}</span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <ul className="nav-menu">
        <li className="nav-item active">
          <a href="#"><span className="material-icons">explore</span> <span>Discover</span></a>
        </li>
        <li className="nav-item">
          <a href="#"><span className="material-icons">account_circle</span> <span>Avatar</span></a>
        </li>
        <li className="nav-item">
          <a href="#"><span className="material-icons">store</span> <span>Shop</span></a>
        </li>
        <li className="nav-item">
          <a href="#"><span className="material-icons">groups</span> <span>Friends</span></a>
        </li>
        <li className="nav-item">
          <a href="#"><span className="material-icons">email</span> <span>Messages</span></a>
        </li>
      </ul>
      <ul className="nav-menu">
          <li className="nav-item settings">
              <a href="#"><span className="material-icons">settings</span> <span>Settings</span></a>
          </li>
      </ul>
    </aside>
  )
};

const GameCard = ({ title, creator, players, image, placeId }) => {
    const gameUrl = `roblox://placeId=${placeId}`;

    return (
      <a href={gameUrl} className="game-card">
        <div className="game-card-thumbnail" style={{ backgroundImage: `url(${image})` }}>
            <div className="play-icon">
                <span className="material-icons">play_arrow</span>
            </div>
        </div>
        <div className="game-card-info">
          <h3>{title}</h3>
          <p>by {creator}</p>
          <div className="game-stats">
            <span className="material-icons">group</span>
            <span>{players}</span>
          </div>
        </div>
      </a>
    );
};

const GameCarousel = ({ title, gameList }) => (
    <section className="game-carousel">
        <div className="carousel-header">
            <h2>{title}</h2>
            <a href="#">See All</a>
        </div>
        <div className="game-grid">
            {gameList.map(game => <GameCard key={game.id} {...game} />)}
        </div>
    </section>
)

const MainContent = () => (
  <main className="main-content">
    <header>
      <div className="search-bar">
        <span className="material-icons">search</span>
        <input type="text" placeholder="Search for games..." />
      </div>
      <div className="header-actions">
          <button className="action-btn" aria-label="Notifications">
            <span className="material-icons">notifications</span>
          </button>
           <button className="action-btn" aria-label="Robux">
            <span className="material-icons">paid</span>
          </button>
      </div>
    </header>
    <GameCarousel title="Recommended For You" gameList={games.recommended} />
    <GameCarousel title="Most Popular" gameList={games.popular} />
  </main>
);

function App() {
  const [profile, setProfile] = useState({
    username: '',
    avatar: null,
    joinDate: '',
  });

  const handleSyncProfile = async (username) => {
    if (!username.trim()) throw new Error("Username is required.");

    const USERS_API = 'https://users.roproxy.com';
    const THUMBNAILS_API = 'https://thumbnails.roproxy.com';

    // Tutorial Step 1: Get User ID from username
    // Using GET /v1/users/search instead of POST /v1/usernames/users
    // This is more compatible with sandboxed environments like AI Studio.
    const userSearchRes = await fetch(`${USERS_API}/v1/users/search?keyword=${encodeURIComponent(username)}&limit=10`);
    
    if (!userSearchRes.ok) {
        throw new Error('Error searching for user.');
    }
    
    const userSearchData = await userSearchRes.json();
    if (!userSearchData.data || userSearchData.data.length === 0) {
      throw new Error(`User '${username}' not found.`);
    }

    // Find the exact match from the search results, as search can be inexact.
    const user = userSearchData.data.find(u => u.name.toLowerCase() === username.toLowerCase());

    if (!user) {
      throw new Error(`User '${username}' not found.`);
    }

    // Tutorial Step 2 & 3: Get Avatar and User Details (in parallel for performance)
    const [avatarRes, userInfoRes] = await Promise.all([
      fetch(`${THUMBNAILS_API}/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`),
      fetch(`${USERS_API}/v1/users/${user.id}`)
    ]);

    if (!avatarRes.ok) throw new Error('Error fetching avatar.');
    if (!userInfoRes.ok) throw new Error('Error fetching user details.');
    
    const avatarData = await avatarRes.json();
    const userInfoData = await userInfoRes.json();

    if (!avatarData.data || avatarData.data.length === 0 || !avatarData.data[0].imageUrl) {
      throw new Error('Could not load avatar for this user.');
    }
    const avatarUrl = avatarData.data[0].imageUrl;
    
    const joinDate = new Date(userInfoData.created).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // Tutorial Step 4: Display/store the info
    setProfile({ username: user.name, avatar: avatarUrl, joinDate: joinDate });
  };

  return (
    <>
      <Sidebar 
        profile={profile} 
        onSync={handleSyncProfile}
      />
      <MainContent />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);