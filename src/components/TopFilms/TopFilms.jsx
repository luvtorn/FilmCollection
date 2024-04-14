import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spin, Input } from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import { filmsService } from '../../services/film.service'
import './TopFilms.css'

export default function TopFilms({ setId, setIsAddButton }) {
  const [filterFilm, setFilterFilm] = useState('')

  const { isLoading, data } = useQuery({
    queryKey: ['topFilms'],
    queryFn: () => filmsService.getData('topFilms'),
    select: (data) => data,
  })

  return (
    <div className="container">
      <div className="top-films">
        <Input
          className="find-film-input"
          placeholder="Find your film"
          value={filterFilm}
          onChange={(e) => setFilterFilm(e.target.value)}
        />
        <ul>
          {!isLoading ? (
            data.data.results
              .filter((film) =>
                film.title.toLowerCase().includes(filterFilm.toLowerCase()),
              )
              .map((film) => {
                return (
                  <li key={film.id}>
                    <FilmCard
                      filmData={film}
                      setWishFilmId={setId}
                      setIsAddButton={setIsAddButton}
                    />
                  </li>
                )
              })
          ) : (
            <Spin style={{ margin: '0 auto' }} tip="Loading" size="large" />
          )}
        </ul>
      </div>
    </div>
  )
}
