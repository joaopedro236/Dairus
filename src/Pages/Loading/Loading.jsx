import "./loading.css";

export default function Loading() {
  return (
    <div className="loading-container fixed z-[999]">
      <div className="loading-content">
        <h2 className="text-center">Dairus</h2>
        <p className="text-center">Carregando...</p>
        <div className="loading-spinner mt-3"></div>
      </div>
    </div>
  );
}
