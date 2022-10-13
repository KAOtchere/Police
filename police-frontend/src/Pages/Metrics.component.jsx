import React, { useEffect, useState } from "react";
import axios from "axios";

import Series from "../Components/series";
import MediaStats from "../Components/mediastats";
import Stats from "../Components/stats";
import PopKeyWs from "../Components/popkeyws";
import KeywordInfo from "../Components/keywordinfo";
import api from "../Services/UserService";

function Metrics() {
  const [isLoading, setLoading] = useState(true);
  const colors = ["#0077ff", "#E91E63", "#a5a5a5"];

  const monthMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
  };

  const [content, setContent] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/homepage");
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(content)

  // const statsItems = stats.map(stat => <Stats stat={stat} key={stat.id}/>)

  while (isLoading) {
    return "loading";
  }

  const statsItems = content.stats.map((value, index) => (
    <Stats stat={value} key={index} />
  ));
  const popKeywords = content.popular_keywords.map((value, index) => (
    <PopKeyWs keyword={value} key={index} />
  ));
  const months = content.time_series.months.map((value) => monthMap[value]);
  const Keywords = content.keywords_with_details.map((value, index) => (
    <KeywordInfo keyword={value} colors={colors} key={index} />
  ));
  const timeSeries = {
    data: content.time_series.posts,
    categories: months,
  };

  return (
    <div className="bg-[#f4f9ff]">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10">
            {statsItems}
          </div>
          <Series timeSeries={timeSeries} />
          <div className="mt-10 bg-white my-10 p-10 rounded-lg drop-shadow-lg">
            <h1 className="capitalize text-3xl font-bold">Keyword insights</h1>
            {Keywords}
          </div>
        </div>

        <div>
          <MediaStats
            mediaData={content.media_stats}
            media={content.media}
            colors={colors}
          />
          <div className="keywords">
            <h1 className="capitalize text-3xl font-bold">Popular Keywords</h1>
            <div className=" gap-2 mt-10">
            {popKeywords}
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
}

export default Metrics;
