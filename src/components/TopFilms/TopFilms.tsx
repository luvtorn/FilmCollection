import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { Spin, Input, Pagination } from 'antd'
import FilmCard from '../FilmCard/FilmCard.tsx'
import { filmsService } from '../../services/film.service.ts'
import './TopFilms.css'
import { useSearchParams } from 'react-router-dom'
import React, { FC, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const TopFilms: FC = () => {
  const queryClient = useQueryClient()

  const [searchParams, setSearchParams] = useSearchParams()
  const filterFilm = searchParams.get('find') || ''
  const pageQuery = searchParams.get('topFilmsPage') || '1'

  const { isLoading, data } = useQuery({
    queryKey: ['topFilms', filterFilm, pageQuery],
    queryFn: () => filmsService.getFilmsByKeyword(filterFilm, +pageQuery),
    select: (data) => data,
    enabled: filterFilm !== '',
  })

  console.log(data)

  const handleChangePage = (newPage: number) => {
    setSearchParams({ find: filterFilm, topFilmsPage: newPage.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: ['topFilms', filterFilm, pageQuery],
      })
    }

    fetchData()
  }, [pageQuery, filterFilm])

  return (
    <div className="top-films">
      <Input
        className="find-film-input"
        placeholder="Find your film"
        value={filterFilm}
        onChange={(e) => setSearchParams({ find: e.target.value })}
      />
      <ul className="list">
        {!isLoading && data !== undefined ? (
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
          <div className="null">
            <h2 style={{ textAlign: 'center' }}>Write your keyword</h2>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 36,
                  }}
                  spin
                />
              }
            />
          </div>
        )}
      </ul>
      {data && data.total_pages > 1 ? (
        <Pagination
          className="pagination"
          onChange={handleChangePage}
          current={+pageQuery}
          total={data?.total_pages}
          showSizeChanger={false}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default TopFilms
