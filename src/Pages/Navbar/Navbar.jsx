import { useState } from 'react'
import './navbar.css'
import hiddenPhoto from '../../assets/no-profile-picture-icon.webp'

export default function Navbar({ userInformations }) {
    const userName = userInformations?.name?.trim() || 'Minha conta'
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                    <button
                        type="button"
                        className="navbar-menu-toggle"
                        aria-label={isMenuOpen ? 'Fechar menu da conta' : 'Abrir menu da conta'}
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-account-menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            {isMenuOpen ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <div
                        id="navbar-account-menu"
                        className="navbar-account-menu"
                        role="region"
                        aria-label="Informações da conta"
                        hidden={!isMenuOpen}
                    >
                        <div className="navbar-account-details">
                            <span className="navbar-account-label">Conta Dairus</span>
                            <strong>{userName}</strong>
                            {userInformations?.email && (
                                <span className="navbar-account-email">{userInformations.email}</span>
                            )}
                        </div>
                        <div className="navbar-account-status">
                            <span className="navbar-status-dot" aria-hidden="true" />
                            Sessão ativa
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
