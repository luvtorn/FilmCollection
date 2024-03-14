import axios from "axios";

class FilmsService {
  #options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
    },
  };

  typeOfUrl = {
    mainPage:
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    topFilms:
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  };

  async getData(type, genre, page) {
    const url = genre
      ? `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`
      : this.typeOfUrl[type];
    const { data } = await axios.get(url, this.#options);
    return data;
  }
}

class WishListService {
  #options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
    },
  };

  async getData({ id }) {
    console.log(id);
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const data = await axios.get(url, this.#options);
    return data;
  }
}

export const filmsService = new FilmsService();
export const wishListService = new WishListService();
