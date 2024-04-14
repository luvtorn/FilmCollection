import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FilmCard from '../FilmCard/FilmCard';
import { filmsService } from '../../services/film.service';
import { Spin, Pagination } from 'antd';

function FilmsOnGenres({ genre, setId, setIsAddButton }) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ['filmsByGenre', page, genre],
    queryFn: () => filmsService.getData('', genre, page),
    select: (data) => data,
  });

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries('filmsByGenre');
    };

    fetchData();
  }, [page, genre]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <ul>
        {!isLoading ? (
          data.data.results.map((film) => {
            return (
              <li key={film.id}>
                <FilmCard
                  filmData={film}
                  setWishFilmId={setId}
                  setIsAddButton={setIsAddButton}
                />
              </li>
            );
          })
        ) : (
          <Spin style={{ margin: '0 auto' }} tip="Loading" size="large" />
        )}
      </ul>
      <Pagination
        className="pagination"
        onChange={handleChangePage}
        current={page}
        total={data?.data.total_pages}
        showSizeChanger={false}
      />
    </div>
  );
}

export default FilmsOnGenres;
