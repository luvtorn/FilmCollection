export interface IFilmResponse {
  page: number
  results: IFilm[]
  total_pages: number
}

export interface IFilm {
  id: number
  backdrop_path: string
  title: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
}

export interface IGenres {
  genres: Genre[]
}

interface Genre {
  id: number
  name: string
}
