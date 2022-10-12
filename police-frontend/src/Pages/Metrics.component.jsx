import React, { useEffect, useState } from "react";
import axios from "axios";

import Series from '../Components/series';
import MediaStats from '../Components/mediastats';
import Stats from '../Components/stats';
import PopKeyWs from "../Components/popkeyws";
import KeywordInfo from "../Components/keywordinfo";
import api from '../Services/UserService';


function Metrics() {

  const[isLoading, setLoading] = useState(true)
  const colors = ['#F44336', '#E91E63', '#9C27B0']

  const monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep'
  }

  

  const [content, setContent] = useState([]);


  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get("/homepage")
      setContent(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }


  

  useEffect(() => {
    fetchData();
  },[])

  // console.log(content)

  // const statsItems = stats.map(stat => <Stats stat={stat} key={stat.id}/>)

  while(isLoading){
    return 'loading'
  }

  const statsItems = content.stats.map((value, index) => <Stats stat={value} key={index}/>)
  const popKeywords = content.popular_keywords.map((value, index) => <PopKeyWs keyword={value} key={index}/>)
  const months = content.time_series.months.map((value) => monthMap[value])
  const Keywords = content.keywords_with_details.map((value, index) => <KeywordInfo keyword={value} colors={colors} key={index}/>)
  const timeSeries = {
    data: content.time_series.posts,
    categories: months
  }


  return (
    
    <div className='Metrics'>
      <div className='stats'>
        {statsItems}
      </div>
      <MediaStats mediaData={content.media_stats} media={content.media} colors={colors}/>
      
      <Series timeSeries = {timeSeries}/>

      <div className='keywords'>
        {popKeywords}
      </div>

      <div className='keywords'>
        {Keywords}
      </div>
    

    </div>
  );
  
}

export default Metrics;
