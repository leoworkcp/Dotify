import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchBar.css";

const SearchBar = ({ authenticated, setAuthenticated }) => {
  const [use, setUse] = useState([]);
  const songs = useSelector((state) => state?.publicSong);

  //   console.log(songs);
  //   let test = [];
  let filter = [];
  const searchBar = () => {
    window.addEventListener("keyup", (e) => {
      let searchString = e.target.value.toLowerCase();
      console.log(searchString);
      if (!searchString.length || searchString.length < 3) {
      } else {
        filter = Object.values(songs).find((song) => {
          //   console.log(song);
          //   if (
          //     song?.name.toLowerCase().includes(searchString) ||
          //     song?.description.toLowerCase().includes(searchString) ||
          //     song?.artist.username.toLowerCase().includes(searchString) ||
          //     song?.category.toLowerCase().includes(searchString)
          //   ) {
          //     test.push(song?.name);
          //   }
          return (
            song?.name.toLowerCase().includes(searchString) ||
            song?.description.toLowerCase().includes(searchString) ||
            song?.artist.username.toLowerCase().includes(searchString) ||
            song?.category.toLowerCase().includes(searchString)
          );
        });
        // console.log(test);
        return filter !== undefined
          ? setUse(
              <>
                {
                  <div className="dropdown__search-bar" id="serverSearch">
                    {authenticated && (
                      <li id="searchText">
                        <NavLink
                          id="searchText-anchor"
                          className="popUp-search__anchor"
                          to={`/song/${filter.id}`}
                        >
                          {filter.name}
                        </NavLink>
                        <NavLink
                          id="searchText-anchor"
                          className="popUp-search__anchor"
                          to={`/profile/${filter.artist_id}`}
                        >
                          {filter.artist.username}
                        </NavLink>
                      </li>
                    )}
                    {!authenticated && (
                      <li id="searchText">
                        <NavLink
                          id="searchText-anchor"
                          className="popUp-search__anchor"
                          to={`/`}
                        >
                          {filter.name}
                        </NavLink>
                        <NavLink
                          id="searchText-anchor"
                          className="popUp-search__anchor"
                          to={`/`}
                        >
                          {filter.artist.username}
                        </NavLink>
                      </li>
                    )}
                  </div>
                }
              </>
            )
          : setUse(
              <>
                {
                  <div className="dropdown__search-bar" id="serverSearch">
                    <li id="searchText">
                      <NavLink
                        id="searchText-anchor"
                        className="popUp-search__anchor"
                        to={`/`}
                      >
                        {"No Result"}
                      </NavLink>
                      ...
                    </li>
                  </div>
                }
              </>
            );
      }
    });
  };

  document.getElementById("searchText-anchor") &&
    document
      .getElementById("searchText-anchor")
      .addEventListener("click", () => {
        setUse();
      });

  return (
    <div className="search-bar__container">
      <ul>{use}</ul>
      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          placeholder="  Artist & songs"
          //   value={search}
          onChange={(e) => {
            let value = e.target.value.length;
            if (value < 3) {
              setUse();
            } else {
              setUse(searchBar);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
