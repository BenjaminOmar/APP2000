import React from "react";
import SearchResultListCSS from "./SearchResultListCSS.module.css"

export const SearchResultList = ({ results }) => {
    return (
        <div className={SearchResultListCSS.resultList}>
           {
              results.map((result) => {
                    return <div key={result.id}>{result.name}</div>;
                })
            }
            

            


        </div>
    );
};

export default SearchResultList;