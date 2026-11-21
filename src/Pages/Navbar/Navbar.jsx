import { useState } from "react";
import "./navbar.css";
import hiddenPhoto from "../../assets/no-profile-picture-icon.webp";

export default function Navbar({ userInformations, setSection }) {
  const userName = userInformations?.name?.trim() || "Minha conta";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="Navbar">
      <div className="navbar-content">
        <div className="navbar-brand" aria-label="Dairus">
          <span className="navbar-brand-mark" aria-hidden="true">
            D
          </span>
          <span className="navbar-brand-name">Dairus</span>
        </div>

        <div className="navbar-profile">
          <div className="navbar-profile-copy">
            <span className="navbar-profile-label">Bem-vindo</span>
            <span className="navbar-profile-name">
              {userName.split(" ").slice(0, 2).join(" ").substring(0, 15)}
            </span>
          </div>
          <img
            src={userInformations?.image_url || hiddenPhoto}
            alt="photo user"
            loading="lazy"
            onClick={() => {
              setSection("Profile");
            }}
            className="navbar-avatar"
          />
          <button
            type="button"
            className="navbar-menu-toggle"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="navbar-navigation-menu"
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
          <nav
            id="navbar-navigation-menu"
            className="navbar-navigation-menu"
            aria-label="Navegação principal"
            hidden={!isMenuOpen}
          >
            <a
              onClick={() => {
                setIsMenuOpen(false);
                setSection("Home");
              }}
            >
              <span>Início</span>
              <span className="navbar-navigation-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              onClick={() => {
                setIsMenuOpen(false);
                setSection("CreatePost");
              }}
            >
              <span>Criar post</span>
              <span className="navbar-navigation-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              onClick={() => {
                setIsMenuOpen(false);
                setSection("Profile");
              }}
            >
              <span>Perfil</span>
              <span className="navbar-navigation-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
