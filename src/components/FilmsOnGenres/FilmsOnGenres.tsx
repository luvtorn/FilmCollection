import { FC, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import FilmCard from '../FilmCard/FilmCard'
import { filmsService } from '../../services/film.service'
import { Spin, Pagination } from 'antd'
import './FilmsOnGenres.css'
import { useParams, useSearchParams } from 'react-router-dom'
import React from 'react'
import { IResult } from '../../types'

const FilmsOnGenres: FC = () => {
  const queryClient = useQueryClient()

  const { id } = useParams()

  console.log(id)

  const [searchParams, setSearchParams] = useSearchParams()

  const pageQuery = searchParams.get('page') || '1'

  const { isLoading, data } = useQuery({
    queryKey: ['filmsByGenre', pageQuery, id],
    queryFn: () => filmsService.getFilmsByGenre(id ?? '', +pageQuery),
    select: (data) => data,
  })

  console.log(data)

  //какого хуя блять ебучая хуйня антдизайн в рот ебал почему показывает неправильное кол-во страниц

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: ['filmsByGenre', pageQuery, id],
      })
    }

    fetchData()
  }, [pageQuery, id])

  const handleChangePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="grid-container">
      <ul className="list">
        {!isLoading ? (
          data?.results.map((film: IResult) => {
            return (
              <li key={film.id} className="card-li">
                <FilmCard filmData={film} page={pageQuery} />
              </li>
            )
          })
        ) : (
          <Spin style={{ margin: '0 auto' }} tip="Loading" size="large" />
        )}
      </ul>
      <Pagination
        className="pagination"
        onChange={handleChangePage}
        current={+pageQuery}
        total={data?.total_pages}
        showSizeChanger={false}
      />
    </div>
  )
}

export default FilmsOnGenres
