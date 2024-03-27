import { useEffect, useState } from "react";
import "./MainPage.css";
import "../../index.css";
import { Carousel } from "antd";
import { filmsService } from "../../services/film.service";

function MainPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData("mainPage");
        setFilms(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNewFilms();
  }, []);

  return (
    <div className="main-page container">
      <Carousel dotPosition="bottom" focusOnSelect>
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
