import { useCallback, useEffect, useState } from "react";
import "./MainPage.css";
import { Carousel } from "antd";
import { filmsService } from "../../services/film.service";

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
//   },
// };

function MainPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData('mainPage');
        setFilms(data);
        console.log(data)
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();
  }, []);
  

  return (
    <div className="main-page">
      <Carousel dotPosition="bottom">
        {films.results?.map((film) => {
          return (
            <div className="carousel-item" key={film.id}>
              <h3>{film.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                alt=""
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default MainPage;
