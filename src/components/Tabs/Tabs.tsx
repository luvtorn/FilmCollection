import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { filmsService } from '../../services/film.service.ts'

import './Tabs.css'
import React from 'react'

function Tabs() {
  const { data } = useQuery({
    queryKey: ['Genres'],
    queryFn: () => filmsService.getGenres(),
    select: (data) => data.genres,
  })

  return (
    <aside>
      <ul className="nav">
        <NavLink to={'/'}>
          <li>Main</li>
        </NavLink>
        <NavLink to={'/top20'}>
          <li>Top 20 films</li>
        </NavLink>
        <NavLink to={'/wishlist'}>
          <li>Wishlist</li>
        </NavLink>
        {data?.map((genre) => (
          <NavLink key={genre.id} to={`genres/${genre.id}`}>
            <li>{genre.name}</li>
          </NavLink>
        ))}
      </ul>
    </aside>
  )
}

export default Tabs
