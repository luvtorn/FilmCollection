import axios from 'axios'
import { IFilm, IGenres, IResult } from '../types'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q',
  },
}

class FilmsService {
  async getFilmsByGenre(genre: string, page: number): Promise<IFilm> {
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`
    const { data } = await axios.get<IFilm>(url, options)
    return data
  }

  async getMainPageFilms(): Promise<IFilm> {
    const url =
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
    const { data } = await axios.get<IFilm>(url, options)
    return data
  }

  async getTopFilms(): Promise<IFilm> {
    const url =
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
    const { data } = await axios.get<IFilm>(url, options)
    return data
  }

  async getGenres(): Promise<IGenres> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list'
    const { data } = await axios.get<IGenres>(url, options)

    return data
  }

  async getFilmById(id: number): Promise<IResult> {
    if (!id) {
      throw new Error('Film ID must be provided')
    }

    const url = `https://api.themoviedb.org/3/movie/${id}`
    const { data } = await axios.get<IResult>(url, options)
    return data
  }

  async getTrailer(id: number) {
    if (id) {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos`
      const { data } = await axios.get(url, options)
      return data
    } else {
      return null
    }
  }
}

export const filmsService = new FilmsService()
