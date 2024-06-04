import { useQuery } from '@tanstack/react-query'
import { Spin, Input } from 'antd'
import FilmCard from '../FilmCard/FilmCard.tsx'
import { filmsService } from '../../services/film.service.ts'
import './TopFilms.css'
import { useSearchParams } from 'react-router-dom'
import React, { FC } from 'react'

const TopFilms: FC = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['topFilms'],
    queryFn: () => filmsService.getTopFilms(),
    select: (data) => data,
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const filterFilm = searchParams.get('find') || ''

  return (
    <div className="top-films">
      <Input
        className="find-film-input"
        placeholder="Find your film"
        value={filterFilm}
        onChange={(e) => setSearchParams({ find: e.target.value })}
      />
      <ul className="list">
        {!isLoading ? (
          data?.results
            .filter((film) =>
              film.title.toLowerCase().includes(filterFilm.toLowerCase()),
            )
            .map((film) => {
              return (
                <li className="card-li" key={film.id}>
                  <FilmCard filmData={film} />
                </li>
              )
            })
        ) : (
          <Spin style={{ margin: '0 auto' }} tip="Loading" size="large" />
        )}
      </ul>
    </div>
  )
}

export default TopFilms
