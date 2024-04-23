import './MainPage.css'
import '../../index.css'
import { Carousel } from 'antd'
import { filmsService } from '../../services/film.service'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'

function MainPage() {
  const { isLoading, data } = useQuery({
    queryKey: ['films'],
    queryFn: () => filmsService.getData('mainPage'),
    select: (data) => data,
  })

  return (
    <div className="main-page">
      {isLoading ? (
        <h1 style={{ color: 'white' }}>Loading...</h1>
      ) : (
        <Carousel dotPosition="bottom" focusOnSelect>
          {data.data.results?.map((film) => {
            return (
              <div className="carousel-item" key={film.id}>
                <h3>{film.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                  alt=""
                />
              </div>
            )
          })}
        </Carousel>
      )}
    </div>
  )
}

export default memo(MainPage)
