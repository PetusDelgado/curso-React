import { useState } from 'react';
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard';


export function App() {

  return (
    <section className="App">
      <TwitterFollowCard username= 'PetusDelgado'>
        Petus Delgado
      </TwitterFollowCard>

      <TwitterFollowCard is initialIsFollowing username="midudev">
        Miguel Angel Duran
      </TwitterFollowCard>

    </section>

    

  )
}
