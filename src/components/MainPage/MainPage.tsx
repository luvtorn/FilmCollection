import './MainPage.css'
import '../../index.css'
import { Carousel } from 'antd'
import { filmsService } from '../../services/film.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { IResult } from '../../types'

function MainPage() {
  const { isLoading, data } = useQuery({
    queryKey: ['films'],
    queryFn: () => filmsService.getMainPageFilms(),
    select: (data) => data.results,
  })

  return (
    <div className="main-page">
      {isLoading ? (
        <h1 style={{ color: 'white' }}>Loading...</h1>
      ) : (
        <Carousel dotPosition="bottom" focusOnSelect>
          {data?.map((film: IResult) => {
            return (
              <div className="carousel-item" key={film.id}>
                <h3>{film.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
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

export default MainPage
