import Select from 'react-select'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import './GenreSelect.css'
import { useEffect, useState } from 'react'
import { filmsService } from '../../services/film.service'

function GenreSelect({ setGenre }) {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('action')

  const queryClient = useQueryClient()

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData('Genres')
        setGenres(
          data.data.genres.map((genre) => ({
            id: genre.id,
            value: genre.name.toLowerCase(),
            label: genre.name,
          })),
        )
      } catch (error) {
        console.error('Error: ', error)
      }
    }

    fetchNewFilms()
  }, [])

  const getSelectedGenre = () => {
    return selectedGenre
      ? genres.find((genre) => genre.value === selectedGenre)
      : null
  }

  const onChange = (newGenre) => {
    queryClient.invalidateQueries("filmsByGenre")
    setSelectedGenre(newGenre.value)
    setGenre(newGenre.id)
  }

  return (
    <Select
      options={genres}
      value={getSelectedGenre()}
      onChange={onChange}
      className="custom-select"
    />
  )
}

export default GenreSelect
