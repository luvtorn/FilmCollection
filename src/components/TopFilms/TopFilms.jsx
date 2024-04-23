import { useQuery } from '@tanstack/react-query'
import { Spin, Input } from 'antd'
import FilmCard from '../FilmCard/FilmCard'
import { filmsService } from '../../services/film.service'
import './TopFilms.css'
import { useSearchParams } from 'react-router-dom'
import WishList from '../WishList/WishList'

export default function TopFilms({ setId, setIsAddButton }) {
  const { isLoading, data } = useQuery({
    queryKey: ['topFilms'],
    queryFn: () => filmsService.getData('topFilms'),
    select: (data) => data,
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const filterFilm = searchParams.get('find') || ''

  return (
    <div className="top-films">
      <div className="top-films-menu">
        <Input
          className="find-film-input"
          placeholder="Find your film"
          value={filterFilm}
          onChange={(e) => setSearchParams({ find: e.target.value })}
        />
        <WishList />
      </div>
      <ul className="list">
        {!isLoading ? (
          data.data.results
            .filter((film) =>
              film.title.toLowerCase().includes(filterFilm.toLowerCase()),
            )
            .map((film) => {
              return (
                <li className="card-li" key={film.id}>
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
  )
}
