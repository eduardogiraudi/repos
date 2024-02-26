import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BarChart} from '@toast-ui/react-chart'

let omdbIds = ['tt1014759', 'tt1667353', 'tt1661199','tt0053285', 'tt1488589','tt0398286'] //Alice, biancaneve, cenerentola, bella addorm, pinocchio, raperonzolo
let apiIds = ['Alice','Biancaneve','Cenerentola', 'Aurora', 'Pinocchio','Raperonzolo']
let imgs = ['Alice.jpg','Biancaneve.jpg', 'Cenerentola.jpg','Aurora.png','Pinocchio.jpg','Raperonzolo.jpg']
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App omdbIds={omdbIds} apiIds={apiIds}/>
);

const bardata = {
  categories: ['Ratings'],
  series: [
    {
      name: 'Alice in Wonderland',
      data: [6.4],
    },
    {
      name: 'Mirror Mirror',
      data: [5.6],
    },
    {
      name: 'Cinderella',
      data: [6.9]
    },
    {
      name: 'Sleeping Beauty',
      data: [7.2]
    },
    {
      name: 'Guillermo del Toro\'s Pinocchio',
      data: [7.6]
    },
    {
      name: 'Tangled',
      data: [7.7]
    }
  ],
};
const options = {
  chart: {
        width: 700,
        height: 700,
        title: 'OMDB Ratings',
    },

    legend: {
      visible: true,
  },
};




function App ({omdbIds, apiIds}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentMovie, setCurrentMovie] = useState(0)
  const [data, setData] = useState()


  const handleNextButton = ()=>{
    if(currentMovie+1>=omdbIds.length) {
      setCurrentMovie(0)
    }else {
      setCurrentMovie(currentMovie+1) 
    }
  }
  const handlePrevButton = () => {
    if(currentMovie-1<0){
      setCurrentMovie(omdbIds.length-1)
    }else{
      setCurrentMovie(currentMovie-1)
    }
  }

  let apis = ['http://localhost:8888/progweb/api.php?protagonista_nome='+apiIds[currentMovie],'http://www.omdbapi.com/?i='+omdbIds[currentMovie]+'&apikey=4c00f12c']
  useEffect(()=>{
    fetch(apis[currentPage])
    .then(res=>res.json())
    .then(data=>setData(data))
    .catch(err=>console.error(err.message))
    return()=>{
      setData()
    }
  },[currentPage,currentMovie])

  let dataOdierna = new Date()

  dataOdierna = dataOdierna.getDate()+ '/'+(dataOdierna.getMonth()+1)+'/'+dataOdierna.getFullYear() 




  return (
    <>
      <header>
        <h1>Logo</h1>
        <hr/>
        <nav>
          <ul>
            <li><button onClick={()=>{setCurrentPage(0)}}>Opere</button></li>
            <li><button onClick={()=>{setCurrentPage(1)}}>Film</button></li>
            <li><button onClick={()=>{setCurrentPage(2)}}>Grafico recensioni</button></li>
          </ul>
        </nav>
      </header>

      <main>
        {!data&&currentPage!==2&&
          <div>Loading...</div>
        }
        {
        currentPage===0&&data&&
        <>
          <h2>Titolo: {data.titolo}</h2>
          <p>Protagonista: {data.protagonista_nome}</p>
          <p>Anno: {data.anno}</p>
          <p>Autore: {data.nome}  {data.cognome}</p>
          <img src={imgs[currentMovie]} alt={apiIds[currentMovie]} style={{height:'300px'}}/>
          <p></p>
        </>
        }
        {
          currentPage===1&&data&&
          <>
            <h2>Titolo: {data.Title}</h2>
            <p>Attori: {data.Actors}</p>
            <p>Trama: {data.Plot}</p>
            <img alt={data.Title} src={data.Poster} style={{height: '300px'}}/>
          </>
        }

        {currentPage===2&&
          
          <BarChart data={bardata} options={options} style={{}}/>
        }

        {currentPage!==2&&
        <div>
          <button onClick={handlePrevButton}>Indietro</button>
          <button onClick={handleNextButton}>Avanti</button>
        </div>
        }
      </main>


      <footer>
        Dati aggiornati al {dataOdierna}
      </footer>
    </>
  )
}