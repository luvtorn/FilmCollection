import { useQuery } from '@tanstack/react-query'
import React, { FC } from 'react'
import { filmsService } from '../../services/film.service.ts'

const Trailer = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ['trailer', id],
    queryFn: () => filmsService.getTrailer(id),
    select: (data) => data.results.filter((elem) => elem.type === 'Trailer'),
  })

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <iframe
          width={'80%'}
          height={'60%'}
          src={`https://www.youtube.com/embed/${data?.[0].key}`}
        ></iframe>
      )}
    </>
  )
}

export default Trailer
