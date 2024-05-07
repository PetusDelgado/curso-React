import './App.css'
export function App() {
  
    return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img 
        className='tw-followCard-avatar'
        src="https://unavatar.io/petusdelgado" alt="Avatar de petus" />
        <div>
          <strong>Petusdelgado</strong>
          <span>@PetusDelgado</span>
        </div>
      </header>

      <aside>
        <button>Seguir</button>
      </aside>
    </article>
  );
}
