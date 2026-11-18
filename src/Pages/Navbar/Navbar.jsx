import './navbar.css'
import hiddenPhoto from '../../assets/no-profile-picture-icon.webp'

export default function Navbar({ userInformations }) {
    const userName = userInformations?.name?.trim() || 'Minha conta'

    return (
        <header className="Navbar">
            <div className="navbar-content">
                <div className="navbar-brand" aria-label="Dairus">
                    <span className="navbar-brand-mark" aria-hidden="true">D</span>
                    <span className="navbar-brand-name">Dairus</span>
                </div>

                <div className="navbar-profile">
                    <div className="navbar-profile-copy">
                        <span className="navbar-profile-label">Bem-vindo</span>
                        <span className="navbar-profile-name">{userName}</span>
                    </div>
                    <img
                        src={userInformations?.image_url || hiddenPhoto}
                        alt=""
                        className="navbar-avatar"
                    />
                </div>
            </div>
        </header>
    )
}
