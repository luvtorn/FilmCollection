import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import FilmCard from '../FilmCard/FilmCard'
import { filmsService } from '../../services/film.service'
import { Spin, Pagination } from 'antd'
import './FilmsOnGenres.css'
import { useParams, useSearchParams } from 'react-router-dom'
import WishList from '../WishList/WishList'

function FilmsOnGenres() {
  const queryClient = useQueryClient()

  const { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const pageQuery = searchParams.get('page') || 1

  const { isLoading, data } = useQuery({
    queryKey: ['filmsByGenre', pageQuery],
    queryFn: () => filmsService.getData('', id, pageQuery),
    select: (data) => data,
  })

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries('filmsByGenre')
    }

    fetchData()
  }, [pageQuery, id])

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="grid-container">
      <WishList />
      <ul className="list">
        {!isLoading ? (
          data.data.results.map((film) => {
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
        current={pageQuery}
        total={data?.data.total_pages}
        showSizeChanger={false}
      />
    </div>
  )
}

export default FilmsOnGenres
